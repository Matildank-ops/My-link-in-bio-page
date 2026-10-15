# Digital Tilda

Static HTML, CSS, and JavaScript for Matilda Nkem’s personal website. No package installation or build step is needed.

## Preview

From this directory, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ for the homepage, http://127.0.0.1:8765/partnerships/ for Partnerships, or http://127.0.0.1:8765/guides/ for the existing collection. Use an HTTP server instead of opening the HTML file directly because the site uses root-relative URLs.

The AI Income Playbook reader is available at http://127.0.0.1:8765/book/. Its self-contained source is `book/index.html`, with a link from `/bio/`. The supplied manuscript references a practice workbook and tool directory that were not included; those references are shown as text until companion files are supplied.

## Owner settings

- **Newsletter:** `newsletterUrl` in `assets/site-config.js` is connected to the supplied Substack profile, `https://substack.com/@tildank1`. The button opens the profile so visitors can read and follow there. A direct link also works without JavaScript. This website collects no email addresses and does not simulate subscription success. If the URL changes, update the configuration, homepage fallback, and shared social links.
- **Partnerships email:** `partnershipEmail` in the same configuration file is currently `tildankem@gmail.com`, the address supplied by Matilda. The partnership buttons open a `mailto:` URL with the subject “Partnership inquiry for Digital Tilda.” To change the address, also update the static `mailto:` links and visible fallback address in `index.html`, `partnerships/index.html`, and the three guide collection index files so they remain correct without JavaScript.
- **Biography:** Search `index.html` for `EDIT BIO HERE`. The introduction includes Matilda’s supplied background: exploring AI since 2019 and completing an MBA with a specialization in Artificial Intelligence in 2022.
- **Social links:** The About section and shared footer link to the supplied TikTok, Substack, Instagram (`digital.tilda`), and YouTube (`@DigitalTilda`) profiles.

## Site files

- `index.html`: homepage sections, curated existing guide links, and three original prompts.
- `partnerships/index.html`: collaboration information and direct email links.
- `assets/site.css`: shared palette, responsive navigation, page layouts, and motion styles.
- `assets/content-covers.css`: homepage creator thumbnails, illustrated guide cards, collection cards, and guide opening sections.
- `assets/thumbnails/`: three photorealistic creator thumbnails used only on the homepage. Each uses a different outfit or hairstyle and has 480, 960, and 1440 pixel WebP variants. Headlines remain editable in `index.html`. See the thumbnail README for prompts and provenance.
- `assets/covers/`: ten generated topic illustrations in responsive WebP sizes. See its README for final prompts and its manifest for guide assignments.
- `assets/site.js`: mobile disclosure menu, keyboard prompt tabs, clipboard handling, newsletter configuration, scroll reveals, and motion pause control.
- `assets/brand/`: transparent image logo and matching monogram favicon. The header and footer share this logo.
- `assets/BRANDING.md`: final image generation prompts, provenance, and asset paths.
- `assets/photos/`: optimized versions of the two supplied photos, plus an AI-generated smart casual portrait with a gray MacBook Pro for the About section. The generated portrait has responsive 480, 800, and 1120 pixel WebP variants and a JPEG fallback. The supplied photos use WebP widths of 480, 800, and 1200 pixels are selected responsively, with JPEG fallbacks. Metadata is not copied. Originals remain untouched in Downloads.
- `guides/`: existing guide collection. Guide content, legacy redirects, guide URLs, and collection functionality are preserved. Em dashes have been replaced with appropriate punctuation throughout the site, including guide source lists. The collection landing pages share the new header and footer.

## Accessibility and behavior

The navigation works as ordinary links without JavaScript. On small screens JavaScript adds a disclosure menu with Escape handling and focus restoration. Prompt tabs support arrow keys, Home, and End. Copy reports success only after a successful clipboard operation and falls back to selecting text for manual copying. Content is readable without scroll animation; reduced-motion preferences disable CSS motion and prevent reveal animations. The moving strip also has a pause control.

GitHub Pages publishes `main` at https://www.gotilda.com/. Follow `AGENTS.md` for connector publication and deployment verification.
