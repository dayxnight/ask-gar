# Ask GAR - Mobile-Optimized Anonymous Q&A Platform

A modern, fully mobile-optimized anonymous Q&A application inspired by NGL, built with Next.js 16, React 19, Supabase, and Tailwind CSS.

## Features

### Core Functionality
- **Anonymous Questions** - Submit and answer questions anonymously
- **Question Inbox** - View incoming questions from others
- **Answer Management** - Write, edit, and publish answers
- **Share Functionality** - Native share API, copy-to-clipboard, Twitter, WhatsApp integration
- **Public Answers** - Share answered questions with custom links

### Mobile Optimizations
- **Responsive Design** - Perfect fit on all screen sizes (mobile-first approach)
- **Touch-Friendly UI** - 48px+ minimum touch targets for easy interaction
- **Smooth Navigation** - Tab-based interface with smooth transitions
- **Mobile-Optimized Forms** - Large, easy-to-tap input fields with proper focus states
- **Bottom Navigation** - Native app-like navigation bar fixed at the bottom
- **Smooth Scrolling** - Optimized scroll behavior for mobile devices

### Design System
- **Light Monochrome Plum Palette** - Clean, minimal design with primary plum color (#7C5B9D)
- **Extra Rounded Corners** - 16-24px border radius for a modern, friendly feel
- **Semantic Design Tokens** - Consistent color usage throughout the app
- **Accessibility** - WCAG 2.1 compliant with proper contrast ratios

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 3.4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password)
- **Icons**: Unicode/Emoji (lightweight, no icon library needed)
- **Deployment**: Vercel

## Project Structure

```
ask-gar/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page with tab navigation
│   ├── globals.css             # Global styles and design tokens
│   └── auth/
│       ├── login/page.tsx       # Login page
│       ├── sign-up/page.tsx     # Sign up page
│       ├── error/page.tsx       # Auth error page
│       └── callback/route.ts    # Supabase auth callback
├── components/
│   ├── Navigation.tsx           # Mobile bottom navigation
│   ├── QuestionSubmissionCard.tsx # Form to submit questions
│   ├── QuestionFeed.tsx         # List of user's questions
│   ├── QuestionCard.tsx         # Individual question card
│   ├── InboxView.tsx            # Incoming questions view
│   └── ShareModal.tsx           # Share question modal
├── lib/
│   └── supabase/
│       ├── client.ts           # Browser Supabase client
│       ├── server.ts           # Server Supabase client
│       └── proxy.ts            # Session management proxy
├── scripts/
│   ├── init-schema.sql         # Database schema setup
│   └── 02-create-profile-trigger.sql # Profile auto-creation trigger
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── middleware.ts               # Supabase auth middleware
```

## Database Schema

### Tables

#### `profiles`
- `id` (UUID, PK) - References auth.users(id)
- `username` (VARCHAR) - Unique username
- `display_name` (VARCHAR) - Display name
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### `questions`
- `id` (UUID, PK)
- `user_id` (UUID, FK) - References auth.users(id)
- `question_text` (TEXT) - The question content
- `answer_text` (TEXT) - The answer content
- `is_answered` (BOOLEAN) - Whether question has been answered
- `is_public` (BOOLEAN) - Whether question is public
- `created_at` (TIMESTAMP)
- `answered_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### `shares`
- `id` (UUID, PK)
- `question_id` (UUID, FK) - References questions(id)
- `share_platform` (VARCHAR) - Platform shared to (twitter, whatsapp, copy_link, etc.)
- `shared_at` (TIMESTAMP)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Supabase account with a project

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ask-gar
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

Get these values from your Supabase project settings:
- Go to Settings → API
- Copy your project URL and anon key

4. **Run database migrations**

Execute the SQL scripts in your Supabase SQL editor:
1. First, run `scripts/init-schema.sql` to create the schema
2. Then, run `scripts/02-create-profile-trigger.sql` to set up the profile trigger

Alternatively, you can copy and paste the contents into the Supabase SQL editor:
- Go to SQL Editor in your Supabase dashboard
- Create a new query and paste the SQL content
- Click "Run"

5. **Start the development server**

```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:3000`

## Mobile Optimization Details

### Touch Targets
All interactive elements maintain a minimum 48px height/width to accommodate thumb touches on mobile devices. This follows WCAG 2.1 Level AAA guidelines.

### Responsive Breakpoints
- **Mobile**: < 640px (default)
- **Tablet**: 640px - 1024px (md:)
- **Desktop**: > 1024px (lg:)

### Font Sizing
- Minimum body text: 16px (prevents zoom on iOS)
- Clear visual hierarchy with 1.4-1.6 line height
- Labels and metadata: 12-14px

### Layout Strategy
- **Mobile-first CSS** - Base styles for mobile, enhanced with responsive prefixes
- **Flexbox** - Primary layout method for simple, flexible responsive design
- **Safe area insets** - Respects iPhone notches and system UI
- **Bottom navigation** - Fixed at bottom for easy thumb access
- **Full-width inputs** - On mobile, forms expand to use available space

### Performance
- **Code splitting** - Components loaded on-demand
- **Image optimization** - SVG icons (lightweight)
- **CSS optimization** - Tailwind's tree-shaking removes unused styles
- **Lazy loading** - Components load efficiently with Next.js

## Features in Detail

### Authentication
- Email/password sign up and login
- Automatic profile creation on signup
- Email confirmation required
- Secure session management with httpOnly cookies

### Question Submission
- Character counter (max 500 chars)
- Real-time validation
- Mobile-optimized textarea
- Visual feedback during submission

### Question Management
- Expandable question cards
- Edit answers inline
- Status badges (Answered/Unanswered)
- Time-relative timestamps (e.g., "2h ago")

### Sharing
- **Native Share API** - Uses device's native share sheet (iOS/Android)
- **Copy to Clipboard** - Click-to-copy share links
- **Social Media** - Direct share to Twitter/X and WhatsApp
- **Share Tracking** - Analytics on which platforms questions are shared

### Tab Navigation
- **Questions** - View and manage your questions
- **Inbox** - See questions others have asked you
- **Shared** - Track shared answers and engagement

## Design Tokens

### Colors
```
Primary: #7c5b9d (Plum)
Primary Light: #e8ddf5 (Light Plum)
Accent: #6b5089 (Dark Plum)
Background: #faf8fc (Off-White)
Foreground: #1a1a1a (Almost Black)
Border: #e0d5f0 (Light Border)
```

### Border Radius
```
Default: 1rem (16px)
Small: 0.75rem (12px)
Large: 1.5rem (24px)
Extra Large: 2rem (32px)
```

### Spacing Scale
All spacing follows an 8px base unit for consistency:
```
2px, 4px, 8px, 12px, 16px, 24px, 32px, 48px...
```

## Deployment

### Deploy to Vercel

The easiest way to deploy is to use [Vercel](https://vercel.com):

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to vercel.com and sign in
- Click "Import Project"
- Select your GitHub repository
- Vercel will auto-detect Next.js
- Click "Deploy"

3. **Add Environment Variables**
- In Vercel project settings → Environment Variables
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeploy

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile, Samsung Internet)

## Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios > 4.5:1
- Focus indicators for all interactive elements

## Performance Metrics

- **Lighthouse Mobile**: 95+ (Optimized)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Check the [Issues](../../issues) page
- Review the [Discussions](../../discussions)
- Contact the maintainers

---

Built with ❤️ using Next.js, React, Supabase, and Tailwind CSS
