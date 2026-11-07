# KHALIIDCORE – Official Website

Personal brand and creative portfolio for **Khalid Nadaf** (KHALIIDCORE) – https://www.khaliidcore.com

Stack: Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · Lucide React · Lenis (smooth scroll)

---

## 1. Installation

Requires **Node.js 18.18+** (Node 20 or 22 LTS recommended).

```bash
cd khaliidcore-site
npm install
cp .env.example .env.local      # Windows: copy .env.example .env.local
```

## 2. Development

```bash
npm run dev          # http://localhost:3000
npm run typecheck    # TypeScript check
npm run lint         # ESLint (first run asks to create a config: choose "Strict")
```

## 3. Production build

```bash
npm run build
npm run start        # serves the production build on http://localhost:3000
```

## 4. Make it yours (the files you will edit)

| What | File |
| --- | --- |
| Email, WhatsApp, social links, SEO title/description/keywords | `src/data/site.ts` |
| Services, **portfolio projects**, skills, tools, achievements | `src/data/content.tsx` |
| About text | `src/components/sections/About.tsx` |
| Colours / fonts | `tailwind.config.ts`, `src/app/layout.tsx` |

**Placeholders to replace before launch**
- `site.links.email` and `site.links.whatsapp` (`src/data/site.ts`)
- All six projects in `projects` (`src/data/content.tsx`)
- Achievement values (`milestones`) – shown as `00` until you set real numbers
- Skill levels (`skills[].level`) and the `tools` list – these are starting points; set them to what is true for you

**Adding a project:** put an image in `public/projects/` (e.g. `reel-01.jpg`), optionally a short looping `.mp4`, then add an entry:

```ts
{ title: "My Reel", description: "...", category: "Short-form",
  image: "/projects/reel-01.jpg", video: "/projects/reel-01.mp4",
  href: "https://www.instagram.com/reel/XXXX/" }
```

## 5. Contact form setup

The form posts to `/api/contact`, which sends email through [Resend](https://resend.com) (free tier available).

1. Create a Resend account and an API key.
2. Set in `.env.local` (and in your hosting dashboard):
   ```
   RESEND_API_KEY=re_xxx
   CONTACT_TO_EMAIL=you@yourinbox.com
   CONTACT_FROM_EMAIL=onboarding@resend.dev
   ```
3. For production, verify `khaliidcore.com` in Resend and change `CONTACT_FROM_EMAIL` to e.g. `contact@khaliidcore.com`.

Until configured, the form shows a clear error message (it never silently fails). A honeypot field blocks basic bots.

## 6. Deploy (Vercel – recommended)

1. Push the project to a GitHub repository.
2. Go to https://vercel.com → **Add New → Project** → import the repo. Framework is auto-detected as Next.js.
3. Add the environment variables from `.env.example` (`NEXT_PUBLIC_SITE_URL=https://www.khaliidcore.com`, plus the Resend values).
4. Click **Deploy**. Every `git push` redeploys automatically.

Other hosts that support Next.js (Netlify, Cloudflare Pages, a Node VPS with `npm run build && npm run start`) also work.

## 7. Connect the custom domain (www.khaliidcore.com)

1. In Vercel: **Project → Settings → Domains → Add** `www.khaliidcore.com`. Also add `khaliidcore.com` and set it to redirect to `www`.
2. At your domain registrar's DNS settings, add the records Vercel shows. Typically:
   - `www` → **CNAME** → `cname.vercel-dns.com`
   - `@` (root) → **A** → `76.76.21.21`
   (Use the exact values Vercel displays for your project; they can differ.)
3. Wait for DNS to propagate (minutes to a few hours). Vercel issues the HTTPS certificate automatically.
4. Confirm `NEXT_PUBLIC_SITE_URL` is `https://www.khaliidcore.com`, then redeploy so canonical URL, sitemap and Open Graph use it.

## 8. Google Search Console

1. Go to https://search.google.com/search-console and sign in.
2. **Add property → URL prefix** → `https://www.khaliidcore.com`
   (or **Domain** → `khaliidcore.com` to cover all variants; this uses a DNS TXT record).
3. Verify ownership:
   - *HTML tag:* copy only the `content="..."` value into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, then click **Verify**.
   - *DNS (Domain property):* add the TXT record Google gives you at your registrar.
4. **Sitemaps → Add** `sitemap.xml` → Submit. (The site serves it at `/sitemap.xml`; `robots.txt` points to it.)
5. **URL Inspection** → paste `https://www.khaliidcore.com` → **Request indexing**.
6. Be patient: indexing and ranking are decided by Google and **can't be guaranteed or sped up reliably**. Typical first indexing takes days to weeks. Things that genuinely help: a live, fast site; links from your Instagram/YouTube bios to the site; consistent use of the name "Khalid Nadaf" / "KHALIIDCORE"; real content that you keep updating.

SEO already included: unique title and meta description, Open Graph + Twitter cards, generated OG image, canonical URL, `sitemap.xml`, `robots.txt`, `Person` and `WebSite` JSON-LD (only verified facts), keywords, semantic HTML.

## 9. Project structure

```
src/
├─ app/            layout, page, template (transitions), 404, loading, sitemap, robots, OG image, api/contact
├─ components/
│  ├─ layout/      Navbar, Footer, BackToTop, Loader, Cursor, SmoothScroll
│  ├─ sections/    Hero, About, Services, Portfolio, Skills, Achievements, Contact
│  └─ ui/          Reveal, Section, JsonLd
└─ data/           site.ts, content.tsx   ← your content lives here
```

## 10. Accessibility and performance notes

- Skip link, visible focus rings, semantic landmarks, `aria-*` on nav, tabs, form status and progress bars.
- Animations, smooth scroll and the custom cursor are disabled for `prefers-reduced-motion`; the cursor only runs with a mouse-type pointer.
- Fonts via `next/font` (self-hosted, no layout shift); portfolio videos use `preload="none"`.
- Security headers set in `next.config.mjs`.
