@echo off
cd /d "%~dp0.."

echo =================================================
echo  Dashboard POC - Pre-Deploy Check
echo =================================================
echo.

set ERRORS=0
set PROFILE=dashboard-poc

:: -----------------------------------------------
echo [1/3] Checking AWS CLI...
aws --version 2>nul
if errorlevel 1 (
  echo   MISSING: AWS CLI not found or not in PATH.
  set /a ERRORS+=1
) else (
  echo   OK: AWS CLI is installed.
)
echo.

:: -----------------------------------------------
echo [2/3] Checking AWS profile and credentials...
aws sts get-caller-identity --profile %PROFILE%
if errorlevel 1 (
  echo   MISSING: Profile '%PROFILE%' not found or credentials are invalid.
  set /a ERRORS+=1
) else (
  echo   OK: Profile '%PROFILE%' is valid.
)
echo.

:: -----------------------------------------------
echo [3/3] Checking build output...

if exist "packages\dashboard-poc\dist\collections\index.html" (
  echo   OK: dist/collections/index.html exists.
) else (
  echo   MISSING: dist/collections/index.html  -- run build:all first.
  set /a ERRORS+=1
)

if exist "packages\dashboard-poc\dist\credit\index.html" (
  echo   OK: dist/credit/index.html exists.
) else (
  echo   MISSING: dist/credit/index.html  -- run build:all first.
  set /a ERRORS+=1
)

if exist "packages\dashboard-poc\dist\risk\index.html" (
  echo   OK: dist/risk/index.html exists.
) else (
  echo   MISSING: dist/risk/index.html  -- run build:all first.
  set /a ERRORS+=1
)
echo.

:: -----------------------------------------------
echo =================================================
if %ERRORS%==0 (
  echo   READY - All checks passed. Safe to run deploy.bat.
) else (
  echo   NOT READY - %ERRORS% issue^(s^) found. Fix before deploying.
)
echo =================================================
echo.
