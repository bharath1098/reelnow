import type { Metadata } from "next";
import "@/index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Reelnow.in",
  description: "We make your events unforgettable and your stories go viral.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cinema">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
