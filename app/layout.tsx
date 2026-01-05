import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CaféList - Kavárny v Hradci Králové",
  description: "Najdi tu nejlepší kavárnu v Hradci Králové. Filtruj podle WiFi, hlučnosti a vhodnosti pro učení.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        {children}
      </body>
    </html>
  );
}
