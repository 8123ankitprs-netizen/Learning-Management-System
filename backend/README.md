# SkillCraft Backend API Server

This folder contains the production-grade REST API server powering the SkillCraft ecosystem. It manages Mongoose models, session tokens verification, OTP authentication, study progress mutations, and admin telemetry monitoring.

---

## Directory Architecture

```text
backend/
├── src/
│   ├── config/          # Database connections & initial seeder configuration
│   ├── controllers/     # Controller handlers (Auth, Course, Progress, Admin)
│   ├── middlewares/     # Auth checks, rate-limiters, & security policies
│   ├── models/          # Mongoose database schemas (User, Course, Module, Lesson, etc.)
│   ├── routes/          # Express API route endpoints
│   ├── utils/           # Helper scripts (Token generators, seeding utilities)
│   └── server.js        # Server initial setups & dynamic CORS configs
└── package.json
```

---

## API Router Endpoints

### 🔑 Authentication (`/api/v1/auth`)
- `POST /request-otp` -> Generates and sends OTP logs for verification.
- `POST /verify-otp` -> Checks OTP logic, signs JWT token, returns user profile status.
- `POST /logout` -> Clears session authentication.

### 📚 Course Management (`/api/v1/courses`)
- `GET /` -> Retrieve list of all published courses.
- `GET /:id` -> Retrieve detail modules and lesson maps for specific courses.

### 📈 Enrollment & Progress (`/api/v1/enrollments` & `/api/v1/progress`)
- `POST /enroll` -> Enroll user inside target course.
- `POST /cancel-enrollment` -> Terminate user enrollment safely.
- `PUT /progress/toggle` -> Toggle lesson checked progress state and update cert status.

### 🛡️ Admin Telemetry & Control Panel (`/api/v1/admin`)
- `GET /stats` -> Fetches total revenue, active course counts, and system seats.
- `GET /users` -> Audits user registries.
- `PUT /users/:id/toggle-active` -> Toggle active status for students/instructors.
- `PUT /users/:id/role` -> Modify user roles dynamically (Student/Instructor/Admin).
- `PUT /courses/:id/toggle-publish` -> Toggle draft visibility.
- `DELETE /courses/:id` -> Wipe catalog course modules.
- `GET /telemetry` -> Fetches system stats (RAM, CPU cores, process status).

---

## Production Security Measures

To shield the backend in production mode:
1. **Dynamic CORS:** Accepts connections matching `FRONTEND_URL` environment variables only.
2. **Helmet Shield:** Enforces standard headers to block XSS and clickjacking.
3. **JWT Production Check:** Server triggers a fatal crash on startup if `JWT_SECRET` is unset or matches standard development tokens (`devsecret`).
4. **IP Rate Limiter:** Limits connections to 100 requests per 15 minutes to block DDoS scripts.
5. **Admin Gates:** Standard admin panel endpoints reject requests missing admin role payloads.
