# In the Mind of Bash

A responsive personal blog built with HTML, CSS, and JavaScript. No build step or package installation is required.

## Run locally

From this directory:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open the server in your browser. Serve the files over HTTP; opening HTML directly as a file will not load the story data.

## Make it yours

- Edit `posts.json` to add or update stories. Each story has a unique `slug`, `title`, `category`, display `date`, `description`, and a `body` array of plain-text paragraphs.
- The included stories and biography are explicitly marked samples. Replace them before publishing.
- Update the introduction and About section in `index.html`.
- Categories in `posts.json` should match the filter buttons in `index.html`; add a button when adding a new category.
- Adjust colors, typography, and responsive layouts in `styles.css`.

## Publish

Deploy this directory as a static website using GitHub Pages, Netlify, or Vercel. No build command is needed; use the repository root as the publish directory. No mailing list, analytics, or external services are configured.
