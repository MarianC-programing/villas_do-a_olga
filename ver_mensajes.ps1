# Script para ver mensajes de contacto
Write-Host "Consultando mensajes de contacto..." -ForegroundColor Green
Write-Host ""

# Verificar si sqlite3 está disponible
try {
    $result = sqlite3 "c:\Users\maria\Villas-olga-main\dev.sqlite" "SELECT strftime('%Y-%m-%d %H:%M', created_at) as fecha, name, email, phone, message FROM contact_submissions ORDER BY created_at DESC;" 2>$null

    if ($result) {
        Write-Host "Fecha y hora`tNombre`tEmail`tTelefono`tMensaje" -ForegroundColor Yellow
        Write-Host "============================================================" -ForegroundColor Yellow
        $result | ForEach-Object { Write-Host $_ }
    } else {
        Write-Host "No hay mensajes de contacto aún." -ForegroundColor Yellow
    }
} catch {
    Write-Host "SQLite3 no está instalado en el sistema." -ForegroundColor Red
    Write-Host "Opciones:" -ForegroundColor Cyan
    Write-Host "1. Instala SQLite3 desde: https://www.sqlite.org/download.html" -ForegroundColor White
    Write-Host "2. Usa DB Browser for SQLite (recomendado): https://sqlitebrowser.org/" -ForegroundColor White
    Write-Host "3. Accede via API: http://localhost:5000/api/contact-submissions" -ForegroundColor White
}

Write-Host ""
Read-Host "Presiona Enter para continuar"