# 🏥 Shifa AlHind - Medical Tourism Platform

**Trusted Medical Care in Bangalore for GCC Patients**

A production-ready, SEO-first, bilingual (English + Arabic) medical tourism platform connecting GCC patients to top hospitals in Bangalore, India.

## 🎯 Features

- ✅ **Bilingual Support**: Full English & Arabic localization with RTL support
- ✅ **SEO Optimized**: JSON-LD schema, meta tags, sitemap, hreflang
- ✅ **Admin CMS**: Full-featured dashboard for content management
- ✅ **Role-Based Access**: Admin, Editor, Translator, Partner roles
- ✅ **Booking Management**: Lead tracking, translator assignment, notifications
- ✅ **Media Management**: S3 integration ready with image optimization
- ✅ **Search Ready**: Algolia integration setup
- ✅ **Responsive Design**: Mobile-first with Tailwind CSS

## 🚀 Quick Start

> **⚡ New here? Start with [QUICK-START.md](./QUICK-START.md) for a 5-minute setup guide!**
>
> **📖 For detailed setup instructions, see [SETUP.md](./SETUP.md)**
>
> **🚀 Ready to deploy? See [DEPLOYMENT.md](./DEPLOYMENT.md)**

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

### 1. Clone and Install

```bash
cd shifa-alhind
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
# Database (Required)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shifaalhind"

# NextAuth (Required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: AWS S3, Algolia, SendGrid, Twilio
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed sample data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en) (redirects to English homepage)

## 🔐 Demo Credentials

After seeding, you can log in at `/admin/login` with:

| Role       | Email                      | Password      |
| ---------- | -------------------------- | ------------- |
| Admin      | admin@shifaalhind.com      | admin123      |
| Editor     | editor@shifaalhind.com     | editor123     |
| Translator | translator@shifaalhind.com | translator123 |

## 📁 Project Structure

```
shifa-alhind/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Sample data
├── src/
│   ├── app/
│   │   ├── [locale]/      # Public pages (EN/AR)
│   │   ├── admin/         # Admin dashboard
│   │   └── api/           # API routes
│   ├── components/        # React components
│   ├── lib/
│   │   ├── auth.ts        # NextAuth config
│   │   ├── prisma.ts      # Prisma client
│   │   └── utils.ts       # Utility functions
│   └── types/             # TypeScript types
├── .env                   # Environment variables
└── package.json
```

## 🗄️ Database Schema

### Core Models

- **User**: Admin, editors, translators
- **Hospital**: Hospital listings with bilingual content
- **Doctor**: Doctor profiles with specialties
- **Treatment**: Treatment pages with cost info
- **Booking**: Patient leads and bookings
- **ContentPage**: Blog posts and static pages
- **Media**: Image/file management
- **Translator**: Translator profiles

## 🌐 Internationalization

- **English**: Default locale (`/en/*`)
- **Arabic**: RTL support (`/ar/*`)
- Uses Next.js App Router with `[locale]` dynamic routes
- Auto-detects language from URL or browser settings

## 🎨 Styling

- **Tailwind CSS 4**: Utility-first styling
- **RTL Support**: Automatic direction switching for Arabic
- **Arabic Fonts**: Cairo & Noto Naskh Arabic from Google Fonts
- **Custom Theme**: Medical/healthcare color palette (sky blue primary)

## 🔒 Authentication & Authorization

- **NextAuth v5**: Email/password authentication
- **Role-Based Access**: 4 user roles (Admin, Editor, Translator, Partner)
- **Protected Routes**: Middleware guards for `/admin/*`
- **Session Management**: JWT-based sessions

## 📊 SEO Features

- ✅ Server-side rendering (SSR) for public pages
- ✅ Meta tags (title, description, OG, Twitter)
- ✅ JSON-LD schema markup (MedicalProcedure, Physician, Hospital, Article)
- ✅ Dynamic sitemap generation (`/sitemap.xml`)
- ✅ Robots.txt with AI bot blocking (`/robots.txt`)
- ✅ hreflang tags for bilingual content
- ✅ Semantic HTML & accessibility
- ✅ Static params generation for pre-rendering

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to DB
npm run db:seed          # Seed sample data
npm run db:studio        # Open Prisma Studio

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run type-check       # TypeScript check

# Testing
npm run test             # Run Playwright tests
npm run test:ui          # Playwright UI mode
```

## 📦 Tech Stack

| Category     | Technology                   |
| ------------ | ---------------------------- |
| Framework    | Next.js 15.5 (App Router)    |
| Language     | TypeScript 5                 |
| Styling      | Tailwind CSS 4               |
| Database     | PostgreSQL + Prisma          |
| Auth         | NextAuth.js v5               |
| Editor       | TipTap (ready to integrate)  |
| Search       | Algolia (ready to integrate) |
| Media        | AWS S3 + Sharp (ready)       |
| Email        | SendGrid (ready)             |
| SMS/WhatsApp | Twilio (ready)               |
| Testing      | Playwright                   |
| Linting      | ESLint + Prettier            |
| Git Hooks    | Husky + lint-staged          |

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
# Build
npm run build

# Start
npm run start
```

## 🔧 Configuration

### Database

Using Supabase (recommended for quick start):

1. Create project at [supabase.com](https://supabase.com)
2. Get connection string
3. Update `DATABASE_URL` in `.env`

### AWS S3 (Optional)

For media uploads:

1. Create S3 bucket
2. Create IAM user with S3 permissions
3. Add credentials to `.env`

### Algolia (Optional)

For search functionality:

1. Create app at [algolia.com](https://algolia.com)
2. Add credentials to `.env`

## 📝 Project Status

**Current Completion: ~90%** 🎉

### Milestone 1 ✅ (Completed)

- [x] Project scaffold with Next.js + TypeScript
- [x] Prisma schema with all models
- [x] NextAuth authentication
- [x] Basic homepage (EN/AR)
- [x] Admin login page
- [x] Database seeding

### Milestone 2 ✅ (Completed)

- [x] Admin CRUD components (RichTextEditor, ImageUploader, DataTable, Form)
- [x] API routes for all content management (18 endpoints)
- [x] Media upload endpoints with image optimization
- [x] TipTap rich text editor integration
- [x] Admin layout and navigation

### Milestone 3 ✅ (Completed)

- [x] SEO components with JSON-LD structured data
- [x] Dynamic sitemap generation
- [x] Public treatment detail pages
- [x] Public doctor profile pages
- [x] Public hospital detail pages
- [x] Public package detail pages
- [x] Public blog post pages
- [x] GCC country landing pages (6 countries)
- [x] Booking form component with validation

### Milestone 4 (Remaining ~10%)

- [ ] Admin dashboard pages (connect components to API)
- [ ] Email notification system integration
- [ ] Search functionality (Algolia)
- [ ] Analytics integration
- [ ] Production deployment and testing

See [PROJECT-STATUS.md](./PROJECT-STATUS.md) for detailed implementation status.

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Reset database
npx prisma migrate reset
```

### Port Already in Use

```bash
# Change port in package.json dev script
"dev": "next dev -p 3001"
```

## 📄 License

Private - All rights reserved

## 🤝 Support

For issues or questions, contact the development team.

---

**Built with ❤️ for GCC patients seeking quality medical care in India**
