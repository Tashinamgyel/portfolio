import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Tashi Namgyel - Full Stack Developer",
    description:
        "Full Stack Developer specializing in Flutter, Java, Spring Boot, and Python. ICT student at Rangsit University seeking internship opportunities.",
    keywords: [
        "Tashi Namgyel",
        "Full Stack Developer",
        "Flutter Developer",
        "Java",
        "Spring Boot",
        "Python",
        "Mobile Development",
        "Web Development",
    ],
    authors: [{ name: "Tashi Namgyel" }],
    creator: "Tashi Namgyel",
    publisher: "Tashi Namgyel",
    metadataBase: new URL("https://www.tashinamgyel.com"),
    alternates: {
        canonical: "https://www.tashinamgyel.com",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.tashinamgyel.com",
        title: "Tashi Namgyel - Full Stack Developer",
        description:
            "Full Stack Developer specializing in Flutter, Java, Spring Boot, and Python. ICT student at Rangsit University seeking internship opportunities.",
        siteName: "Tashi Namgyel Portfolio",
        images: [
            {
                url: "/images/tashi-profile.jpeg",
                width: 1200,
                height: 630,
                alt: "Tashi Namgyel - Full Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Tashi Namgyel - Full Stack Developer",
        description:
            "Full Stack Developer specializing in Flutter, Java, Spring Boot, and Python. ICT student at Rangsit University seeking internship opportunities.",
        images: ["/images/tashi-profile.jpeg"],
        creator: "@tashinamgyel",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code", // Add your Google Search Console verification code
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <head>
            <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
            {/* Additional meta tags for better SEO */}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#facc15" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/images/tashi-profile.jpeg" />

            {/* Preconnect to external domains for better performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* JSON-LD structured data for better SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        name: "Tashi Namgyel",
                        url: "https://www.tashinamgyel.com",
                        image: "https://www.tashinamgyel.com/images/tashi-profile.jpeg",
                        jobTitle: "Full Stack Developer",
                        worksFor: {
                            "@type": "EducationalOrganization",
                            name: "Rangsit University",
                        },
                        alumniOf: {
                            "@type": "EducationalOrganization",
                            name: "Rangsit University",
                        },
                        knowsAbout: ["Flutter", "Java", "Spring Boot", "Python", "Mobile Development", "Web Development"],
                        email: "tashin599@gmail.com",
                        telephone: "+66819871288",
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Rangsit",
                            addressCountry: "Thailand",
                        },
                        sameAs: ["https://github.com/Tashinamgyel"],
                    }),
                }}
            />
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    )
}
