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

## Add GA4

1. In GA4, copy your Google tag snippet (gtag.js).
2. Paste it into:
   - `index.html`
   - `category/index.html`
3. Events sent automatically (when GA is installed):
   - `category_view` on category pages
   - `category_click` when users click a category link
4. Recommended custom dimensions (Event scope):
   - `category_slug`
   - `category_name`
   - `source`

Event parameters:

- `category_view`: `category_slug`, `category_name`
- `category_click`: `category_slug`, `category_name`, `source` (`nav` or `home_card`)
   - `category_slug`
   - `category_name`

Implementation file:

- `js/site.js`
