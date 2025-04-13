# FocusHub Backend

Welcome to the backend for **FocusHub**, a gamified time-tracking application. This monolith architecture powers features like time tracking, activity overviews, badge awards, timelines, project management, leaderboards, and user profiles. Built for scalability and performance, it integrates with a **React + Vite** frontend.

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

- **Time Tracking**: Log time spent on projects with start/end timestamps.
- **Activity Overview**: Summarize time spent and recent activities.
- **Badging System**: Award badges for milestones (e.g., 10 hours on a project).
- **Timeline**: Chronological log of user actions (e.g., project creation).
- **Project Management**: Create projects with public/private visibility.
- **Leaderboard**: Rank users by time spent or badges earned.
- **User Profiles**: Display user details, badges, and contributions.

---

## Tech Stack

- **Framework**: NestJS (Fastify adapter) - TypeScript-first, high-performance APIs.
- **Database**: PostgreSQL + Prisma - Relational data with type-safe ORM.
- **Cache/Queue**: Redis + BullMQ - Caching and async task processing.
- **Authentication**: Custom JWT (NestJS + Passport) - Free, secure auth.
- **Storage**: Cloudinary - Profile pictures and badge images.
- **Deployment**: Vercel - Serverless, auto-scaling platform.
- **Monitoring**: Sentry - Error and performance tracking.

---

## Architecture Overview

The backend is a **monolith** for simplicity, with modular design for scalability. Below are the high-level (HLD) and low-level (LLD) designs.

### High-Level Design (HLD)

#### System Overview
FocusHub enables users to track time, earn badges, manage projects, and compete on leaderboards. The backend is a single NestJS app exposing REST APIs, with async processing for badge awards and leaderboards.

#### Architecture Style
- **Monolith**: Unified codebase for all features.
- **API-Driven**: RESTful APIs for frontend.
- **Event-Driven**: BullMQ for async tasks.
- **Cloud-Native**: Vercel for scalability.

#### Components
- **NestJS Monolith**: Handles users, projects, time tracking, badges, timelines, leaderboards.
- **Authentication**: Custom JWT for login/signup and roles.
- **Database**: PostgreSQL (via Prisma) for structured data.
- **Cache/Queue**: Redis (caching), BullMQ (async tasks).
- **Storage**: Cloudinary for images.
- **Frontend**: React + Vite consumes APIs.
- **Monitoring**: Sentry for errors/performance.

#### Data Flow
1. User logs in (`/auth/login`) → JWT issued.
2. User creates project (`/projects`) → Saved to PostgreSQL.
3. User tracks time (`/time-entries`) → Saved, BullMQ job queued.
4. Badge awarded → Logged to timeline, notification sent.
5. Leaderboard updated in Redis → Fetched via `/leaderboard`.

#### Scalability
- **Horizontal Scaling**: Multiple NestJS instances on Vercel.
- **Caching**: Redis for low-latency reads.
- **Database**: PostgreSQL read replicas.
- **Queue**: BullMQ scales with Redis.

#### HLD Diagram


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

