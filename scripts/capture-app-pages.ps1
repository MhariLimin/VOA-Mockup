param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('source', 'new')]
  [string]$Set,

  [switch]$ManifestOnly
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$screenshotRoot = Join-Path $projectRoot 'screenshots\app-pages'
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$localOrigin = 'http://127.0.0.1:5173'

if (-not (Test-Path -LiteralPath $edge)) {
  throw "Microsoft Edge was not found at $edge"
}

$sets = @{
  source = @(
    @{ Name = '01-home'; Path = '/' },
    @{ Name = '02-about'; Path = '/about' },
    @{ Name = '03-services-overview'; Path = '/services' },
    @{ Name = '04-mortgage-loans'; Path = '/services/mortgage-loans-processing-virtual-support' },
    @{ Name = '05-financial-planning'; Path = '/services/virtual-financial-planning-and-admin-assistant' },
    @{ Name = '06-accounting-bookkeeping'; Path = '/services/accounting-and-bookkeeping-virtual-assistant' },
    @{ Name = '07-real-estate-conveyancing'; Path = '/services/real-estate-virtual-assistant-services' },
    @{ Name = '08-back-office-admin'; Path = '/services/executive-and-administrative-virtual-assistance' },
    @{ Name = '09-digital-marketing'; Path = '/services/digital-marketing-virtual-assistant-services' },
    @{ Name = '10-sales-marketing'; Path = '/services/sales-and-e-commerce-virtual-assistant' },
    @{ Name = '11-creative-copywriting'; Path = '/services/creative-copywriting-virtual-assistant' },
    @{ Name = '12-it-technology'; Path = '/services/it-virtual-assistant-services' },
    @{ Name = '13-how-it-works'; Path = '/how-it-works' },
    @{ Name = '14-why-voa'; Path = '/managed-virtual-support' },
    @{ Name = '15-client-stories-testimonials'; Path = '/client-stories' },
    @{ Name = '16-insights-blog-resources'; Path = '/insights' },
    @{ Name = '17-article-detail'; Path = '/insights/example' },
    @{ Name = '18-videos-resources'; Path = '/videos' },
    @{ Name = '19-faqs'; Path = '/faqs' },
    @{ Name = '20-contact-consultation'; Path = '/contact' }
  )
  new = @(
    @{ Name = '01-form-confirmation'; Path = '/thank-you' },
    @{ Name = '02-designed-404'; Path = '/not-a-real-page' }
  )
}

$folder = if ($Set -eq 'source') {
  Join-Path $screenshotRoot 'from-source-websites'
} else {
  Join-Path $screenshotRoot 'new-recommended-pages'
}

New-Item -ItemType Directory -Path $folder -Force | Out-Null

$results = foreach ($page in $sets[$Set]) {
  $url = "$localOrigin$($page.Path)"
  $output = Join-Path $folder "$($page.Name).png"
  if (-not $ManifestOnly) {
    [Console]::WriteLine("[$Set] Capturing $($page.Name)")

    $arguments = @(
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-software-rasterizer',
      '--hide-scrollbars',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=2000',
      '--window-size=1440,1200',
      "--screenshot=`"$output`"",
      $url
    )

    $process = Start-Process -FilePath $edge -ArgumentList $arguments -WindowStyle Hidden -Wait -PassThru
  }

  [PSCustomObject]@{
    Classification = if ($Set -eq 'source') { 'Carried over or reworked from source websites' } else { 'New recommendation' }
    Name = $page.Name
    LocalUrl = $url
    File = $output.Substring($projectRoot.Length + 1)
    Captured = Test-Path -LiteralPath $output
    CurrentState = if ($Set -eq 'new') { 'Dedicated utility page' } else { 'Source-grounded route brief for Bolt' }
  }
}

$manifest = Join-Path $folder 'manifest.csv'
$results | Export-Csv -LiteralPath $manifest -NoTypeInformation -Encoding UTF8 -Force

$successful = @($results | Where-Object { $_.Captured }).Count
Write-Output "[$Set] Completed $successful of $(@($sets[$Set]).Count) captures. Manifest: $manifest"
