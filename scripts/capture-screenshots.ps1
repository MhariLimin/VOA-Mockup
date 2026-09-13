# Superseded legacy utility: this captures the external production/staging sites.
# For the requested local-app inventory, use capture-app-pages.ps1 instead.
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet('production', 'staging', 'recommended')]
  [string]$Set
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$screenshotRoot = Join-Path $projectRoot 'screenshots'
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

if (-not (Test-Path -LiteralPath $edge)) {
  throw "Microsoft Edge was not found at $edge"
}

$sets = @{
  production = @(
    @{ Name = '01-home'; Url = 'https://virtualofficeangels.com.au/' },
    @{ Name = '02-about-us'; Url = 'https://virtualofficeangels.com.au/about-us/' },
    @{ Name = '03-testimonials'; Url = 'https://virtualofficeangels.com.au/testimonials/' },
    @{ Name = '04-faq'; Url = 'https://virtualofficeangels.com.au/faq/' },
    @{ Name = '05-services'; Url = 'https://virtualofficeangels.com.au/services/' },
    @{ Name = '06-how-it-works'; Url = 'https://virtualofficeangels.com.au/how-it-works/' },
    @{ Name = '07-why-us'; Url = 'https://virtualofficeangels.com.au/why-us/' },
    @{ Name = '08-back-office-admin'; Url = 'https://virtualofficeangels.com.au/business-back-office-and-admin-support/' },
    @{ Name = '09-digital-marketing'; Url = 'https://virtualofficeangels.com.au/digital-marketing-assistance/' },
    @{ Name = '10-sales-marketing'; Url = 'https://virtualofficeangels.com.au/sales-and-marketing-support/' },
    @{ Name = '11-creative-copywriting'; Url = 'https://virtualofficeangels.com.au/creative-writing-and-copywriting-assistance/' },
    @{ Name = '12-it-technology'; Url = 'https://virtualofficeangels.com.au/it-services-and-technology/' },
    @{ Name = '13-mortgage-loans'; Url = 'https://virtualofficeangels.com.au/mortgage-loans-processing-support/' },
    @{ Name = '14-real-estate-admin'; Url = 'https://virtualofficeangels.com.au/real-estate-administration-support/' },
    @{ Name = '15-financial-planning'; Url = 'https://virtualofficeangels.com.au/financial-planning-assistance-administration/' },
    @{ Name = '16-accounting-bookkeeping'; Url = 'https://virtualofficeangels.com.au/accounting-bookkeeping-assistance/' },
    @{ Name = '17-blog-resources'; Url = 'https://virtualofficeangels.com.au/blog/' },
    @{ Name = '18-videos'; Url = 'https://virtualofficeangels.com.au/videos/' },
    @{ Name = '19-contact'; Url = 'https://virtualofficeangels.com.au/contact-us/' }
  )
  staging = @(
    @{ Name = '01-home'; Url = 'https://virtualofficeangels.com.au/stagingsite2/' },
    @{ Name = '02-about-us'; Url = 'https://virtualofficeangels.com.au/stagingsite2/about-us/' },
    @{ Name = '03-services'; Url = 'https://virtualofficeangels.com.au/stagingsite2/services/' },
    @{ Name = '04-how-it-works'; Url = 'https://virtualofficeangels.com.au/stagingsite2/how-it-works/' },
    @{ Name = '05-why-us'; Url = 'https://virtualofficeangels.com.au/stagingsite2/why-us/' },
    @{ Name = '06-back-office-admin'; Url = 'https://virtualofficeangels.com.au/stagingsite2/business-back-office-and-admin-support/' },
    @{ Name = '07-digital-marketing'; Url = 'https://virtualofficeangels.com.au/stagingsite2/sales-marketing-support/' },
    @{ Name = '08-mortgage-loans'; Url = 'https://virtualofficeangels.com.au/stagingsite2/virtual-mortgage-and-loans-processing-support/' },
    @{ Name = '09-financial-planning'; Url = 'https://virtualofficeangels.com.au/stagingsite2/financial-planning-assistance-and-administration/' },
    @{ Name = '10-real-estate-admin'; Url = 'https://virtualofficeangels.com.au/stagingsite2/real-estate-and-administration-support/' },
    @{ Name = '11-accounting-bookkeeping'; Url = 'https://virtualofficeangels.com.au/stagingsite2/accounting-and-bookkeeping-assistance/' },
    @{ Name = '12-blogs'; Url = 'https://virtualofficeangels.com.au/stagingsite2/blogs/' },
    @{ Name = '13-faqs'; Url = 'https://virtualofficeangels.com.au/stagingsite2/faqs/' },
    @{ Name = '14-contact'; Url = 'https://virtualofficeangels.com.au/stagingsite2/contact-us/' }
  )
  recommended = @(
    @{ Name = '01-home'; Url = 'http://127.0.0.1:5173/' },
    @{ Name = '02-about'; Url = 'http://127.0.0.1:5173/about' },
    @{ Name = '03-services-overview'; Url = 'http://127.0.0.1:5173/services' },
    @{ Name = '04-mortgage-loans'; Url = 'http://127.0.0.1:5173/services/mortgage-loans' },
    @{ Name = '05-financial-planning'; Url = 'http://127.0.0.1:5173/services/financial-planning' },
    @{ Name = '06-accounting-bookkeeping'; Url = 'http://127.0.0.1:5173/services/accounting-bookkeeping' },
    @{ Name = '07-real-estate-conveyancing'; Url = 'http://127.0.0.1:5173/services/real-estate-conveyancing' },
    @{ Name = '08-back-office-admin'; Url = 'http://127.0.0.1:5173/services/back-office-admin' },
    @{ Name = '09-digital-marketing'; Url = 'http://127.0.0.1:5173/services/digital-marketing' },
    @{ Name = '10-sales-marketing'; Url = 'http://127.0.0.1:5173/services/sales-marketing' },
    @{ Name = '11-creative-copywriting'; Url = 'http://127.0.0.1:5173/services/creative-copywriting' },
    @{ Name = '12-it-technology'; Url = 'http://127.0.0.1:5173/services/it-technology' },
    @{ Name = '13-how-it-works'; Url = 'http://127.0.0.1:5173/how-it-works' },
    @{ Name = '14-why-voa'; Url = 'http://127.0.0.1:5173/why-voa' },
    @{ Name = '16-client-stories-index'; Url = 'http://127.0.0.1:5173/client-stories' },
    @{ Name = '17-insights-index'; Url = 'http://127.0.0.1:5173/insights' },
    @{ Name = '19-videos-resources'; Url = 'http://127.0.0.1:5173/videos' },
    @{ Name = '20-faqs'; Url = 'http://127.0.0.1:5173/faqs' },
    @{ Name = '21-contact-consultation'; Url = 'http://127.0.0.1:5173/contact' },
    @{ Name = '23-article-detail'; Url = 'http://127.0.0.1:5173/insights/example' },
    @{ Name = '24-form-confirmation-new'; Url = 'http://127.0.0.1:5173/thank-you' },
    @{ Name = '25-404-designed-new'; Url = 'http://127.0.0.1:5173/not-a-real-page' }
  )
}

