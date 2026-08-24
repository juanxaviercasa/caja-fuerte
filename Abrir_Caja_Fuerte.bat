@echo off
title DevVault - Caja Fuerte Digital
color 0A
echo ========================================================
echo           INICIANDO DEVVAULT PRO SUITE
echo ========================================================
echo.
echo [1/2] Comprobando entorno local...
cd /d "%~dp0"

if not exist node_modules (
    echo [INFO] Instalando dependencias necesarias por primera vez...
    call npm install
)

echo [2/2] Lanzando servidor seguro local...
echo.
echo ========================================================
echo   DevVault esta disponible en: http://localhost:5173/
echo   (Para cerrar la aplicacion, cierra esta ventana)
echo ========================================================
echo.

start http://localhost:5173/
call npm run dev
