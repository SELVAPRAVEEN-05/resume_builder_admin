# ResumeBuilder Admin Panel

A modern, production-ready admin panel for a Student Resume Builder app built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** — bar, line, pie charts
- **Lucide React** — icons
- **clsx** — conditional classnames

## Pages
| Route | Page |
|---|---|
| `/dashboard` | Summary cards + charts + recent activity |
| `/users` | Searchable student table with actions |
| `/resumes` | Resume list with preview/delete |
| `/templates` | Template cards with enable/disable |
| `/analytics` | Charts + KPIs + trends |
| `/feedback` | Student reviews with star ratings |
| `/announcements` | Announcements with CRUD |
| `/settings` | Toggles + inputs + danger zone |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Sidebar + Topbar)
│   ├── page.tsx            # Redirects to /dashboard
│   ├── globals.css         # Tailwind + DM Sans font
│   ├── dashboard/page.tsx
│   ├── users/page.tsx
│   ├── resumes/page.tsx
│   ├── templates/page.tsx
│   ├── analytics/page.tsx
│   ├── feedback/page.tsx
│   ├── announcements/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── Topbar.tsx      # Top header bar
│   └── ui/
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       └── StatCard.tsx
└── lib/
    └── data.ts             # Mock data + TypeScript interfaces
```

## Color Theme
```ts
primary: '#10B981'   // Emerald green
white:   '#FFFFFF'
gray:    '#F3F4F6'
text:    '#111827'
```
