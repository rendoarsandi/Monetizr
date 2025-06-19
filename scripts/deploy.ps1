# Monetizr Deployment Script for Cloudflare
# This script deploys all applications to Cloudflare infrastructure

param(
    [string]$Environment = "development",
    [switch]$SkipBuild = $false
)

Write-Host "🚀 Starting Monetizr deployment to Cloudflare..." -ForegroundColor Green
Write-Host "Environment: $Environment" -ForegroundColor Yellow

# Check if wrangler is installed
if (!(Get-Command "wrangler" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Wrangler CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "npm install -g wrangler" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in to Cloudflare
Write-Host "🔐 Checking Cloudflare authentication..." -ForegroundColor Blue
$authCheck = wrangler whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to Cloudflare. Please run:" -ForegroundColor Red
    Write-Host "wrangler login" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Authenticated as: $authCheck" -ForegroundColor Green

# Build applications if not skipped
if (-not $SkipBuild) {
    Write-Host "🔨 Building all applications..." -ForegroundColor Blue
    bun run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Build failed!" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Build completed successfully" -ForegroundColor Green
}

# Deploy Workers API first
Write-Host "🔧 Deploying Workers API..." -ForegroundColor Blue
Set-Location "workers/api"
if ($Environment -eq "production") {
    wrangler deploy --env production
} else {
    wrangler deploy --env development
}
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Workers API deployment failed!" -ForegroundColor Red
    Set-Location "../.."
    exit 1
}
Set-Location "../.."
Write-Host "✅ Workers API deployed successfully" -ForegroundColor Green

# Deploy Next.js applications to Cloudflare Pages
$apps = @("admin", "auth", "dashboard", "landing")

foreach ($app in $apps) {
    Write-Host "📦 Deploying $app app to Cloudflare Pages..." -ForegroundColor Blue
    
    # Copy build output and static files
    Set-Location "apps/$app"
    
    # Copy headers and redirects to out directory
    if (Test-Path ".next/static") {
        Copy-Item "_headers" ".next/" -ErrorAction SilentlyContinue
        Copy-Item "_redirects" ".next/" -ErrorAction SilentlyContinue
    }
    
    # Deploy using wrangler pages
    if ($Environment -eq "production") {
        wrangler pages deploy .next --project-name "monetizr-$app" --compatibility-date "2024-12-19"
    } else {
        wrangler pages deploy .next --project-name "monetizr-$app-dev" --compatibility-date "2024-12-19"
    }
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ $app deployment failed!" -ForegroundColor Red
        Set-Location "../.."
        exit 1
    }
    
    Set-Location "../.."
    Write-Host "✅ $app deployed successfully" -ForegroundColor Green
}

Write-Host "🎉 All deployments completed successfully!" -ForegroundColor Green
Write-Host "📋 Deployment Summary:" -ForegroundColor Yellow
Write-Host "  • Workers API: https://monetizr-api.rendoarsandi.workers.dev" -ForegroundColor Cyan
Write-Host "  • Admin App: https://monetizr-admin.pages.dev" -ForegroundColor Cyan
Write-Host "  • Auth App: https://monetizr-auth.pages.dev" -ForegroundColor Cyan
Write-Host "  • Dashboard App: https://monetizr-dashboard.pages.dev" -ForegroundColor Cyan
Write-Host "  • Landing App: https://monetizr-landing.pages.dev" -ForegroundColor Cyan
