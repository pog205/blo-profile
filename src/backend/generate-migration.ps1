# Script to generate and apply Entity Framework migrations
# Usage: .\generate-migration.ps1 [migration-name]

param(
    [string]$MigrationName = "InitialCreate"
)

Write-Host "=== BioProfile Entity Migration Generator ===" -ForegroundColor Cyan

# Set paths
$InfrastructurePath = "BioProfile.Infrastructure"
$ApiPath = "BioProfile.Api"
$ContextName = "ApplicationDbContext"

Write-Host "`n1. Building projects..." -ForegroundColor Yellow
Set-Location $InfrastructurePath
dotnet build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed! Please fix errors first." -ForegroundColor Red
    Set-Location ..
    exit 1
}

Write-Host "`n2. Creating migration: $MigrationName" -ForegroundColor Yellow
dotnet ef migrations add $MigrationName `
    --startup-project "../$ApiPath" `
    --context $ContextName `
    --output-dir "Data/Migrations"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Migration creation failed!" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Write-Host "`n3. Migration created successfully!" -ForegroundColor Green
Write-Host "`n4. To apply migration to database, run:" -ForegroundColor Cyan
Write-Host "   dotnet ef database update --startup-project ../$ApiPath --context $ContextName" -ForegroundColor White

Set-Location ..
Write-Host "`n=== Done ===" -ForegroundColor Green
