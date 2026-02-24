vercel::    //  "build": "prisma generate && tsup src/index.ts --format esm --platform node --target node20 --outDir api --external pg-native",

# edtech 🎓

### _"Connect with Expert Tutors, Learn Anything"_

edtech is a full-stack tutoring platform where students can discover expert tutors, book sessions, and leave reviews — while tutors manage their profiles, availability, and teaching sessions. Admins oversee the entire platform.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Admin Setup](#-admin-setup)
- [API Endpoints](#-api-endpoints)
- [Pages & Routes](#-pages--routes)
- [Booking Flow](#-booking-flow)
- [User Roles](#-user-roles)

---

## ✨ Features

### 🌐 Public
- Browse and search tutors by subject, rating, and price
- Filter tutors by category
- View detailed tutor profiles with reviews
- Landing page with featured tutors

### 👨‍🎓 Student
- Register & login as a student
- Book tutoring sessions with available tutors
- Cancel bookings anytime
- Leave and edit reviews after completed sessions
- Manage personal profile

### 👨‍🏫 Tutor
- Register & login as a tutor
- Create and update tutor profile (bio, hourly rate, experience)
- Set weekly availability slots
- View and manage teaching sessions
- Mark sessions as completed
- Track ratings and reviews

### 🛡️ Admin
- View all users (students & tutors)
- Ban / unban users
- View all bookings across the platform
- Manage subject categories

---

## 🛠️ Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | Next.js 14 (App Router), TypeScript     |
| Styling    | Tailwind CSS, shadcn/ui                 |
| Backend    | Node.js, Express.js, TypeScript         |
| Auth       | Better Auth                             |
| ORM        | Prisma                                  |
| Database   | PostgreSQL                              |

---

## 📁 Project Structure

```
skillbridge/
├── frontend/                   # Next.js App (App Router)
│   ├── app/                    # Pages & layouts
│   ├── components/             # Reusable UI components
│   │   └── modules/            # Feature-specific components
│   ├── lib/                    # Utilities, API helpers
│   └── types/                  # TypeScript types
│
└── backend/                    # Express.js API
    ├── src/
    │   ├── modules/
    │   │   ├── booking/        # Booking CRUD & status management
    │   │   ├── review/         # Review create & update
    │   │   ├── tutor/          # Tutor profile & availability
    │   │   ├── student/        # Student dashboard & profile
    │   │   ├── admin/          # Admin management
    │   │   └── category/       # Subject categories
    │   ├── lib/                # Prisma client, auth config
    │   └── middlewares/        # Auth, error handling
    ├── prisma/
    │   └── schema.prisma       # Database schema
    └── generated/              # Prisma generated client
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) — v18 or higher
- [PostgreSQL](https://www.postgresql.org/) — v14 or higher
- npm

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/edtech-backend.git
cd edtech-backend
```

---

### Step 2 — Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/skillbridge"
BETTER_AUTH_SECRET="your-super-secret-key-minimum-32-characters"
APP_URL="http://localhost:3000"
PORT=5000
```

Run database migrations and generate Prisma client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Seed the admin user:

```bash
npx ts-node src/seed.ts
```

Start the backend development server:

```bash
npm run dev
```

✅ Backend runs at: `http://localhost:5000`

---

### Step 3 — Frontend Setup

Open a **new terminal**, then:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend/`:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
BETTER_AUTH_SECRET="your-super-secret-key-minimum-32-characters"
BETTER_AUTH_URL="http://localhost:5000"
```

> ⚠️ `BETTER_AUTH_SECRET` must be **identical** in both frontend and backend `.env` files.

Start the frontend development server:

```bash
npm run dev
```

✅ Frontend runs at: `http://localhost:3000`

---

## 🔐 Environment Variables

### Backend — `backend/.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/skillbridge` |
| `BETTER_AUTH_SECRET` | Auth secret key (min 32 chars) | `my-very-long-secret-key-here-32chars` |
| `APP_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `PORT` | Backend server port | `5000` |

### Frontend — `frontend/.env.local`

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000` |
| `BETTER_AUTH_SECRET` | Same secret as backend | `my-very-long-secret-key-here-32chars` |
| `BETTER_AUTH_URL` | Backend URL for auth | `http://localhost:5000` |

---

## 🗄️ Database Setup

The schema includes these tables:

| Table | Description |
|-------|-------------|
| `users` | All platform users with role info |
| `tutor_profiles` | Tutor-specific info (bio, hourly rate, rating) |
| `categories` | Subject categories (Math, Physics, etc.) |
| `bookings` | Sessions between student & tutor |
| `reviews` | Student reviews with star ratings |
| `availabilities` | Tutor weekly schedule (day + time slots) |

To visually browse your database:

```bash
cd backend
npx prisma studio
```

Opens at: `http://localhost:5555`

---

## 👑 Admin Setup

Admin accounts **cannot self-register** — they must be added directly to the database.

### Option 1 — Seed Script (Recommended)

```bash
cd backend
npx ts-node src/seed.ts
```

### Option 2 — Prisma Studio

1. Run `npx prisma studio`
2. Go to the `users` table
3. Add a new row with `role: "ADMIN"` and valid credentials

### Option 3 — SQL (after registering via the app)

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

---

## 📡 API Endpoints

### Authentication (Better Auth)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/sign-up/email` | Register new user |
| POST | `/api/auth/sign-in/email` | Login user |
| GET | `/api/auth/session` | Get current session |
| POST | `/api/auth/sign-out` | Logout |

### Tutors — Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tutors` | Get all tutors (filter by category, rating, price) |
| GET | `/api/tutors/:id` | Get single tutor with profile & reviews |

### Categories — Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all active categories |

### Bookings — Authenticated

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/bookings` | Student | Create a new booking |
| GET | `/api/bookings` | Student / Tutor | Get my bookings |
| GET | `/api/bookings/:id` | Any | Get booking details |
| PATCH | `/api/bookings/:id/complete` | Tutor | Mark session as completed |
| PATCH | `/api/bookings/:id/cancel` | Student | Cancel a booking |

### Reviews — Authenticated

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/reviews` | Student | Create review for completed session |
| GET | `/api/reviews/:id` | Student | Get own review |
| PATCH | `/api/reviews/:id` | Student | Edit review |

### Student Dashboard — Authenticated

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Stats (total & completed bookings) |
| GET | `/api/dashboard/bookings` | Full booking history |
| GET | `/api/dashboard/profile` | My profile info |
| PATCH | `/api/dashboard/profile` | Update name / image |

### Tutor Management — Authenticated

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tutors/profile` | Create tutor profile |
| PUT | `/api/tutors/profile` | Update tutor profile |
| GET | `/api/tutors/availability` | Get my availability |
| PUT | `/api/tutors/availability` | Update weekly availability |

### Admin — Admin Only

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| PATCH | `/api/admin/users/:id` | Ban / unban a user |
| GET | `/api/admin/bookings` | Get all platform bookings |
| GET | `/api/admin/categories` | Get all categories |
| POST | `/api/admin/categories` | Create a new category |
| PATCH | `/api/admin/categories/:id` | Update category |

---

## 🌐 Pages & Routes

### Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero section, featured tutors, categories |
| `/tutors` | Browse Tutors | Filter by subject, price, rating |
| `/tutors/:id` | Tutor Profile | Full profile, reviews, booking form |
| `/login` | Login | Sign in |
| `/register` | Register | Sign up — choose Student or Tutor role |

### Student Routes (Private)

| Route | Page | Description |
|-------|------|-------------|
| `/student/dashboard` | Dashboard | Stats overview |
| `/student/bookings` | My Bookings | Full booking history with status badges |
| `/student/profile` | Profile | Edit personal info |
| `/student/review` | Review | Leave or edit a session review |

### Tutor Routes (Private)

| Route | Page | Description |
|-------|------|-------------|
| `/tutor/dashboard` | Dashboard | Teaching sessions & stats |
| `/tutor/availability` | Availability | Set weekly time slots |
| `/tutor/profile` | Profile | Edit tutor bio, rate, subjects |

### Admin Routes (Private)

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Dashboard | Platform statistics |
| `/admin/users` | Users | View, ban, unban users |
| `/admin/bookings` | Bookings | All platform bookings |
| `/admin/categories` | Categories | Create and manage categories |

---

## 📊 Booking Flow

```
  Student books a session
          │
          ▼
  ┌───────────────┐
  │   CONFIRMED   │  ◄── Automatically set on booking creation
  └───────────────┘
        │       │
        │       └─── Student cancels ──────────► ┌─────────────┐
        │                                        │  CANCELLED  │
        │                                        └─────────────┘
        │
        └─── Tutor marks complete ──────────────► ┌─────────────┐
                                                  │  COMPLETED  │
                                                  └─────────────┘
                                                        │
                                                        ▼
                                              Student can now leave a review
```

---

## 👥 User Roles

| Role | How to Get It | Key Permissions |
|------|--------------|-----------------|
| **STUDENT** | Self-register (default role) | Book sessions, cancel bookings, leave reviews, edit profile |
| **TUTOR** | Self-register (select Tutor during signup) | Create profile, set availability, complete sessions |
| **ADMIN** | Seeded directly in the database | Manage all users, bookings, and categories |

> 💡 Admin accounts must be seeded manually — there is no admin registration through the UI.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is for educational purposes.