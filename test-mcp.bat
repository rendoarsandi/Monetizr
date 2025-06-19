@echo off
echo Testing Cloudflare MCP Servers for Monetizr...
echo.

REM Add Node.js to PATH
set PATH=%PATH%;C:\Program Files\nodejs\

echo Testing MCP Remote package installation...
npx mcp-remote --version
echo.

echo Testing Cloudflare Documentation MCP Server...
echo This will connect to: https://docs.mcp.cloudflare.com/sse
echo.

REM Test the docs server (this will show available tools)
npx mcp-remote https://docs.mcp.cloudflare.com/sse --list-tools

echo.
echo MCP servers are ready for use!
echo.
echo Next steps:
echo 1. Get your Cloudflare API token from: https://dash.cloudflare.com/profile/api-tokens
echo 2. Configure your MCP client (Claude Desktop, Cursor, etc.)
echo 3. Start using natural language to interact with Cloudflare services
echo.
pause
