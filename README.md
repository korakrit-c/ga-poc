# GA PoC – Static Category Site (GitHub Pages)

Multi-page static website for a Google Analytics PoC. Categories are driven by a JSON file, so adding/removing categories doesn’t require creating new HTML pages.

## Structure

```
.
├── index.html
├── category/
│   └── index.html
├── action/        # legacy redirect → /category/?c=action
├── rpg/           # legacy redirect → /category/?c=rpg
├── strategy/      # legacy redirect → /category/?c=strategy
├── data/
│   └── categories.json
├── partials/
│   ├── header.html
│   └── footer.html
├── js/
│   ├── include.js  # loads partials into pages
│   └── site.js     # renders nav + pages from JSON
├── css/
│   └── styles.css
└── .nojekyll
```

## Edit content

- Header / footer: `partials/header.html`, `partials/footer.html`
- Categories “database”: `data/categories.json`
  - Add a new entry with a unique `slug`
  - The site automatically updates the home page and navigation

Category URLs use:

- `category/?c=<slug>` (example: `category/?c=action`)

## Run locally

Because this site loads JSON/partials via `fetch()`, open it through an HTTP server (not `file://`).

- VS Code “Live Server” works
- Or run:

```bash
python3 -m http.server
```

Then open `http://localhost:8000/`.

## Deploy (GitHub Pages)

1. Push to GitHub (`main` branch).
2. GitHub repo → **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` / Folder: `/ (root)`

Your site will be at:

`https://<username>.github.io/<repo>/`

## Analytics (later)

GA4 can be added once in a shared script and triggered per category using the category slug (`c` query param).

