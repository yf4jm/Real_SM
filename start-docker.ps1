$dockerProcess = Get-Process -Name "Docker Desktop" -ErrorAction SilentlyContinue
if ($null -eq $dockerProcess) {
    Start-Process -FilePath "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    Start-Sleep -Seconds 10  # Wait for Docker to start
    while ((docker info | Out-Null) -eq $false) {
        Write-Output "Waiting for Docker to start..."
        Start-Sleep -Seconds 2
    }
    Write-Output "Docker started."
} else {
    Write-Output "Docker is already running."
}
