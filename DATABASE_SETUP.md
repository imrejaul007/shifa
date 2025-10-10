# Database Setup Guide - Shifa AlHind

## PostgreSQL Database Setup

The Shifa AlHind platform uses PostgreSQL as its database. To populate the blog posts and other seed data, you'll need to set up PostgreSQL first.

## Option 1: Install PostgreSQL Locally (Recommended for Development)

### macOS Installation

```bash
# Install PostgreSQL using Homebrew
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Verify installation
psql --version
```

### Create Database

```bash
# Create the database
createdb shifaalhind

# Or using psql
psql postgres
CREATE DATABASE shifaalhind;
\q
```

## Option 2: Use Docker (Alternative)

If you prefer Docker:

```bash
# Create docker-compose.yml in project root
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    container_name: shifaalhind-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: shifaalhind
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
EOF

# Start PostgreSQL container
docker-compose up -d

# Check if running
docker ps
```

## Setup Environment Variables

Ensure your `.env` file has the correct database connection:

```bash
# PostgreSQL Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shifaalhind?schema=public"
```

## Run Database Migrations

Once PostgreSQL is running:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Check database structure
npm run db:studio
```

## Seed the Database with Blog Posts

After the database is set up and migrations are run:

```bash
# Run the seed script to populate:
# - 7 comprehensive blog posts
# - Sample hospitals, doctors, treatments
# - Sample bookings and users
npm run db:seed
```

Expected output:

```
🌱 Starting seed...
✅ Cleared existing data
✅ Created users
✅ Created translator profile
✅ Created Hospital
✅ Created Doctors
✅ Created Treatments
✅ Created Package
✅ Created 7 comprehensive SEO-optimized blog posts
   - 3 Cost Comparison Articles (IVF, Heart Surgery, Knee Replacement)
   - 2 Process Guides (Medical Visa, Saudi Planning)
   - 1 Success Story (IVF Journey)
   - 1 Service Guide (Top Hospitals with Arabic Support)
✅ Created sample booking

🎉 Seed completed successfully!

📧 Login credentials:
   Admin: admin@shifaalhind.com / admin123
   Editor: editor@shifaalhind.com / editor123
   Translator: translator@shifaalhind.com / translator123
```

## Verify Blog Posts

### Via Prisma Studio (GUI)

```bash
npm run db:studio
```

Navigate to `ContentPage` table - you should see 7 blog posts with type='blog'

### Via Database Query

```bash
psql shifaalhind
SELECT slug, title_en, published FROM "ContentPage" WHERE type = 'blog';
```

### Via Frontend

```bash
# Start dev server
npm run dev

# Visit in browser
http://localhost:3000/en/blog
http://localhost:3000/ar/blog
```

You should see all 7 blog posts listed!

## Troubleshooting

### Database Connection Error

```
Error: P1001: Can't reach database server at `localhost:5432`
```

**Solution:** Ensure PostgreSQL is running

```bash
# Check if running
lsof -i :5432

# Start if not running (Homebrew)
brew services start postgresql@15

# Or Docker
docker-compose up -d
```

### Seed Fails - Tables Don't Exist

```
Error: Table 'ContentPage' does not exist
```

**Solution:** Run migrations first

```bash
npm run db:push
```

### Permission Denied

```
Error: permission denied for schema public
```

**Solution:** Grant permissions

```bash
psql shifaalhind
GRANT ALL ON SCHEMA public TO postgres;
```

## Next Steps After Seeding

1. ✅ Database seeded with 7 blog posts
2. Verify blogs appear at `/en/blog` and `/ar/blog`
3. Test blog post detail pages
4. Check Arabic RTL rendering
5. Verify structured data in page source
6. Test responsive design on mobile

## Production Database Setup

For production deployment:

1. Use managed PostgreSQL service (AWS RDS, Supabase, Railway, etc.)
2. Update `DATABASE_URL` in production environment variables
3. Run migrations: `npx prisma migrate deploy`
4. Optional: Seed production data selectively

## Useful Commands

```bash
# View database schema
npm run db:studio

# Reset database (CAUTION: Deletes all data)
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name add_feature

# Format Prisma schema
npx prisma format

# Pull schema from existing database
npx prisma db pull
```

## Contact

If you encounter issues:

1. Check `.env` file for correct DATABASE_URL
2. Verify PostgreSQL is running: `lsof -i :5432`
3. Check Prisma logs for detailed errors
4. Consult Prisma documentation: https://www.prisma.io/docs

---

**Last Updated:** October 10, 2025
