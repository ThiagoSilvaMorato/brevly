# Brevly

## Overview

**Brevly** is a full-stack URL shortening platform designed to simplify how long links are shared and tracked.

Long URLs can be difficult to share, remember, and manage — especially when used in messages, social media, or documentation. Brevly solves this problem by allowing users to generate **custom shortened URLs** that redirect to the original destination.

Users can provide a full URL and choose a custom short identifier. The application then generates a shortened link that can be easily shared.

Beyond simple shortening, Brevly also provides **usage analytics**, allowing users to track how many times a shortened URL has been accessed. This helps measure link engagement and understand how often links are being used.

Additionally, the platform allows users to **export their shortened links as a CSV file**, making it easier to analyze, store, or integrate link data into other tools such as spreadsheets or reporting systems.

This project was built to demonstrate a **modern backend architecture with high-performance APIs**, combined with a clean and responsive frontend.

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* Axios
* React Router
* React Hot Toast
* Lucide Icons

## Backend

* Node.js
* TypeScript
* Fastify
* PostgreSQL
* Drizzle ORM
* Zod
* AWS S3 SDK
* CSV Stringify
* UUIDv7

---

# Features

* Generate **custom shortened URLs**
* Redirect shortened URLs to the original destination
* Track **number of accesses per link**
* Export shortened URLs as a **CSV file**
* Fast and lightweight API built with **Fastify**
* Data validation with **Zod**
* Persistent storage with **PostgreSQL**
* Clean and responsive interface

---

# Prerequisites

To run this project locally, you must install the following tools.

## 1. Install Git

Git is used to clone the repository.

Download:
[https://git-scm.com/downloads](https://git-scm.com/downloads)

After installation, verify:

```bash
git --version
```

---

## 2. Install Node.js

Download Node.js (LTS version recommended):

[https://nodejs.org/](https://nodejs.org/)

Recommended version:

```
Node.js >= 18
```

After installation, verify:

```bash
node -v
npm -v
```

---

## 3. Install PostgreSQL

This project uses **PostgreSQL** as the database.

Download:

[https://www.postgresql.org/download/](https://www.postgresql.org/download/)

Recommended version:

```
PostgreSQL >= 14
```

During installation remember the following:

* Username
* Password
* Port (default: `5432`)

You will need these to configure the backend.

---

# Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/brevly.git
```

Then navigate to the project folder:

```bash
cd brevly
```

---

# Backend Setup

Navigate to the backend folder:

```bash
cd server
```

---

## Install Dependencies

```bash
npm install
```

---

## Configure Environment Variables

Create a `.env` file inside the **server** folder.

Example:

```env
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_PUBLIC_URL=http://your_public_url
CLOUDFLARE_BUCKET=your_cloudflare_bucket_name
CLOUDFLARE_SECRET_ACCESS_KEY=your_cloudflare_secret_access_key
CLOUDFLARE_ACCESS_KEY_ID=your_cloudflare_access_key_id
DATABASE_URL=postgresql://your_database_url
```

Explanation:

* **DATABASE_URL** → connection string for PostgreSQL
* **CLOUDFLARE_ACCOUNT_ID** → Cloudflare account identifier used for storage integration
* **CLOUDFLARE_PUBLIC_URL** → public URL where stored files can be accessed
* **CLOUDFLARE_BUCKET** → storage bucket name used by the application
* **CLOUDFLARE_SECRET_ACCESS_KEY** → secret key used to authenticate requests to the storage service
* **CLOUDFLARE_ACCESS_KEY_ID** → access key used for storage authentication

---

## Run Database Migrations

Generate and apply database migrations:

```bash
npm run db:generate
npm run db:migrate
```

---

## Start the Backend

```bash
npm run dev
```

The backend server will start and the API will be available locally.

---

# Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd brevly/web
```

---

## Install Dependencies

```bash
npm install
```

---

## Start the Frontend

```bash
npm run dev
```

After running the command, Vite will display a local development URL such as:

```
http://localhost:5173
```

Open this address in your browser.

---

# Available Scripts

## Frontend

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint project:

```bash
npm run lint
```

---

## Backend

Start development server:

```bash
npm run dev
```

Generate database migrations:

```bash
npm run db:generate
```

Run database migrations:

```bash
npm run db:migrate
```

Open database studio:

```bash
npm run db:studio
```

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

---

# Author

Developed by **Thiago Morato**

Frontend Engineer specialized in **React and TypeScript**, focused on building scalable and maintainable applications.
