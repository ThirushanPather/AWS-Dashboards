@echo off
cd /d "%~dp0.."

echo =================================================
echo  Setting up CloudFront for Dashboard POC...
echo =================================================
echo.

set BUCKET=dashboard-poc-tjn
set REGION=us-east-1
set PROFILE=dashboard-poc

:: -----------------------------------------------
:: Write the distribution config via PowerShell to avoid
:: batch echo quoting issues with JSON. CachePolicyId and
:: ForwardedValues/TTL are mutually exclusive in CloudFront --
:: we use CachePolicyId (AWS Managed-CachingOptimized) only.
:: -----------------------------------------------
echo [1/4] Writing CloudFront distribution config...
powershell -Command "$json = @'\n{\n  \"CallerReference\": \"dashboard-poc-tjn-001\",\n  \"Comment\": \"Dashboard POC distribution\",\n  \"DefaultRootObject\": \"collections/index.html\",\n  \"Enabled\": true,\n  \"PriceClass\": \"PriceClass_100\",\n  \"Origins\": {\n    \"Quantity\": 1,\n    \"Items\": [\n      {\n        \"Id\": \"S3-dashboard-poc-tjn\",\n        \"DomainName\": \"dashboard-poc-tjn.s3-website-us-east-1.amazonaws.com\",\n        \"CustomOriginConfig\": {\n          \"HTTPPort\": 80,\n          \"HTTPSPort\": 443,\n          \"OriginProtocolPolicy\": \"http-only\"\n        }\n      }\n    ]\n  },\n  \"DefaultCacheBehavior\": {\n    \"TargetOriginId\": \"S3-dashboard-poc-tjn\",\n    \"ViewerProtocolPolicy\": \"redirect-to-https\",\n    \"AllowedMethods\": {\n      \"Quantity\": 2,\n      \"Items\": [\"GET\", \"HEAD\"],\n      \"CachedMethods\": { \"Quantity\": 2, \"Items\": [\"GET\", \"HEAD\"] }\n    },\n    \"Compress\": true,\n    \"CachePolicyId\": \"658327ea-f89d-4fab-a63d-7e88639e58f6\"\n  },\n  \"Restrictions\": {\n    \"GeoRestriction\": { \"RestrictionType\": \"none\", \"Quantity\": 0 }\n  },\n  \"ViewerCertificate\": {\n    \"CloudFrontDefaultCertificate\": true,\n    \"MinimumProtocolVersion\": \"TLSv1.2_2021\"\n  }\n}\n'@; [System.IO.File]::WriteAllText((Resolve-Path 'scripts'), $json)"
echo  Config written.
echo.

:: -----------------------------------------------
echo [2/4] Creating CloudFront distribution...
aws cloudfront create-distribution ^
  --distribution-config file://scripts/cf-config.json ^
  --profile %PROFILE% ^
  --query "Distribution.{Id:Id,Domain:DomainName,Status:Status}" ^
  --output table
echo.

:: -----------------------------------------------
echo [3/4] Saving CloudFront domain to scripts\cf-domain.txt...
aws cloudfront list-distributions ^
  --profile %PROFILE% ^
  --query "DistributionList.Items[0].DomainName" ^
  --output text > scripts\cf-domain.txt
set /p CF_DOMAIN=<scripts\cf-domain.txt
echo  CloudFront domain: %CF_DOMAIN%
echo.

:: -----------------------------------------------
echo [4/4] Cleaning up temp config...
del scripts\cf-config.json
echo.

echo ============================================
echo  Dashboard POC - CloudFront URLs
echo ============================================
echo  Collections: https://%CF_DOMAIN%/collections/
echo  Credit:      https://%CF_DOMAIN%/credit/
echo  Risk:        https://%CF_DOMAIN%/risk/
echo ============================================
echo.
echo NOTE: Takes 5-10 minutes to deploy globally.
echo S3 URLs still work in the meantime.
echo.
