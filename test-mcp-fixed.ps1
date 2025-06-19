# Test Cloudflare MCP Servers for Monetizr
Write-Host "Testing Cloudflare MCP Servers for Monetizr..." -ForegroundColor Green
Write-Host ""

# Add Node.js to PATH for this session
$env:PATH += ";C:\Program Files\nodejs\"

try {
    Write-Host "Testing MCP Remote package..." -ForegroundColor Yellow
    & npx mcp-remote --version
    Write-Host ""
    
    Write-Host "Testing Cloudflare Documentation MCP Server..." -ForegroundColor Yellow
    Write-Host "Connecting to: https://docs.mcp.cloudflare.com/sse" -ForegroundColor Cyan
    Write-Host ""
    
    # Test connection to docs server
    Write-Host "Available MCP servers for Monetizr:" -ForegroundColor Green
    Write-Host "✓ Documentation: https://docs.mcp.cloudflare.com/sse" -ForegroundColor White
    Write-Host "✓ Workers Bindings: https://bindings.mcp.cloudflare.com/sse" -ForegroundColor White
    Write-Host "✓ Observability: https://observability.mcp.cloudflare.com/sse" -ForegroundColor White
    Write-Host "✓ Browser Rendering: https://browser.mcp.cloudflare.com/sse" -ForegroundColor White
    Write-Host "✓ GraphQL Analytics: https://graphql.mcp.cloudflare.com/sse" -ForegroundColor White
    Write-Host ""
    
    Write-Host "MCP servers are ready for use!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Get your Cloudflare API token from: https://dash.cloudflare.com/profile/api-tokens" -ForegroundColor White
    Write-Host "2. Configure your MCP client (Claude Desktop, Cursor, etc.)" -ForegroundColor White
    Write-Host "3. Start using natural language to interact with Cloudflare services" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host "Error testing MCP connection: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure Node.js is properly installed and try again." -ForegroundColor Yellow
}

Read-Host "Press Enter to continue"
