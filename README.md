# 🚀 SkillCraft: Production-Grade Learning Management System

SkillCraft is a high-performance, responsive, and secure course learning management platform built on the MERN stack (MongoDB, Express, React, Node.js). Engineered with clean architecture principles, it incorporates dynamic learning progress tracking, automated certification issuance, custom note-taking notebooks, a functional administration console, and an integrated floating AI assistant chatbot.

---

## 📂 Project Architecture & Directory Map

The workspace is split into two fully decoupled services:

```text
Learning Management System/
├── backend/                        # Node.js & Express REST API Server
│   ├── src/
│   │   ├── config/                 # MongoDB connection & default Admin seeder
│   │   ├── controllers/            # Controller layers (Auth, Course, Admin, Progress)
│   │   ├── middlewares/            # Helmet guards, CORS logic, Rate-Limiters
│   │   ├── models/                 # Database schemas (User, Course, Module, Lesson, Enrollment)
│   │   ├── routes/                 # Express REST endpoint maps
│   │   └── utils/                  # Cryptographic tokens generator
│   └── package.json
│
├── frontend/                       # React Single Page Application (Vite + Tailwind)
│   ├── src/
│   │   ├── components/             # Reusable elements & common layouts (Navbar, Footer)
│   │   ├── config/                 # Axios connection instance with base URLs
│   │   ├── context/                # Global contexts (AuthContext, ThemeContext)
│   │   ├── features/               # Custom hooks for TanStack Query caching
│   │   ├── pages/                  # Application screens (Dashboard, Course details, Admin, FAQs)
│   │   ├── App.jsx                 # Central router pages configuration
│   │   └── main.jsx                # Application bootstrap entry point
│   └── package.json
│
└── README.md                       # Main workspace documentation
```

---

## 🛠️ Technology Stack Matrix

| Layer | Stack | Purpose & Integration |
|:---|:---|:---|
| **Frontend** | React 18, Vite 8, Tailwind CSS | High-performance SPA, hot module reloading, customizable utility styles. |
| **State Manager** | TanStack React Query v5 | Server-state caching, automatic validation, query keys invalidation. |
| **Icons Library** | Lucide React | High-quality responsive vector icon packs. |
| **Backend API** | Node.js, Express | Non-blocking asynchronous REST API routing pipeline. |
| **Database** | MongoDB, Mongoose ORM | Document-oriented schemas with automatic relational populations. |
| **Security Gates** | JWT, Bcrypt, Helmet, Express-Rate-Limit | Sessions authentication, password hashing, header protection, DDoS blocks. |

---

## 💎 Key Platform Features

### 1. 🔑 Secure OTP Auth Lifecycle
- Passwordless OTP generation printed directly in the backend terminal console during local development for streamlined testing.
- Passwords are securely hashed using `bcrypt` salt factors prior to database persistence.

### 2. 📈 Telemetry Curriculum Checked Sync
- Course players update checked progress check-boxes instantly in the client UI.
- Progress mutations dynamically trigger TanStack Query cache refetches to refresh course curriculum states without full page reloads.

### 3. 🌓 Global Light & Dark Theme Transitions
- System-wide transition support persistent in `localStorage`.
- Admin console dashboard features a dedicated sun/moon header toggle that updates theme attributes dynamically.

### 4. 🤖 Floating AI Support Bot (Widget)
- Bottom-right anchored floating support launcher with interactive pop-ups.
- Matches keywords (such as `otp`, `progress`, `certificate`, `admin`, `notes`) to return automated troubleshooting answers.
- Integrates live course catalog lists and dynamic router enrollment links parsed directly into clickable markdown-style anchors.

### 5. 🛠️ Dedicated Admin Console Panel
- **Overview:** Real-time revenue trackers, user registry states, active seats count.
- **User Audits:** Manage account roles (Student/Instructor/Admin) and toggle active/blocked permissions.
- **Course Catalog:** Decommission courses or toggle publication status (Published/Draft).
- **System Telemetry:** Live RAM allocation profiling, CPU cores, database connection states.
- **Global Settings:** Export entire system user registries directly to Excel `.csv` sheets.

---

## ⚡ Local Development Quickstart

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (running on `localhost:27017` by default)

### 1. Backend Server Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a `.env` file in the root of the backend folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/skillhub
   JWT_SECRET=super_secure_dev_secret_key_123!
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```
3. Install dependencies and start the backend development server (automatically runs MongoDB seeders if collections are empty):
   ```bash
   npm install
   npm run dev
   ```

### 2. Frontend Application Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies and start the Vite development server:
   ```bash
   npm install
   npm run dev
   ```
3. Access the local web platform at [http://localhost:5173/](http://localhost:5173/).

---

## 🔐 Administrative Access
For testing administrative panels and dashboard overrides, log in using:
- **Admin Email:** `admin@skillcraft.com`
- **Admin Password:** `admin123`

---

## 🛡️ Git Ignore Guidelines
All local environment variables (`.env`), package dependencies (`node_modules/`), test outputs (`lint_output.txt`), and production build directories (`dist/`, `build/`) are strictly filtered out of Git tracking using the workspace `.gitignore` files.