$folder = switch ($Set) {
  'production' { Join-Path $screenshotRoot 'existing\production' }
  'staging' { Join-Path $screenshotRoot 'existing\staging' }
  'recommended' { Join-Path $screenshotRoot 'recommended' }
}

New-Item -ItemType Directory -Path $folder -Force | Out-Null

$results = foreach ($page in $sets[$Set]) {
  $output = Join-Path $folder "$($page.Name).png"
  Write-Output "[$Set] Capturing $($page.Name)"

  $arguments = @(
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-software-rasterizer',
    '--hide-scrollbars',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=5000',
    '--window-size=1440,1200',
    "--screenshot=$output",
    $page.Url
  )

  $previousErrorAction = $ErrorActionPreference
  $ErrorActionPreference = 'SilentlyContinue'
  & $edge @arguments 2>$null | Out-Null
  $ErrorActionPreference = $previousErrorAction
  $captured = Test-Path -LiteralPath $output

  [PSCustomObject]@{
    Set = $Set
    Name = $page.Name
    Url = $page.Url
    File = $output.Substring($projectRoot.Length + 1)
    Captured = $captured
  }
}

$manifest = Join-Path $folder 'manifest.csv'
$results | Export-Csv -LiteralPath $manifest -NoTypeInformation -Encoding UTF8

$successful = @($results | Where-Object Captured).Count
Write-Output "[$Set] Completed $successful of $($results.Count) captures. Manifest: $manifest"
