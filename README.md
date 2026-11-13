# Portfolio Website

Vanilla JavaScript (ES modules) + Supabase. No build step.

## Design

Editorial dark theme (`#090B10`), electric-lime accent (`#B6F36B`), Space Grotesk / Inter / DM Mono.
Design tokens live in `src/styles/global.css` and are shared by the public site and the admin dashboard.
The redesign only touches the presentation layer (views, presenters' view-model shape, CSS); use cases,
repositories, validators and Supabase access are unchanged.

## Run

ES modules are blocked on `file://`, so **do not double-click index.html**. Use a local server:

```bash
python3 -m http.server 5173     # → http://localhost:5173
# or: VS Code "Live Server" extension (no install, no build)
```

No Node.js, npm or bundler is used or required — only static files served as-is.

## Database

Run your original schema once, then `database/migrations/001_*.sql` (skill groups, optional project image,
certificate preview image). Without the migration, saving a skill in a new group or a project without an image fails.

## Admin panel

Open `http://localhost:5173/admin.html` (it is `noindex`; link to it from nowhere public).
Sign in with a Supabase Auth user whose id exists in the `admins` table.

Screens: Overview · Profile · Education · Experience · Skills (drag to reorder) · Projects (feature / reorder) · Certificates (URL or PDF).
Everything goes through the same use cases as the public site; 

Required Supabase setup: Row Level Security with admin-only writes, and Storage policies for the
`portfolio-assets` bucket that allow admins to upload and the public to read.
`education_subjects` columns are configured in `src/core/constants/database.constants.js`.

## Architecture (dependency direction →)

```
presentation (views: HTML only)  ←  presenters (data → view model, no DOM)
        ↑                                   ↑
   app/portfolio.view.js          app/portfolio.controller.js
                                            ↓
                                  domain (models, validators, use cases, repository contracts)
                                            ↓
                                  data (repositories → datasources: Supabase)
```

| Layer | Allowed | Forbidden |
|---|---|---|
| `presentation/sections/*.js` | build HTML from a view model | fetching, Supabase, formatting, business rules |
| `presentation/*.presenter.js` | format dates, group, number, sanitize URLs | DOM, HTML, Supabase |
| `domain/` | models, validation, use cases | Supabase, DOM, HTML |
| `data/` | Supabase access, mapping rows → models | HTML, DOM, UI rules |
| `app/di/container.js` | the only place that wires concrete classes | — |

## Data source

**Every piece of content comes from Supabase** (rows and Storage files). Nothing is bundled in the code.
If a table is empty, its section shows a short "not added yet" note instead of placeholder content.
Images fall back to a neutral default picture when missing (profile avatar / project image).

Start by opening `admin.html`, signing in, and filling Profile → Education → Experience → Skills → Projects → Certificates.

## Security notes
- Only the **publishable** key belongs in the browser. Protect data with Row Level Security
  (public `select`, admin-only `insert/update/delete`). Never put a `service_role` key in this repo.
- Every view escapes its data (`shared/presentation/utils/html.util.js`) and links are filtered
  through `toSafeUrl` (blocks `javascript:`).
