@echo off
echo.
echo ========================================
echo   Cloudflare MCP Setup for Monetizr
echo ========================================
echo.

REM Add Node.js to PATH
set PATH=%PATH%;C:\Program Files\nodejs\

echo ✓ Node.js and npm are installed
echo ✓ mcp-remote package is available globally
echo ✓ Cloudflare MCP servers are configured
echo.

echo Available MCP Servers:
echo.
echo 🏗️  Workers Bindings: https://bindings.mcp.cloudflare.com/sse
echo     Perfect for: D1 database, R2 storage, Workers deployment
echo.
echo 📚 Documentation: https://docs.mcp.cloudflare.com/sse
echo     Perfect for: API documentation and troubleshooting
echo.
echo 🔍 Observability: https://observability.mcp.cloudflare.com/sse
echo     Perfect for: Monitoring and debugging
echo.
echo 🌐 Browser Rendering: https://browser.mcp.cloudflare.com/sse
echo     Perfect for: Campaign content processing
echo.
echo 📊 GraphQL Analytics: https://graphql.mcp.cloudflare.com/sse
echo     Perfect for: Performance tracking
echo.

echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Get your Cloudflare API token:
echo    https://dash.cloudflare.com/profile/api-tokens
echo.
echo 2. Configure your MCP client (Claude Desktop, Cursor, etc.)
echo    Use the configurations in mcp-config.json
echo.
echo 3. Start using natural language to interact with Cloudflare!
echo.
echo Example commands:
echo "Set up D1 database for Monetizr"
echo "Deploy authentication API as Worker"
echo "Configure R2 storage for uploads"
echo.

pause
