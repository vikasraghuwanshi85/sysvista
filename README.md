# SysVista Private Limited — Website

A fast, responsive, SEO-optimized one-page website for **SysVista Private Limited**, an IT service provider based in Khargone.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The single page (Hero, Services, About, Why Us, Contact) |
| `styles.css` | All styling (responsive, mobile-first) |
| `script.js` | Mobile menu + AJAX contact form |
| `assets/favicon.svg` | Browser tab icon |
| `assets/og-image.svg` | Social-share preview image |
| `robots.txt` | Search-engine crawl rules |
| `sitemap.xml` | Sitemap for search engines |

No build step and no framework — just open `index.html` or upload the folder to any host.

## The contact form (IMPORTANT — one-time setup)

The form sends every submission to **support@sysvista.tech** using [FormSubmit.co](https://formsubmit.co) — a free service that needs **no account and no server-side code**.

**Activate it once:**
1. Deploy the site (or run it on a public URL).
2. Submit the contact form one time.
3. FormSubmit sends a **confirmation email to support@sysvista.tech**. Open it and click the activation link.
4. Done — from then on, every submission is emailed to that inbox.

Notes:
- Submissions won't arrive until that one-time link is clicked.
- The form uses the AJAX endpoint so visitors stay on the page and see a success message.
- A hidden honeypot field blocks basic spam bots.

### Prefer a different form backend?
Swap the `action` URL in `index.html` (and the `fetch()` URL in `script.js`) for any of these:
- **Formspree** — `https://formspree.io/f/XXXX` (free tier, dashboard, spam filtering)
- **Web3Forms** — needs a free access key
- **Your own hosting email** — replace with a small PHP/serverless endpoint

## Before going live — replace these placeholders
- **Domain**: all SEO tags assume `https://sysvista.tech/`. If the domain differs, update the URLs in `index.html`, `robots.txt`, and `sitemap.xml`.
- **Region**: `addressRegion` is set to *Madhya Pradesh* in the structured data — adjust if needed.
- **Stats** (uptime, projects, satisfaction %): edit real numbers in `index.html`.
- **Phone number**: none was provided; add one in the Contact section and footer if you want it shown.
- **OG image**: `og-image.svg` works, but some social platforms prefer PNG. Export a 1200×630 PNG for best previews and update the `og:image` / `twitter:image` tags.

## SEO features included
- Semantic HTML5 landmarks and a single `<h1>`
- Title, meta description, keywords, author, canonical URL
- Open Graph + Twitter Card tags
- JSON-LD structured data (`ProfessionalService` / LocalBusiness)
- `robots.txt` and `sitemap.xml`
- Mobile-responsive, fast-loading (no heavy libraries), accessible (skip link, ARIA, focus states)
- Descriptive alt/aria labels

## Deploy options (pick one)
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder (free, HTTPS included). Netlify even has its own form handling.
- **GitHub Pages** — push the folder to a repo and enable Pages.
- **Traditional hosting / cPanel** — upload the folder contents to `public_html`.

After deploying, submit `sitemap.xml` in [Google Search Console](https://search.google.com/search-console) to speed up indexing.
