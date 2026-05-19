# 🔍 GitHub User Dashboard

A responsive React application to search and explore GitHub user profiles, stats, and top repositories using the GitHub REST API.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)

---

## ✨ Features

- **User Search** — Search any GitHub username via button click or Enter key
- **Profile Display** — Avatar, name, bio, location, followers, following, public repos
- **Top 5 Repositories** — Sorted by stars with name, description, stars, language, and link
- **Loading Indicator** — Animated spinner while fetching data
- **Error Handling** — User-friendly messages for 404, rate limit, and network errors
- **Dark Mode Toggle** — With OS auto-detection and localStorage persistence
- **Responsive Design** — Mobile-first layout (1 col → 2 col → 3 col grid)

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Framework  | React 18 (Functional Components + Hooks) |
| Build Tool | Vite 5                  |
| Styling    | Tailwind CSS 3.4        |
| HTTP       | Axios                   |
| Icons      | Inline SVGs             |
| API        | GitHub REST API v3      |

---

## 📂 Project Structure

```
github-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx              ← React entry point
    ├── index.css             ← Tailwind directives + custom styles
    ├── App.jsx               ← Main component (state + logic + layout)
    ├── components/
    │   ├── SearchBar.jsx     ← Search input + button
    │   ├── UserCard.jsx      ← User profile display
    │   └── RepoCard.jsx      ← Individual repository card
    └── services/
        └── githubApi.js      ← GitHub API calls (fetchUser, fetchRepos)
```

---

## 🚀 Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) v16+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/github-dashboard.git
cd github-dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📖 Usage Guide

1. Type a GitHub username in the search bar
2. Press **Enter** or click the **Search** button
3. View the user's profile — avatar, name, bio, location, stats
4. Browse their **Top 5 repositories** sorted by star count
5. Click any repo card or "Visit GitHub" to open on GitHub
6. Toggle **dark mode** using the sun/moon icon in the header

---

## 🔎 Sample Usernames to Try

| Username | Who | What you'll see |
|----------|-----|-----------------|
| `torvalds` | Linus Torvalds (Linux creator) | 200k+ followers, C repos |
| `gaearon` | Dan Abramov (React core team) | Bio, location, popular JS repos |
| `sindresorhus` | Sindre Sorhus (open source legend) | 1000+ repos, massive stars |
| `yyx990803` | Evan You (Vue.js creator) | Vue, Vite repos with huge stars |
| `mojombo` | Tom Preston-Werner (GitHub co-founder) | First ever GitHub user (#1) |
| `facebook` | Meta (organization) | React, Jest, and more |
| `google` | Google | Repos in many languages |
| `bradtraversy` | Brad Traversy (web dev educator) | Tutorial project repos |
| `getify` | Kyle Simpson (JS author) | "You Don't Know JS" series |
| `ThePrimeagen` | ThePrimeagen (content creator) | Dev tools and Rust repos |

> **Tip:** Try searching `xyznotauser123` to test the 404 error handling!

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 📋 Requirements Checklist

- [x] Search input with button click and Enter key support
- [x] Fetch & display user profile (avatar, name, username, bio, location, followers, following, repos, profile link)
- [x] Top 5 repositories sorted by stars (name, description, stars, language, link)
- [x] Loading indicator while fetching
- [x] Error handling (404, 403 rate limit, network failure)
- [x] Mobile-first responsive design (mobile → tablet → desktop)
- [x] Card/grid layout for repositories
- [x] React functional components with hooks (useState, useEffect)
- [x] Axios for API requests
- [x] Tailwind CSS for styling
- [x] Clean folder structure (components, services)
- [x] **Bonus:** Dark mode toggle with localStorage persistence

---

## 📜 License

MIT
