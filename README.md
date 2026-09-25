# Personal Portfolio

A modern, responsive portfolio built with React, Vite, and plain CSS.

## Start the website locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal (usually `http://localhost:5173`).

## Update your information

Most personal text lives in `src/content.js`. Edit that file to update your name, introduction, skills, projects, education, email, and location.

The page layout is in `src/App.jsx`, and the colors and visual design are in `src/styles.css`.

## Add your images

Put website images in `public/images/`, for example `public/images/profile.jpg` or `public/images/project-one.png`.

Use them in React with a path starting with `/images/`:

```jsx
<img src="/images/profile.jpg" alt="Your name" />
```

Use clear lowercase filenames with hyphens, such as `profile-photo.jpg` and `warehouse-dashboard.png`.

## Check the project before publishing

```bash
npm run lint
npm run build
```

`npm run lint` checks the code for common mistakes. `npm run build` creates the optimized production site in the `dist` folder.
