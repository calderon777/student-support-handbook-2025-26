param(
  [string[]]$Files = @("index.qmd", "Staff_Support.qmd"),
  [switch]$Online,
  [int]$TimeoutSec = 10
)

$ErrorActionPreference = "Stop"

if (-not $Files -or $Files.Count -eq 0) {
  Write-Host "No files provided."
  exit 1
}

$errors = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]
$httpLinks = New-Object System.Collections.Generic.HashSet[string]

function Add-Issue {
  param(
    [string]$Type,
    [string]$File,
    [int]$Line,
    [string]$Link,
    [string]$Message
  )
  $entry = "$Type`t${File}:$Line`t$Link`t$Message"
  if ($Type -eq "ERROR") { $errors.Add($entry) } else { $warnings.Add($entry) }
}

foreach ($file in $Files) {
  if (-not (Test-Path $file)) {
    Add-Issue -Type "ERROR" -File $file -Line 0 -Link "" -Message "File not found"
    continue
  }

  $lines = Get-Content $file
  for ($i = 0; $i -lt $lines.Count; $i++) {
    $lineNo = $i + 1
    $line = $lines[$i]
    $links = New-Object System.Collections.Generic.List[string]

    [regex]::Matches($line, '\[[^\]]+\]\(([^)]+)\)') | ForEach-Object {
      $links.Add($_.Groups[1].Value.Trim())
    }
    [regex]::Matches($line, 'href="([^"]+)"') | ForEach-Object {
      $links.Add($_.Groups[1].Value.Trim())
    }

    foreach ($link in $links) {
      if ([string]::IsNullOrWhiteSpace($link)) {
        Add-Issue -Type "ERROR" -File $file -Line $lineNo -Link $link -Message "Empty link target"
        continue
      }
      if ($link.StartsWith("#")) { continue }
      if ($link.StartsWith("mailto:")) { continue }
      if ($link.StartsWith("http://") -or $link.StartsWith("https://")) {
        if ($link.Contains(" ")) {
          Add-Issue -Type "WARNING" -File $file -Line $lineNo -Link $link -Message "URL contains spaces"
        }
        [void]$httpLinks.Add($link)
        continue
      }
      if ($link.StartsWith("javascript:", [System.StringComparison]::OrdinalIgnoreCase)) {
        Add-Issue -Type "ERROR" -File $file -Line $lineNo -Link $link -Message "javascript: links are not allowed"
        continue
      }
      if ($link -match '@') {
        Add-Issue -Type "ERROR" -File $file -Line $lineNo -Link $link -Message "Email-like link is missing mailto:"
        continue
      }
      if ($link -match '\.(css|js|md|html|pdf)$') {
        continue
      }
      Add-Issue -Type "WARNING" -File $file -Line $lineNo -Link $link -Message "Relative/non-http link (check if intentional)"
    }
  }
}

if ($Online) {
  Write-Host "Running online checks for HTTP(S) links..."
  foreach ($url in $httpLinks) {
    try {
      $resp = Invoke-WebRequest -Uri $url -Method Head -MaximumRedirection 5 -TimeoutSec $TimeoutSec -ErrorAction Stop
      if ($resp.StatusCode -ge 400) {
        Add-Issue -Type "ERROR" -File "<online>" -Line 0 -Link $url -Message "HTTP status $($resp.StatusCode)"
      }
    } catch {
      Add-Issue -Type "WARNING" -File "<online>" -Line 0 -Link $url -Message "HEAD failed: $($_.Exception.Message)"
    }
  }
}

Write-Host "`nLink check summary"
Write-Host "Files scanned: $($Files.Count)"
Write-Host "Unique HTTP(S) links: $($httpLinks.Count)"
Write-Host "Errors: $($errors.Count)"
Write-Host "Warnings: $($warnings.Count)"

if ($errors.Count -gt 0) {
  Write-Host "`nERRORS:"
  $errors | ForEach-Object { Write-Host $_ }
}
if ($warnings.Count -gt 0) {
  Write-Host "`nWARNINGS:"
  $warnings | ForEach-Object { Write-Host $_ }
}

if ($errors.Count -gt 0) { exit 1 }
exit 0
