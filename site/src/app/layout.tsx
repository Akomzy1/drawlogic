import type { Metadata } from "next";
import copy from "../../content/site.json";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: copy.title, template: `%s · ${copy.title}` },
  description: copy.description,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en-GB"><body>{children}</body></html>;
}
