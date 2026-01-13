import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "./components/Toast";

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
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
