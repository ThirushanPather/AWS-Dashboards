@echo off
cd /d "%~dp0.."

echo =================================================
echo  Deploying Dashboard POC to AWS S3...
echo =================================================
echo.

set BUCKET=dashboard-poc-tjn
set PROFILE=dashboard-poc
set REGION=us-east-1
set CF_DIST=EPDJWE1AK2LD

:: -----------------------------------------------
echo [1/8] Building all three dashboards...
echo.
echo  ^> Building Collections...
set DASHBOARD=collections&&npm run build --prefix packages/dashboard-poc
echo.
echo  ^> Building Credit...
set DASHBOARD=credit&&npm run build --prefix packages/dashboard-poc
echo.
echo  ^> Building Risk...
set DASHBOARD=risk&&npm run build --prefix packages/dashboard-poc
echo.
echo  ^> Building Portal...
npm run build:portal
echo.

:: -----------------------------------------------
echo [2/8] Checking S3 bucket...
aws s3api head-bucket --bucket %BUCKET% --profile %PROFILE% 2>nul
if errorlevel 1 (
  echo  Bucket not found. Creating %BUCKET%...
  aws s3api create-bucket --bucket %BUCKET% --region %REGION% --profile %PROFILE%
) else (
  echo  Bucket %BUCKET% already exists.
)
echo.

:: -----------------------------------------------
echo [3/8] Disabling public access block...
aws s3api delete-public-access-block ^
  --bucket %BUCKET% ^
  --profile %PROFILE%
echo.

:: -----------------------------------------------
echo [4/8] Enabling static website hosting...
aws s3api put-bucket-website ^
  --bucket %BUCKET% ^
  --website-configuration "{\"IndexDocument\":{\"Suffix\":\"index.html\"},\"ErrorDocument\":{\"Key\":\"error.html\"}}" ^
  --profile %PROFILE%
echo.

:: -----------------------------------------------
echo [5/8] Setting public read bucket policy...
aws s3api put-bucket-policy ^
  --bucket %BUCKET% ^
  --policy "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"PublicReadGetObject\",\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":\"s3:GetObject\",\"Resource\":\"arn:aws:s3:::%BUCKET%/*\"}]}" ^
  --profile %PROFILE%
echo.

:: -----------------------------------------------
echo [6/8] Uploading dashboards to S3...
echo.

echo  ^> Uploading Collections...
aws s3 sync packages\dashboard-poc\dist\collections\ ^
  s3://%BUCKET%/collections/ ^
  --profile %PROFILE% ^
  --content-type "text/html" ^
  --exclude "*" ^
  --include "*.html"
aws s3 sync packages\dashboard-poc\dist\collections\ ^
  s3://%BUCKET%/collections/ ^
  --profile %PROFILE% ^
  --exclude "*.html"
echo.

echo  ^> Uploading Credit...
aws s3 sync packages\dashboard-poc\dist\credit\ ^
  s3://%BUCKET%/credit/ ^
  --profile %PROFILE% ^
  --content-type "text/html" ^
  --exclude "*" ^
  --include "*.html"
aws s3 sync packages\dashboard-poc\dist\credit\ ^
  s3://%BUCKET%/credit/ ^
  --profile %PROFILE% ^
  --exclude "*.html"
echo.

echo  ^> Uploading Risk...
aws s3 sync packages\dashboard-poc\dist\risk\ ^
  s3://%BUCKET%/risk/ ^
  --profile %PROFILE% ^
  --content-type "text/html" ^
  --exclude "*" ^
  --include "*.html"
aws s3 sync packages\dashboard-poc\dist\risk\ ^
  s3://%BUCKET%/risk/ ^
  --profile %PROFILE% ^
  --exclude "*.html"
echo.

echo  ^> Uploading Portal...
aws s3 sync dist\portal\ ^
  s3://%BUCKET%/portal/ ^
  --profile %PROFILE% ^
  --content-type "text/html" ^
  --exclude "*" ^
  --include "*.html"
aws s3 sync dist\portal\ ^
  s3://%BUCKET%/portal/ ^
  --profile %PROFILE% ^
  --exclude "*.html"
aws s3 sync dist\portal\ ^
  s3://%BUCKET%/portal/ ^
  --profile %PROFILE% ^
  --content-type "text/css" ^
  --exclude "*" ^
  --include "*.css"
echo.

:: -----------------------------------------------
echo [7/8] Invalidating CloudFront cache...
aws cloudfront create-invalidation ^
  --distribution-id %CF_DIST% ^
  --paths "/collections/*" "/credit/*" "/risk/*" "/portal/*" ^
  --profile %PROFILE%
echo.

:: -----------------------------------------------
echo [8/8] Done.
echo.
echo =================================================
echo  Deployment complete.
echo =================================================
echo.
echo  Collections: https://d2fey5na6iqlss.cloudfront.net/collections/
echo  Credit:      https://d2fey5na6iqlss.cloudfront.net/credit/
echo  Risk:        https://d2fey5na6iqlss.cloudfront.net/risk/
echo  Portal:      https://d2fey5na6iqlss.cloudfront.net/portal/
echo.
