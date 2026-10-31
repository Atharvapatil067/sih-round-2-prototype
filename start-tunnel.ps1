# Matter Lineage Ledger — Quick Launch & Public Tunnel Script
Write-Host "Starting Matter Lineage Ledger preview server on port 3000..." -ForegroundColor Cyan
$server = Start-Process -FilePath "npm.cmd" -ArgumentList "run", "preview" -PassThru
Start-Sleep -Seconds 3

Write-Host "Starting Cloudflare Public Tunnel..." -ForegroundColor Green
.\cloudflared.exe tunnel --url http://localhost:3000

