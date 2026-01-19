# Script to apply Entity Framework migrations to database
# Usage: .\apply-migration.ps1

Write-Host "=== Applying Migrations to Database ===" -ForegroundColor Cyan

$InfrastructurePath = "BioProfile.Infrastructure"
$ApiPath = "BioProfile.Api"
$ContextName = "ApplicationDbContext"

Write-Host "`nApplying migrations..." -ForegroundColor Yellow
Set-Location $InfrastructurePath

dotnet ef database update `
    --startup-project "../$ApiPath" `
    --context $ContextName

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ Migrations applied successfully!" -ForegroundColor Green
} else {
    Write-Host "`n✗ Migration failed!" -ForegroundColor Red
}

Set-Location ..
Write-Host "`n=== Done ===" -ForegroundColor Green
