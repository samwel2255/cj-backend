# Full-Stack Portfolio & Admin System - Backend Setup

## Overview
This is a production-ready Node.js + Express backend API for a professional portfolio system with admin capabilities.

## Project Structure

```
backend/
├── server.js                 # Main application entry point
├── package.json             # Dependencies and scripts
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore file
│
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.js             # Database seeding script
│
├── lib/
│   └── prisma.js           # Prisma client setup
│
├── middleware/
│   ├── auth.middleware.js    # JWT authentication
│   ├── error.middleware.js   # Error handling
│   └── validate.middleware.js # Input validation
│
├── controllers/
│   ├── auth.controller.js
│   ├── profile.controller.js
│   ├── projects.controller.js
│   ├── skills.controller.js
│   ├── education.controller.js
│   └── contact.controller.js
│
├── routes/
│   ├── auth.routes.js
│   ├── profile.routes.js
│   ├── projects.routes.js
│   ├── skills.routes.js
│   ├── education.routes.js
│   ├── contact.routes.js
│   └── admin.routes.js
│
└── services/
    ├── auth.service.js
    ├── projects.service.js
    └── admin.service.js
```

## Installation

```bash
cd backend
npm install
```

## Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Update the following:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `FRONTEND_URL` - Frontend application URL
- `ADMIN_EMAIL` & `ADMIN_PASSWORD` - Admin credentials

## Database Setup

```bash
# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

## Running the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:5000` by default.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login

### Public Endpoints
- `GET /api/profile` - Get profile information
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills
- `GET /api/education` - Get education details
- `POST /api/contact` - Submit contact form

### Protected Admin Endpoints
- `PUT /api/profile` - Update profile
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/skills` - Add skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- `GET /api/contact` - Get contact messages
- `GET /api/admin/dashboard` - Admin dashboard stats

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS
- **Logging**: Morgan

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation on all endpoints
- CORS configuration
- Helmet security headers
- Environment variable management
- Protected admin routes
