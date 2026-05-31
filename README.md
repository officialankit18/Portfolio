# Ankit Yadav Premium Portfolio

World-class dark portfolio website for Ankit Yadav, built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Highlights

- Premium dark glassmorphism interface inspired by Linear, Stripe, Vercel, Apple, Framer, and GitHub
- Animated hero with rotating roles, achievement badges, custom cursor, scroll progress, and magnetic CTAs
- Responsive sections for about, tech stack, featured projects, research, certifications, achievements, coding profiles, timeline, and contact
- Project filtering, mailto-powered contact form, downloadable resume, SEO metadata, sitemap, and robots file
- Certificate assets wired from the local folder into `public/certificates`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

## Deployment

Deploy directly to Vercel:

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Keep the default Next.js build settings.
4. Build command: `npm run build`
5. Output is handled automatically by Next.js.

## Asset Notes

- Hero image: `public/main.jpeg`
- Resume download: `public/Ankit-Yadav-Resume.pdf`
- Certificates: `public/certificates/*`

Update the social links, project links, and metadata in `src/data/portfolio.ts` and `src/app/layout.tsx` as needed.
