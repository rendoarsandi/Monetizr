# Cloudflare MCP Setup for Monetizr

This guide will help you set up and use Cloudflare's Model Context Protocol (MCP) servers with your Monetizr project.

## What is MCP?

Model Context Protocol (MCP) is a standardized protocol that allows AI assistants to connect to external systems and services. Cloudflare's MCP servers provide access to various Cloudflare services through natural language.

## Available Cloudflare MCP Servers

The following servers are configured for your Monetizr project:

### 🏗️ **Workers Bindings** (Most Important for Monetizr)
- **URL**: `https://bindings.mcp.cloudflare.com/sse`
- **Use Case**: Build Workers applications with D1 database, R2 storage, AI models
- **Perfect for**: Setting up your Monetizr backend infrastructure

### 📚 **Documentation**
- **URL**: `https://docs.mcp.cloudflare.com/sse`
- **Use Case**: Get up-to-date Cloudflare API documentation
- **Perfect for**: Learning how to implement Cloudflare services

### 🔍 **Observability**
- **URL**: `https://observability.mcp.cloudflare.com/sse`
- **Use Case**: Debug applications, view logs and analytics
- **Perfect for**: Monitoring Monetizr performance

### 🌐 **Browser Rendering**
- **URL**: `https://browser.mcp.cloudflare.com/sse`
- **Use Case**: Fetch web pages, convert to markdown, take screenshots
- **Perfect for**: Processing campaign materials and content

### 📊 **GraphQL Analytics**
- **URL**: `https://graphql.mcp.cloudflare.com/sse`
- **Use Case**: Get detailed analytics data
- **Perfect for**: Campaign performance tracking

## Setup Instructions

### 1. Install Prerequisites

```bash
# Global installation (already done)
bun add -g mcp-remote

# Add to PATH (Windows)
$env:PATH += ";C:\Users\rendoarsandi\.bun\bin"
```

### 2. Create Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Custom token" template
4. Add these permissions for Monetizr:
   - **Account**: `Cloudflare Workers:Edit`, `Account Analytics:Read`
   - **Zone**: `Zone:Read`, `Analytics:Read`
   - **User**: `User Details:Read`

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_ZONE_ID=your_zone_id_here

# For production deployment
CLOUDFLARE_WORKERS_SUBDOMAIN=monetizr
```

### 4. Test MCP Connection

```bash
# Test the Workers Bindings server
npx mcp-remote https://bindings.mcp.cloudflare.com/sse

# Test the Documentation server
npx mcp-remote https://docs.mcp.cloudflare.com/sse
```

## Usage Examples for Monetizr

### Setting up D1 Database
Ask your AI assistant:
> "Using the Cloudflare Workers Bindings MCP, help me set up a D1 database for the Monetizr project with the schema we defined in packages/db/index.ts"

### Deploying Workers
> "Help me deploy the Monetizr authentication API as a Cloudflare Worker using the Workers Bindings MCP"

### Setting up R2 Storage
> "Configure R2 storage for campaign material uploads in the Monetizr project"

### Monitoring Performance
> "Use the Observability MCP to check the performance and logs of my Monetizr Workers"

### Analytics Tracking
> "Set up analytics tracking for campaign views and clicks using the GraphQL MCP"

## Integration with Your MCP Client

### For Claude Desktop
Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cloudflare-workers": {
      "command": "npx",
      "args": ["mcp-remote", "https://bindings.mcp.cloudflare.com/sse"]
    },
    "cloudflare-docs": {
      "command": "npx", 
      "args": ["mcp-remote", "https://docs.mcp.cloudflare.com/sse"]
    }
  }
}
```

### For Cursor
Add the MCP servers in Cursor's settings under "Model Context Protocol".

## Next Steps for Monetizr

1. **Set up D1 Database**: Use the Workers Bindings MCP to create and configure your production database
2. **Deploy Authentication Workers**: Move your auth APIs to Cloudflare Workers
3. **Configure R2 Storage**: Set up file storage for campaign materials
4. **Set up Analytics**: Implement tracking for campaign performance
5. **Monitor Performance**: Use observability tools to ensure optimal performance

## Troubleshooting

### Common Issues

1. **"Authentication failed"**
   - Check your API token permissions
   - Ensure the token hasn't expired

2. **"Connection timeout"**
   - Check your internet connection
   - Try a different MCP server URL

3. **"Command not found: npx"**
   - Install Node.js: `winget install OpenJS.NodeJS`
   - Restart your terminal

### Getting Help

- [Cloudflare MCP Documentation](https://github.com/cloudflare/mcp-server-cloudflare)
- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)

## Benefits for Monetizr

Using Cloudflare MCP servers will help you:

1. **Faster Development**: Natural language interface to Cloudflare services
2. **Better Architecture**: Leverage Cloudflare's edge computing for global performance
3. **Cost Effective**: Pay-per-use pricing model
4. **Scalable**: Handle traffic spikes automatically
5. **Integrated**: All services work together seamlessly

Start with the Workers Bindings MCP to set up your core infrastructure, then expand to other services as needed!
