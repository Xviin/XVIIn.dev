import Link from "next/link";
import "./globals.css";

// Fallback for paths outside any locale; renders its own document because the root layout is a pass-through.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col justify-center px-6">
        <p className="font-mono text-sm text-muted">404</p>
        <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
        <Link href="/" className="mt-6 text-muted hover:text-fg">← Go home</Link>
      </body>
    </html>
  );
}
