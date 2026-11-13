# Personal Portfolio Website

A personal portfolio website built to showcase my profile, education, work experience, technical skills, projects, and certificates.

The website includes a public portfolio and an admin dashboard that allows me to manage portfolio content dynamically through Supabase.

## Live Demo

🌐 **[Visit My Portfolio Website](https://marvelous-syrniki-dcf482.netlify.app/)**

## Features

- Responsive personal portfolio website.
- Admin dashboard for managing portfolio content.
- Manage profile, education, experience, skills, projects, and certificates.
- Admin authentication.
- Image and file uploads using Supabase Storage.
- Dynamic data management with Supabase.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript (ES Modules)
- **Backend & Database:** Supabase
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Architecture:** Feature-Based Architecture with Clean Architecture principles

## Project Structure

```text
portfolio-website/
│
├── index.html
├── admin.html
│
└── src/
    ├── admin/
    │   ├── app/
    │   ├── shared/
    │   └── styles/
    │
    ├── app/
    │   ├── di/
    │   ├── portfolio.controller.js
    │   └── portfolio.view.js
    │
    ├── config/
    │   └── supabase/
    │
    ├── core/
    │   ├── constants/
    │   ├── errors/
    │   └── utils/
    │
    ├── features/
    │   ├── auth/
    │   ├── certificates/
    │   ├── education/
    │   ├── experience/
    │   ├── overview/
    │   ├── profile/
    │   ├── projects/
    │   └── skills/
    │
    ├── shared/
    │   ├── data/
    │   ├── domain/
    │   └── presentation/
    │
    ├── styles/
    │   └── global.css
    │
    └── main.js
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Mh06a/portfolio-website.git
```

2. Open the project folder.

3. Configure your Supabase project in:

```text
src/config/app.config.js
```

4. Run the website using VS Code Live Server or any local static server.

## Author

**Mansour Hussain AlYami**

- GitHub: [@Mh06a](https://github.com/Mh06a)
- LinkedIn: [Mansour Hussain](https://www.linkedin.com/in/mansourhussain/)

---

If you find this project useful or interesting, please consider giving it a ⭐ on GitHub. Your support is appreciated!
