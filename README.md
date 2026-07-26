# The Copper Spoon

The Copper Spoon is a responsive cooking discovery website that helps home cooks explore world cuisines, complete recipes, original cooking lessons, desserts, and Lagos restaurants in one welcoming place.

## Purpose and audience

The project is designed for curious home cooks, food lovers in Lagos, beginners who prefer step-by-step guidance, and visitors who want to discover food through culture. Its visual identity combines warm copper, cream, sage, and editorial serif typography to feel polished without becoming difficult to use.

## Main features

- Searchable and filterable recipes, cuisines, desserts, videos, and restaurants
- Complete dessert collection with original Copper Spoon artwork
- Written ingredients, numbered methods, timing, difficulty, servings, and chef tips
- Full HD cooking lessons linked directly to their recipes
- Lagos restaurant locations and dining information
- Supabase email/password and Google account authentication
- Resend newsletter signup, secure unsubscribe links, and daily recipe delivery
- Responsive desktop and mobile navigation
- Keyboard focus states, a skip link, semantic labels, reduced-motion support, error recovery, and a custom 404 page
- Project Story page explaining the problem, audience, design choices, architecture, challenges, and learning
- Health endpoint, structured server monitoring, retry-safe email delivery, and automated content tests

## Technology

- Next.js App Router
- React and TypeScript
- Supabase Authentication
- Resend email delivery
- Vercel deployment and cron scheduling

The site keeps content in typed data modules, prerenders recipe pages for speed, and uses server routes for protected email and operational tasks. Secrets stay in Vercel environment variables and are never placed in browser code.

## Run it locally

Requires Node.js 22.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm test
npm run build
```

Or run both:

```bash
npm run check
```

The tests protect collection integrity, complete recipe content, unique artwork, static route coverage, accessible mobile navigation, recovery pages, and the public “All” collection naming rule.

## Environment variables

Add these in Vercel → Project Settings → Environment Variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
RESEND_API_KEY
MAIL_FROM
SITE_URL=https://thecopperspoon.com
UNSUBSCRIBE_SECRET
CRON_SECRET
```

Use private random values for `UNSUBSCRIBE_SECRET` and `CRON_SECRET`. Never commit real keys to GitHub.

For detailed setup, see `AUTH-SETUP.txt` and `EMAIL-SETUP.txt`.

## Deploy

Push the extracted project files to the repository’s `main` branch. Vercel will build the project with `npm run build`. After changing environment variables, redeploy the latest production deployment so the new settings take effect.

## Project presentation

Open `/project-story` on the deployed website for the judge-ready explanation of:

- the problem and intended impact;
- the audience and experience goals;
- the visual system;
- the technical architecture;
- challenges and design decisions;
- accessibility and reliability improvements;
- learning and possible next steps.
