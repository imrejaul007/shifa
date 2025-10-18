#!/bin/bash

# Shifa AlHind - Production Deployment Monitor
# This script monitors the Render deployment status

SITE_URL="https://shifa-alhind.onrender.com"
CHECK_INTERVAL=15  # seconds
MAX_ATTEMPTS=40    # 10 minutes total

echo "🔍 Monitoring Render Deployment"
echo "================================"
echo "Site: $SITE_URL"
echo "Checking every ${CHECK_INTERVAL}s for up to 10 minutes..."
echo ""

attempt=1
while [ $attempt -le $MAX_ATTEMPTS ]; do
    echo -n "[$attempt/$MAX_ATTEMPTS] "

    # Try to connect with 10 second timeout
    response=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE_URL/en" 2>/dev/null)

    if [ "$response" == "200" ]; then
        echo "✅ DEPLOYMENT SUCCESSFUL!"
        echo ""
        echo "🎉 Site is live at: $SITE_URL/en"
        echo ""
        echo "Testing key pages:"

        # Test additional pages
        for page in "/en" "/en/doctors" "/en/hospitals" "/en/treatments" "/api/v1/doctors"; do
            status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE_URL$page" 2>/dev/null)
            if [ "$status" == "200" ]; then
                echo "  ✓ $page - OK ($status)"
            else
                echo "  ✗ $page - FAILED ($status)"
            fi
        done

        echo ""
        echo "🚀 Deployment complete! You can now access your site."
        exit 0
    elif [ "$response" == "503" ] || [ "$response" == "000" ]; then
        echo "⏳ Deploying... (Status: $response)"
    else
        echo "⚠️  Unexpected response: $response"
    fi

    sleep $CHECK_INTERVAL
    attempt=$((attempt + 1))
done

echo ""
echo "❌ Deployment did not complete within 10 minutes"
echo ""
echo "Next steps:"
echo "1. Check Render dashboard: https://dashboard.render.com"
echo "2. Look for deployment logs and errors"
echo "3. Verify environment variables are set correctly"
echo "4. Check if the service needs manual restart"

exit 1
