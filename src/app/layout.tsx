import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
    title: "FocusHub",
    description: "Gamified Time Tracking",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className="antialiased font-display bg-background text-foreground">
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
