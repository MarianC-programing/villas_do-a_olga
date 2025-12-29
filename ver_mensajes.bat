@echo off
cd /d "c:\Users\maria\Villas-olga-main"
echo Consultando mensajes de contacto...
echo.
echo Fecha y hora - Nombre - Email - Telefono - Mensaje
echo ===================================================
sqlite3 dev.sqlite "SELECT strftime('%%Y-%%m-%%d %%H:%%M', created_at) as fecha, name, email, phone, message FROM contact_submissions ORDER BY created_at DESC;" 2>nul || echo SQLite3 no esta instalado. Instala SQLite3 o usa DB Browser for SQLite.
echo.
pause