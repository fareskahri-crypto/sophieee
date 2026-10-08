# Slay Clay — GitHub Pages Website

## 1. Replace these placeholders

Search the project for:
- `YOUR-USERNAME` — GitHub Pages username/repository URL.
- `YOUR_WHATSAPP_NUMBER` — digits only, with international country code.
- `YOUR_INSTAGRAM` — Instagram handle.

## 2. Assets

Put supplied brand assets here:
- `assets/images/logo.svg` — replace the included placeholder with the exact Slay Clay logo.
- `assets/images/og-cover.webp` — social/SEO preview, ideally 1200×630.
- `assets/images/hero-poster.webp` — poster for the hero animation.
- `assets/video/hero-object.webm` — preferred hero animation, compressed and short.
- `assets/video/hero-object.mp4` — optional fallback.
- `assets/images/creation-01.webp` through `creation-05.webp` — gallery photos, WebP, responsive-friendly, ideally under 250 KB each.

## 3. Deploy

Upload the project root to a GitHub repository. In GitHub:
Settings → Pages → Deploy from branch → select `main` and `/ (root)`.

## 4. Important WhatsApp limitation

A pure GitHub Pages site cannot silently upload a local image into WhatsApp. The site previews the selected image locally, then opens WhatsApp with a structured request and asks the visitor to attach the same image in WhatsApp.

## 5. Performance

No framework, no external font, no icon library, no animation library. Hero video is local and metadata-preloaded; gallery images are lazy-loaded; CSS contains the paper grain as a tiny inline SVG; interactions are one deferred JS file.

## 6. Brand asset replacement

The supplied logo/reference card should replace the placeholders without changing its proportions. Keep the reference-card palette in CSS variables if you want exact color matching.
