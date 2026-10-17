import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="relative z-10 text-center">
        <p className="font-serif text-8xl font-bold text-platinum md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-serif text-2xl font-medium text-white md:text-4xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md font-sans text-sm text-silver">
          This page does not exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-platinum px-6 py-3 font-sans text-sm font-semibold text-noir"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-platinum/30 px-6 py-3 font-sans text-sm font-semibold text-platinum"
          >
            <ArrowLeft className="h-4 w-4" />
            Our Work
          </Link>
        </div>
      </div>
    </div>
  );
}
