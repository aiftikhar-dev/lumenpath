# Deployment Guide for LumenPath AI

## Vercel Deployment

### 1. Initial Setup

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

### 2. Build and Deploy

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

   Or use the Vercel dashboard:
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Set install command: `npm install`

### 3. Environment Variables

If you have any environment variables, add them in the Vercel dashboard:
- Go to your project settings
- Navigate to Environment Variables
- Add any required API keys or configuration

### 4. Routing Configuration

The `vercel.json` file handles client-side routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures that all routes redirect to `index.html`, allowing React Router to handle client-side routing.

## Common Issues and Solutions

### Issue: 404 on Page Refresh

**Problem**: Users get 404 errors when refreshing pages or navigating directly to URLs.

**Solution**: The `vercel.json` file with rewrites handles this.

### Issue: Routes Not Working

**Problem**: Only the home page works, other routes return 404.

**Solution**: Ensure `vercel.json` is in the root directory and properly configured.

### Issue: Build Failures

**Problem**: Build process fails during deployment.

**Solution**: 
1. Test build locally: `npm run build`
2. Check for TypeScript errors: `npx tsc --noEmit`
3. Ensure all dependencies are in `package.json`

## Alternative Hosting Solutions

### Netlify

Create `netlify.toml`:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## Testing Deployment

### 1. Local Testing

```bash
# Build the project
npm run build

# Preview the build
npm run preview

# Test all routes manually
# Navigate to: http://localhost:3000/student
# Navigate to: http://localhost:3000/faculty
# Navigate to: http://localhost:3000/leadership
```

### 2. Production Testing

After deployment, test:
- [ ] Home page loads (`/`)
- [ ] Student dashboard (`/student`)
- [ ] Faculty dashboard (`/faculty`)
- [ ] Leadership dashboard (`/leadership`)
- [ ] System flow page (`/help/system-flow`)
- [ ] Page refresh works on all routes
- [ ] Direct URL navigation works

## Performance Optimization

### 1. Build Optimization

The updated `vite.config.ts` includes:
- Manual chunk splitting for better caching
- Vendor bundle separation
- UI component bundling

### 2. Bundle Analysis

Analyze your bundle size:
```bash
npm install -g vite-bundle-analyzer
vite-bundle-analyzer dist
```

## Troubleshooting

### Check Vercel Logs

1. Go to your Vercel dashboard
2. Select your project
3. Go to Functions tab
4. Check for any build or runtime errors

### Common Build Errors

1. **TypeScript Errors**: Run `npx tsc --noEmit` locally
2. **Missing Dependencies**: Ensure all imports are properly resolved
3. **Path Aliases**: Verify `@/` paths are working in production

### Route Testing

Test these specific routes after deployment:
- `/` → LoginPage
- `/student` → StudentDashboard
- `/faculty` → FacultyDashboard
- `/leadership` → LeadershipDashboard
- `/help/system-flow` → SystemFlowPage
- `/nonexistent` → NotFound (404 page)

## Support

If you continue to have issues:
1. Check Vercel deployment logs
2. Verify `vercel.json` is in the root directory
3. Ensure build completes successfully
4. Test routes locally with `npm run preview`
5. Check browser console for JavaScript errors
