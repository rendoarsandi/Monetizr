# 🚀 Cloudflare MCP Integration for Monetizr

This document explains how to use Cloudflare's Model Context Protocol (MCP) servers with your Monetizr project for seamless development and deployment.

## 📋 What's Installed

✅ **mcp-remote** - Global package for connecting to remote MCP servers  
✅ **Node.js** - Required runtime for MCP tools  
✅ **Configuration files** - Ready-to-use MCP server configurations  
✅ **Test scripts** - Verify your MCP setup  

## 🔧 Available MCP Servers

### 🏗️ **Workers Bindings** (Priority #1 for Monetizr)
- **URL**: `https://bindings.mcp.cloudflare.com/sse`
- **Perfect for**: Setting up D1 database, R2 storage, Workers deployment
- **Use cases**: 
  - Migrate from mock database to Cloudflare D1
  - Set up file storage for campaign materials
  - Deploy authentication APIs as Workers

### 📚 **Documentation**
- **URL**: `https://docs.mcp.cloudflare.com/sse`
- **Perfect for**: Getting up-to-date API documentation
- **Use cases**: Learning Cloudflare APIs, troubleshooting

### 🔍 **Observability**
- **URL**: `https://observability.mcp.cloudflare.com/sse`
- **Perfect for**: Monitoring and debugging
- **Use cases**: Check logs, monitor performance, debug issues

### 🌐 **Browser Rendering**
- **URL**: `https://browser.mcp.cloudflare.com/sse`
- **Perfect for**: Processing campaign content
- **Use cases**: Screenshot generation, content validation

### 📊 **GraphQL Analytics**
- **URL**: `https://graphql.mcp.cloudflare.com/sse`
- **Perfect for**: Campaign performance tracking
- **Use cases**: Analytics, reporting, insights

## 🚀 Quick Start

### 1. Test Your Setup
```bash
# Windows Command Prompt
test-mcp.bat

# PowerShell
.\test-mcp.ps1
```

### 2. Get Cloudflare API Token
1. Visit [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Custom token" template
4. Add permissions:
   - **Account**: `Cloudflare Workers:Edit`, `Account Analytics:Read`
   - **Zone**: `Zone:Read`, `Analytics:Read`
   - **User**: `User Details:Read`

### 3. Configure Your MCP Client

#### For Claude Desktop
Add to `claude_desktop_config.json`:
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

#### For Cursor
1. Open Cursor Settings
2. Go to "Model Context Protocol"
3. Add the server URLs from `mcp-config.json`

## 💡 Usage Examples for Monetizr

### Database Migration
> "Using the Cloudflare Workers Bindings MCP, help me migrate the Monetizr database schema from the mock implementation to Cloudflare D1"

### Workers Deployment
> "Deploy the Monetizr authentication API as a Cloudflare Worker with proper environment variables"

### File Storage Setup
> "Configure R2 storage for campaign material uploads with proper CORS settings"

### Performance Monitoring
> "Check the performance and error logs for my Monetizr Workers using the Observability MCP"

### Analytics Implementation
> "Set up campaign view tracking using Cloudflare Analytics and the GraphQL MCP"

## 🔧 Manual Testing

If you want to test MCP connections manually:

```bash
# Test documentation server
npx mcp-remote https://docs.mcp.cloudflare.com/sse

# Test workers bindings server
npx mcp-remote https://bindings.mcp.cloudflare.com/sse

# Test with specific tool listing
npx mcp-remote https://docs.mcp.cloudflare.com/sse --list-tools
```

## 🎯 Next Steps for Monetizr

### Phase 1: Infrastructure Setup
1. **Database Migration**: Use Workers Bindings MCP to set up D1 database
2. **File Storage**: Configure R2 for campaign materials
3. **Workers Deployment**: Move APIs to Cloudflare Workers

### Phase 2: Monitoring & Analytics
1. **Observability**: Set up logging and monitoring
2. **Analytics**: Implement campaign tracking
3. **Performance**: Optimize based on insights

### Phase 3: Advanced Features
1. **Browser Rendering**: Process campaign content
2. **AI Integration**: Use Cloudflare AI for content analysis
3. **Global Distribution**: Leverage edge computing

## 🛠️ Troubleshooting

### Common Issues

**"npx not found"**
- Solution: Restart terminal or run `test-mcp.bat`

**"Connection timeout"**
- Solution: Check internet connection and try different server

**"Authentication failed"**
- Solution: Verify API token permissions and expiration

**"Command not recognized"**
- Solution: Ensure Node.js is in PATH: `C:\Program Files\nodejs\`

### Getting Help

- [Cloudflare MCP Repository](https://github.com/cloudflare/mcp-server-cloudflare)
- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)

## 📁 Files Added to Your Project

- `mcp-config.json` - MCP server configurations
- `setup-cloudflare-mcp.md` - Detailed setup guide
- `test-mcp.bat` - Windows batch test script
- `test-mcp.ps1` - PowerShell test script
- `MCP_INTEGRATION.md` - This documentation

## 🎉 Benefits for Monetizr

✅ **Faster Development** - Natural language interface to Cloudflare  
✅ **Better Architecture** - Leverage edge computing globally  
✅ **Cost Effective** - Pay-per-use pricing model  
✅ **Scalable** - Handle traffic spikes automatically  
✅ **Integrated** - All services work together seamlessly  

Start with the Workers Bindings MCP to migrate your database and deploy your APIs to Cloudflare's global network!
