# 🧠 Magic Mind Blog

A modern, full-featured blog platform built with Next.js, Convex, and Better Auth. Magic Mind Blog is designed for sharing psychology, mental health insights, and self-growth stories with a beautiful, responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Convex](https://img.shields.io/badge/Convex-1.31.0-purple?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 User Interface

- **Modern Glassmorphism Design** - Beautiful glassmorphic UI with gradient backgrounds
- **Fully Responsive** - Mobile-first design with full-screen hamburger menu
- **Dark Theme** - Elegant dark color scheme optimized for reading
- **Smooth Animations** - Polished transitions and hover effects
- **Myanmar Font Support** - Special typography support for Myanmar language

### 📝 Blog Management

- **Rich Text Editor** - TipTap-powered WYSIWYG editor with extensive formatting options
- **Image Upload** - Cover image support with Convex storage integration
- **Search Functionality** - Full-text search across blog posts
- **Pagination** - Efficient pagination for blog listings
- **SEO Optimized** - Dynamic metadata generation for social sharing

### 👥 User Features

- **User Authentication** - Secure email/password authentication with Better Auth
- **User Profiles** - Customizable user profiles with avatars
- **Role-Based Access** - Admin and user role management
- **Comments System** - Nested comments with reply functionality
- **Comment Likes** - Like/unlike comments feature

### 🔐 Admin Dashboard

- **Post Management** - Create, edit, and delete blog posts
- **User Management** - View and manage user roles
- **Dashboard Analytics** - Overview of posts and user activity
- **Protected Routes** - Admin-only access to dashboard features

### 🚀 Performance

- **Static Generation** - ISR (Incremental Static Regeneration) for optimal performance
- **Optimized Images** - Next.js Image optimization with remote patterns
- **Speed Insights** - Vercel Speed Insights integration
- **Efficient Queries** - Optimized Convex queries with pagination

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **SCSS** - Enhanced styling capabilities
- **TipTap** - Rich text editor
- **Lucide React** - Icon library
- **React Hook Form** - Form management

### Backend & Database

- **Convex** - Real-time backend and database
- **Better Auth** - Authentication solution
- **Convex Storage** - File storage for images

### UI Components

- **Radix UI** - Accessible component primitives
- **Floating UI** - Positioning utilities
- **Custom Components** - Reusable UI components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ (or Bun)
- **npm**, **yarn**, or **bun** package manager
- **Convex account** - Sign up at [convex.dev](https://convex.dev)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/magic-blog.git
cd magic-blog
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using bun:

```bash
bun install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

# Site URL (for authentication and metadata)
SITE_URL=http://localhost:3000
CONVEX_SITE_URL=http://localhost:3000

# Optional: Public site URL for production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

See `.env.example` for a template.

### 4. Set Up Convex

1. Install Convex CLI globally:

```bash
npm install -g convex
```

2. Login to Convex:

```bash
npx convex login
```

3. Initialize Convex in your project:

```bash
npx convex dev
```

This will:

- Create a new Convex project (if you don't have one)
- Generate the deployment URL
- Push your schema and functions
- Start the Convex dev server

4. Copy the deployment URL and add it to your `.env.local` file as `NEXT_PUBLIC_CONVEX_URL`

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create Your First Admin User

1. Sign up for an account at `/sign-up`
2. The first user will be created with `role: "user"` by default
3. To make a user an admin, you need to update the role in the Convex dashboard:
   - Go to your Convex dashboard
   - Navigate to the `profiles` table
   - Find your user profile
   - Update the `role` field to `"admin"`

Alternatively, you can use the Convex dashboard to run a mutation to update the role.

## 📁 Project Structure

```
magic-blog/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication routes
│   │   ├── sign-in/        # Sign in page
│   │   └── sign-up/        # Sign up page
│   ├── api/                # API routes
│   │   ├── auth/           # Better Auth endpoints
│   │   └── blog/           # Blog metadata API
│   ├── blog/               # Blog pages
│   │   ├── [id]/           # Individual blog post
│   │   └── page.tsx        # Blog listing
│   ├── dashboard/          # Admin dashboard
│   │   ├── createBlog/     # Create blog post
│   │   ├── posts/          # Post management
│   │   └── users/          # User management
│   ├── about/              # About page
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── blog/               # Blog-related components
│   ├── dashboard/          # Dashboard components
│   ├── home/               # Home page components
│   ├── tiptap-*/           # TipTap editor components
│   └── ui/                 # Reusable UI components
├── convex/                 # Convex backend
│   ├── blogPost.ts         # Blog post mutations/queries
│   ├── comment.ts          # Comment system
│   ├── user.ts             # User management
│   ├── auth.ts             # Authentication setup
│   └── schema.ts           # Database schema
├── lib/                    # Utility libraries
│   ├── auth-client.ts      # Client-side auth
│   ├── auth-server.ts     # Server-side auth
│   └── tiptap-utils.ts    # TipTap utilities
├── hooks/                  # Custom React hooks
├── styles/                 # Global styles
│   ├── _variables.scss    # SCSS variables
│   └── _keyframe-animations.scss  # Animations
└── public/                 # Static assets
```

## 🔧 Configuration

### Convex Schema

The database schema is defined in `convex/schema.ts`:

- **blogs** - Blog posts with search indexing
- **comments** - Nested comment system
- **commentLikes** - Comment likes tracking
- **profiles** - User profiles with roles

### Authentication

Authentication is handled by Better Auth with Convex adapter:

- Email/password authentication
- Session management
- Role-based access control

### Image Configuration

Remote image patterns are configured in `next.config.ts`:

- Google user avatars
- Convex storage URLs
- Avatar service URLs

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Colors

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --color-primary: #3713ec;
  --color-bg-light: #f6f6f8;
  --color-bg-dark: #131022;
}
```

### Fonts

Fonts are configured in `app/layout.tsx`:

- Inter (Latin)
- Noto Sans Myanmar (Myanmar)

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_CONVEX_URL` - Your Convex deployment URL
- `SITE_URL` - Your production site URL (e.g., `https://yourdomain.com`)
- `CONVEX_SITE_URL` - Same as SITE_URL
- `NEXT_PUBLIC_SITE_URL` - Optional, for metadata

### Convex Deployment

Your Convex backend is automatically deployed when you push to the main branch. Make sure your Convex project is connected to your Git repository.

## 🔒 Security

- Authentication is handled securely with Better Auth
- Admin routes are protected server-side
- User roles are validated on the backend
- Image uploads are authenticated
- Environment variables are not exposed to the client (except `NEXT_PUBLIC_*`)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Convex](https://www.convex.dev/) - The Backend Platform
- [Better Auth](https://www.better-auth.com/) - Authentication
- [TipTap](https://tiptap.dev/) - Rich Text Editor
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework

## 📞 Support

For support, email support@magicmindblog.com or open an issue in the repository.

---

Made with ❤️ for sharing knowledge and insights about psychology and mental health.
