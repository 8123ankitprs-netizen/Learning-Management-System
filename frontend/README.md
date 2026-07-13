# SkillCraft Frontend Application

This directory contains the React SPA (Single Page Application) interface built using Vite, Tailwind CSS, Lucide icons, and TanStack React Query.

---

## Directory Structure

```text
frontend/
├── src/
│   ├── components/      # Common cards & shared layouts (Navbar, Footer)
│   ├── config/          # Axios instance configurations
│   ├── context/         # AuthContext and ThemeContext provider hooks
│   ├── features/        # TanStack Query custom hooks for server calls
│   ├── pages/           # Platform screens (Dashboard, Admin, Blog, Mentors, Pricing)
│   ├── App.jsx          # Route registration definitions
│   └── main.jsx         # App bootstrapping entry point
├── tailwind.config.js   # Tailored theme color palettes
└── package.json
```

---

## Interactive UI Pages & Features

- **Auth Screens (`/login` & `/register`):** OTP verification input slots.
- **My Learning Dashboard (`/dashboard`):** Track course enrollments, print completion certificates, and access/review completed lessons.
- **Admin Control Center (`/admin`):** Sidebar navigation supporting Overview statistics, User status switches and Role updates, Course visibility toggles, Live CPU resource telemetry profiling, and database reseed modules. Fully styled for both Light and Dark theme modes with a header toggle switch.
- **Support Pages:** Dedicated sub-pages for *Pricing*, *Careers*, *Mentors*, *About Us*, *Privacy*, and *Terms* linked cleanly from the footer.
- **Gmail Composer Integration:** Mail logo redirecting target queries directly to Gmail Compose (`8123ankitprs@gmail.com`) in a new tab to avoid empty clicks on systems without native email clients configured.
- **Floating AI Chatbot Widget:** A bottom-right floating chat helper pop-up on the Contact page. It features:
  - Custom scrollable chat message log with auto-scroll.
  - Suggestion tags for common issues.
  - Keyword-matched automated replies.
  - Clickable markdown-style internal and external links dynamically matched with live database course endpoints.

---

## Technical Standards

1. **Caching & Queries:** Managed via `@tanstack/react-query` to prevent unnecessary API refetches and keep UI transitions snappy.
2. **Light/Dark Toggle:** Enforces Tailwind CSS `dark:` utilities via a toggle button stored inside `localStorage` for cross-page persistence.
3. **Linter & Verification:** Build checks are verified using ESLint and Oxlint configurations to maintain zero compiler errors.
