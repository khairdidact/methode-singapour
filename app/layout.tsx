import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Méthode de Singapour — Les mathématiques qui se voient",
  description:
    "Guide interactif, illustré et complet de la méthode d’enseignement des mathématiques de Singapour, avec dix situations résolues et comparées.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
