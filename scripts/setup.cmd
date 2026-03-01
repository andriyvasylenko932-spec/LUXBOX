\
@echo off
setlocal
cd /d %~dp0\..

echo [1/4] Creating .env if missing...
if not exist .env (
  copy .env.example .env >nul
)

echo [2/4] Installing packages...
npm.cmd install
if errorlevel 1 goto :error

echo [3/4] Initializing database...
npx prisma migrate dev --name init
if errorlevel 1 goto :error
npm.cmd run db:seed
if errorlevel 1 goto :error

echo [4/4] Starting dev server...
npm.cmd run dev
goto :eof

:error
echo.
echo ERROR happened. See logs above.
exit /b 1
