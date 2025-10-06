# List of FusionBoard directories
$dirs = @(
    "fusionone",
    "myfusionboard",
    "globalfusion",
    "equifusion",
    "bondfusion",
    "forexfusion",
    "commofusion",
    "cryptofusion",
    "derivafusion",
    "ecofusion",
    "shipfusion",
    "assetfusion",
    "newsfusion"
)

# Base path
$basePath = "D:\Projects\alphafusion\client\app\(user-dashboard)\fusionboards"

# Create base directories and subdirectories with page.tsx
New-Item -ItemType Directory -Path $basePath -Force

foreach ($dir in $dirs) {
    $fullPath = Join-Path $basePath $dir
    New-Item -ItemType Directory -Path $fullPath -Force
    New-Item -ItemType File -Path (Join-Path $fullPath "page.tsx") -Force
}
