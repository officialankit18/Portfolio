import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ankityadav.dev"),
  title: {
    default: "Ankit Yadav | Software Engineer & Full Stack Developer",
    template: "%s | Ankit Yadav"
  },
  description:
    "Premium portfolio of Ankit Yadav, a software engineering undergraduate building scalable web apps, backend systems, AI-powered products, research projects, and freelance client websites.",
  keywords: [
    "Ankit Yadav",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "Freelance Web Developer",
    "AI Enthusiast",
    "Research Author",
    "Kanpur Developer"
  ],
  authors: [{ name: "Ankit Yadav", url: "https://github.com/officialankit18" }],
  creator: "Ankit Yadav",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" }
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/favicon.png", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Ankit Yadav | Software Engineer & Full Stack Developer",
    description:
      "Real-world software, backend systems, AI-driven projects, research, hackathons, and freelance products.",
    url: "https://ankityadav.dev",
    siteName: "Ankit Yadav Portfolio",
    images: [{ url: "/main.jpeg", width: 1200, height: 1200, alt: "Ankit Yadav" }],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Yadav | Software Engineer",
    description: "Software engineer, full stack developer, backend-focused builder, and AI enthusiast.",
    images: ["/main.jpeg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#FFF7F3",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ankit Yadav",
    url: "https://ankityadav.dev",
    image: "https://ankityadav.dev/main.jpeg",
    jobTitle: "Software Engineer & Full Stack Developer",
    description: "Software engineering undergraduate building scalable web apps, backend systems, and AI-powered products",
    sameAs: [
      "https://github.com/officialankit18",
      "https://twitter.com/ankityadav18",
      "https://linkedin.com/in/ankit-yadav-dev"
    ],
    email: "contact@ankityadav.dev",
    location: {
      "@type": "City",
      name: "Kanpur, India"
    },
    knowsAbout: [
      "Web Development",
      "Backend Development",
      "Full Stack Development",
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "AI/ML"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body className="bg-ink font-body text-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
