# Quick Start Guide - Ask GAR

Get up and running with Ask GAR in 5 minutes!

## 1. Clone & Install (2 min)

```bash
# Clone the repository
git clone <your-repo-url>
cd ask-gar

# Install dependencies
npm install
```

## 2. Set Up Supabase (2 min)

### Create a Free Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (recommended)
4. Create a new project:
   - **Name**: ask-gar
   - **Password**: Create a strong password (save it!)
   - **Region**: Closest to you
5. Click "Create new project" and wait 2-3 minutes

### Set Up Database

1. In Supabase, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire content of `scripts/init-schema.sql`
4. Paste it and click "Run"
5. Do the same for `scripts/02-create-profile-trigger.sql`

### Get Your Keys

1. Go to **Settings → API**
2. Copy these two values:
   ```
   NEXT_PUBLIC_SUPABASE_URL = (your project URL)
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (your anon key)
   ```

## 3. Add Environment Variables (1 min)

Create `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

## 4. Run the App (Instant!)

```bash
npm run dev
```

Visit `http://localhost:3000` and you're done! 🎉

## What to Try First

### Test Sign Up
1. Click "Sign In" → "Create Account"
2. Enter email, username, password
3. Check your email for confirmation link
4. Click it to activate your account

### Ask a Question
1. After login, type a question
2. Click "Submit Question"
3. Watch it appear in your feed

### Answer Questions
1. Go to "Inbox" tab
2. Click a question to expand
3. Click "Write Answer"
4. Type your answer and save

### Share Answers
1. Expand a question with an answer
2. Click "Share"
3. Choose how to share:
   - Copy link
   - Tweet/X
   - WhatsApp
   - Native share

## Project Structure

```
ask-gar/
├── app/
│   ├── page.tsx          ← Home page (main UI)
│   ├── layout.tsx        ← Layout with metadata
│   ├── globals.css       ← Global styles & design tokens
│   └── auth/             ← Login/signup pages
├── components/           ← Reusable UI components
├── lib/supabase/         ← Supabase configuration
├── scripts/              ← Database migration scripts
└── README.md             ← Full documentation
```

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Troubleshooting

### "Failed to fetch" Error
- Check your env variables in `.env.local`
- Verify Supabase URL and key are correct
- Make sure the database migrations ran successfully

### Email Confirmation Not Arriving
- Check spam folder
- Wait 30 seconds and try requesting a new confirmation email

### Can't Sign In After Sign Up
- The app requires email confirmation
- Click the link in the confirmation email first
- Then sign in with the same credentials

## Key Features

✅ **Anonymous Questions** - Ask and answer safely
✅ **Mobile Optimized** - Perfect on any device
✅ **Share Answers** - Twitter, WhatsApp, or copy link
✅ **Private & Secure** - Uses Supabase authentication
✅ **Super Fast** - Built with Next.js

## Deploy to Production

Ready to go live? See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step instructions to deploy on Vercel.

## Need Help?

- Read [README.md](./README.md) for full documentation
- Check [MOBILE_DESIGN_SPECS.md](./MOBILE_DESIGN_SPECS.md) for design details
- See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for production setup

## File Reference

Key files you'll likely work with:

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main home page component |
| `app/globals.css` | Global styles & design tokens |
| `tailwind.config.ts` | Tailwind color configuration |
| `components/*.tsx` | UI components |
| `scripts/*.sql` | Database schemas |
| `.env.local` | Your local environment variables |

## What's Next?

1. ✅ Run the app locally
2. ✅ Test all features
3. ✅ Deploy to Vercel
4. ✅ Share your link with friends
5. ✅ Start asking questions!

---

**You're all set!** Have fun building! 🚀

For production deployment, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
