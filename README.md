# FocusHub-Backend

Welcome to the backend for **TimeTrackr**, a gamified time-tracking application inspired by indiaction.club. This monolith powers features like time tracking, activity overviews, badge awards, timelines, project management (public/private), leaderboards, and user profiles. Built for rapid development, it integrates seamlessly with a **React + Vite** frontend, using **Express** for simplicity and familiarity.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
  - [High-Level Design (HLD)](#high-level-design-hld)
  - [Low-Level Design (LLD)](#low-level-design-lld)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Time Tracking**: Log project time with start/end timestamps
- **Activity Overview**: Summarize time spent and recent activities
- **Badging System**: Award badges for milestones (e.g., 10 hours on a project)
- **Timeline**: Show chronological user actions (e.g., project creation, badge earned)
- **Project Management**: Create projects with public/private visibility
- **Leaderboard**: Rank users by time spent or badges earned
- **User Profiles**: Display user details, badges, and contributions

---

## Tech Stack

- **Framework**: Express - Simple, fast Node.js framework for APIs
- **Database**: PostgreSQL + Prisma - Relational database with type-safe ORM
- **Cache/Queue**: Redis + BullMQ - Caching leaderboards, async badge awards
- **Authentication**: Custom JWT - Free, secure signup/login
- **Storage**: Cloudinary - Profile pictures and badge images
- **Deployment**: Vercel - Serverless auto-scaling
- **Monitoring**: Sentry - Error and performance tracking

---

## Architecture Overview

The backend is a **monolith** designed for simplicity, rapid iteration, and scalability, ideal for quick launches.

### High-Level Design (HLD)

#### System Overview

TimeTrackr lets users track time, earn badges, manage projects, and compete on leaderboards. The backend is a single **Express** app exposing REST APIs to the React + Vite frontend, with async processing for badge awards and leaderboard updates.

#### Architecture Style

- **Monolith**: All features in one codebase for fast development
- **API-Driven**: RESTful APIs serve frontend data
- **Event-Driven**: BullMQ handles async tasks (e.g., notifications)
- **Cloud-Native**: Deployed on Vercel for scalability

#### Components

- **Express Server**: Manages user auth, projects, time tracking, badges, timelines, and leaderboards
- **Authentication**: Custom JWT for secure access and role-based permissions
- **Database**: PostgreSQL (via Prisma) stores users, projects, and time entries
- **Cache/Queue**: Redis caches data; BullMQ processes async tasks
- **Storage**: Cloudinary handles media uploads
- **Frontend Integration**: APIs consumed by React + Vite; WebSockets optional
- **Monitoring**: Sentry tracks errors and performance

#### Data Flow

1. User logs in (`/auth/login`) → JWT issued
2. User creates project (`/projects`) → Stored in PostgreSQL
3. User tracks time (`/time-entries`) → Saved, triggers BullMQ job
4. Badge awarded → Logged to timeline
5. Leaderboard updated in Redis → Fetched via `/leaderboard`
6. Notifications queued (e.g., "You earned a badge!")

#### Scalability

- **Horizontal Scaling**: Multiple Express instances on Vercel
- **Caching**: Redis reduces database load
- **Database**: PostgreSQL read replicas for high reads
- **Queue**: BullMQ scales async tasks

#### HLD Diagram

![diagram-export-4-13-2025-4_58_28-PM](https://github.com/user-attachments/assets/c712a77d-b0de-4b43-aa1a-4626c1f43e8c)

### Low-Level Design (LLD)

#### Database Schema (PostgreSQL)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  username  String   @unique
  role      String   @default("user")
  createdAt DateTime @default(now())
}

model Project {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  ownerId     Int
  visibility  String   @default("private")
  createdAt   DateTime @default(now())
  owner       User     @relation(fields: [ownerId], references: [id])
}

model ProjectMember {
  projectId Int
  userId    Int
  role      String   @default("contributor")
  project   Project  @relation(fields: [projectId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  @@id([projectId, userId])
}

model TimeEntry {
  id        Int      @id @default(autoincrement())
  userId    Int
  projectId Int
  startTime DateTime
  endTime   DateTime?
  duration  Int?
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  project   Project  @relation(fields: [projectId], references: [id])
  @@index([userId, projectId])
}

model Badge {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  criteria    Json
  imageUrl    String?
}

model UserBadge {
  userId    Int
  badgeId   Int
  awardedAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  badge     Badge    @relation(fields: [badgeId], references: [id])
  @@id([userId, badgeId])
}
```

#### Cache (Redis)

- **Leaderboard**: Sorted set (leaderboard:global) with user IDs and scores
- **Profiles**: Key-value (user:123:profile)
- **Projects**: Key-value (project:456:details)

#### API Endpoints

- **Auth**:
  - `POST /auth/signup`: `{ email, password, username }` → `{ access_token }`
  - `POST /auth/login`: `{ email, password }` → `{ access_token }`
- **Users**:
  - `GET /users/:id/profile`: `{ username, email, badges }`
- **Projects**:
  - `POST /projects`: `{ name, description, visibility }` → `{ project_id }`
  - `GET /projects/:id`: `{ name, description, visibility, members }`
  - `PUT /projects/:id/visibility`: `{ visibility }` → `{ success: true }`
- **Time Tracking**:
  - `POST /time-entries`: `{ project_id, start_time }` → `{ entry_id }`
  - `PUT /time-entries/:id/end`: `{ end_time }` → `{ duration_seconds }`
  - `GET /users/:id/activity`: `{ projects: [{ project_id, total_time_spent }], recent_entries }`
- **Badges**:
  - `GET /badges`: `[{ badge_id, name, description, criteria }]`
  - `GET /users/:id/badges`: `[{ badge_id, name, awarded_at }]`
- **Timeline**:
  - `GET /users/:id/timeline`: `[{ event_type, event_data, timestamp }]`
- **Leaderboard**:
  - `GET /leaderboard`: `[{ user_id, username, score, rank }]`

#### Service Logic

- **Time Tracking**:
  - Start: Validate user/project, save TimeEntry, return entry_id
  - End: Update end_time, calculate duration, queue time_entry_completed
  - Activity: Aggregate TimeEntry by user/project, cache in Redis
- **Badges**:
  - Process time_entry_completed, award badges if criteria met, queue notification
  - Cache badge list in Redis
- **Leaderboard**:
  - Update Redis sorted set on time/badge events
  - Fetch top users, enrich with user data
- **Timeline**:
  - Log events (project_created, badge_earned) in PostgreSQL
  - Fetch sorted by timestamp

#### Async Processing

- **BullMQ Queues**:
  - time_entry_completed: `{ user_id, project_id, duration }`
  - badge_awarded: `{ user_id, badge_id }`
  - project_created: `{ project_id, user_id }`
- **Workers**:
  - Badge: Processes time entries
  - Leaderboard: Updates scores
  - Notification: Sends alerts

#### Security

- **Authentication**: JWT via jsonwebtoken middleware
- **Authorization**: Role-based access (e.g., project owners only)
- **Privacy**: Bcrypt for passwords, private project checks
- **Rate Limiting**: express-rate-limit to prevent abuse

#### Performance

- **Indexes**: PostgreSQL (user_id, project_id, created_at)
- **Caching**: Redis with 60s TTL for leaderboards, profiles
- **Pagination**: Cursor-based for timelines, leaderboards
- **Compression**: compression middleware for smaller responses

---

## Getting Started

### Prerequisites

- Node.js: v18+
- PostgreSQL: v15+
- Redis: v6+
- Cloudinary: Account
- Vercel: Account
- Sentry: Account
- Git

### Installation

```bash
git clone https://github.com/your-org/timetrackr-backend.git
cd timetrackr-backend
npm install
```

Set up PostgreSQL:

```bash
createdb timetrackr
npx prisma migrate dev
```

Configure Redis (e.g., Upstash), Cloudinary, and Sentry.

### Environment Variables

Create `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/timetrackr?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-32-char-secret-here"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
SENTRY_DSN="your-sentry-dsn"
FRONTEND_URL="http://localhost:5173"
```

### Running the App

```bash
npm run start:dev
```

Access APIs at: http://localhost:3000

Run tests:

```bash
npm run test
```

---

## API Endpoints

API docs generated via express-openapi (optional) at `/api-docs`.

---

## Deployment

Deploy on Vercel:

```bash
vercel
vercel --prod
```

Production Setup:

- PostgreSQL: Supabase or similar
- Redis: Upstash
- HTTPS and CORS enabled via Express middleware

---

## Monitoring

- Sentry: Tracks errors (e.g., failed /time-entries calls)
- Vercel Analytics: Monitors API latency and usage
- Prisma Pulse: Optional for database insights

---

## Contributing

1. Fork the repo
2. Create branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open PR

Guidelines:

- Write tests for routes
- Use TypeScript for type safety
- Document new endpoints

---

## License
