# Deployment Guide - Ask GAR

This guide will walk you through deploying Ask GAR to production on Vercel with Supabase.

## Prerequisites

- GitHub account with your repository pushed
- Supabase account (https://supabase.com)
- Vercel account (https://vercel.com)

## Step 1: Supabase Setup

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in the project details:
   - Name: `ask-gar` (or your preferred name)
   - Database Password: (create a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be ready (2-3 minutes)

### Set Up Database Schema

1. In your Supabase project, go to the **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `scripts/init-schema.sql`
4. Click "Run"
5. Create another query and paste `scripts/02-create-profile-trigger.sql`
6. Click "Run"

You should see "Success" messages after both queries complete.

### Get API Keys

1. Go to **Settings → API**
2. Copy the following values:
   - **Project URL** - `https://your-project.supabase.co`
   - **anon/public** key under **Project API keys**
3. Save these somewhere safe - you'll need them next

### Optional: Enable RLS (Row Level Security)

Your RLS policies are already defined in the schema. To verify they're active:

1. Go to **Authentication → Policies**
2. You should see policies for:
   - `profiles` table
   - `questions` table
   - `shares` table

## Step 2: Deploy to Vercel

### Option A: Deploy with Git (Recommended)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Deploy Ask GAR"
git push origin main
```

2. **Go to Vercel**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - Under "Environment Variables", add:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - Click "Deploy"

4. **Wait for deployment to complete**
   - Vercel will build and deploy your app
   - You'll see a "Deployment Complete" message
   - Click the URL to visit your app

### Option B: Deploy with Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Add environment variables**
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

5. **Deploy to production**
```bash
vercel --prod
```

## Step 3: Update Supabase Auth Settings

After deployment, configure your auth redirect URLs:

1. Go to your Supabase project → **Authentication → URL Configuration**
2. Add your Vercel deployment URL to "Site URL":
   - Example: `https://ask-gar.vercel.app`
3. Add to "Redirect URLs":
   - `https://ask-gar.vercel.app/auth/callback`
   - `https://ask-gar.vercel.app/auth/error`
4. Click "Save"

## Step 4: Enable Email Provider (Optional but Recommended)

To enable email sign-ups:

1. In Supabase, go to **Authentication → Providers**
2. Click "Email"
3. Toggle "Enable Email provider"
4. Under "Email Templates", customize if desired:
   - Confirmation link (sent after signup)
   - Password reset email
   - Magic link login
5. Click "Save"

## Step 5: Configure Domain (Optional)

To use a custom domain:

### On Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### On Supabase:
Update your "Site URL" in **Authentication → URL Configuration** to use your custom domain

## Step 6: Testing Your Deployment

1. **Visit your deployed app**
   - Example: `https://ask-gar.vercel.app`
   
2. **Test Sign Up**
   - Go to `/auth/sign-up`
   - Create a new account
   - Check your email for confirmation link
   - Click the link to confirm
   
3. **Test Core Features**
   - Submit a question
   - View inbox
   - Answer a question
   - Try sharing functionality

4. **Check Logs**
   - On Vercel: Go to project → Deployments → Function Logs
   - On Supabase: Go to SQL Editor → Logs for database activity

## Troubleshooting

### "Failed to fetch questions" Error

**Cause:** Environment variables not set correctly

**Solution:**
1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel settings
2. Redeploy after adding/updating variables

### Authentication Redirect Loop

**Cause:** Redirect URL not configured in Supabase

**Solution:**
1. In Supabase → Authentication → URL Configuration
2. Ensure "Site URL" is set to your deployed URL (e.g., `https://ask-gar.vercel.app`)
3. Add `/auth/callback` to redirect URLs

### Email Confirmation Not Arriving

**Cause:** Email provider not configured

**Solution:**
1. In Supabase → Authentication → Email
2. Enable the Email provider
3. Check spam folder
4. Verify sender address in Email Templates

### Database Connection Error

**Cause:** RLS policies blocking queries

**Solution:**
1. Verify user is authenticated (check Auth in browser DevTools)
2. Check RLS policies in Supabase → Authentication → Policies
3. Ensure policies allow the operation

## Performance Optimization

### Enable Caching

1. In Vercel project settings → **Caching**
2. Set appropriate cache control headers for your deployment

### Monitor Database

1. In Supabase → **Database → Health**
2. Monitor connection usage and query performance
3. Optimize slow queries as needed

### Enable CDN

1. In Supabase → **Storage → CDN**
2. Enable for any static assets

## Security Best Practices

### Environment Variables
- ✅ Store secrets in Vercel environment variables
- ✅ Never commit `.env.local` to GitHub
- ❌ Never expose `SUPABASE_SERVICE_ROLE_KEY` in client code

### Database Security
- ✅ RLS policies are already configured
- ✅ All data operations require authentication
- ✅ Users can only access their own data

### CORS
- ✅ Supabase CORS is configured automatically
- ✅ Only your domain can access the API

## Monitoring

### Vercel Analytics
1. Go to project → Analytics
2. Monitor:
   - Page views and users
   - Web vitals (Core Web Vitals)
   - Deployment status

### Supabase Monitoring
1. Go to project → Dashboard
2. Monitor:
   - Realtime connections
   - API usage
   - Database connections
   - Storage usage

## Updating After Deployment

### Deploy Code Changes
1. Push changes to GitHub
2. Vercel automatically redeploys
3. Your app is updated immediately

### Update Database Schema
1. Create new SQL migrations in `scripts/`
2. Run them in Supabase SQL Editor
3. No app redeployment needed for schema-only changes

## Rolling Back

### Revert to Previous Deployment
1. In Vercel project → Deployments
2. Find the previous working deployment
3. Click "Redeploy"

## Support

For issues:
- Check Vercel logs: Project → Deployments → Function Logs
- Check Supabase logs: Project → Logs → PostgreSQL
- Read error messages in browser console (F12)

---

**Congratulations!** Your Ask GAR app is now live and ready for users!
