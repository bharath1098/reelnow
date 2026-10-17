"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Film } from "lucide-react";
import { saveStudioSession } from "@/lib/studio-session";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid email or password.");
        setPending(false);
        return;
      }
      saveStudioSession(data.user);
      const next = params.get("next");
      router.replace(
        next?.startsWith("/") && !next.startsWith("//") ? next : "/studio",
      );
    } catch {
      setError("Could not sign in. Try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-noir px-4">
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-platinum/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-silver/10 blur-[110px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(230,230,230,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(230,230,230,0.55) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-[420px] rounded-[2rem] border border-platinum/20 bg-charcoal/50 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:p-10"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-platinum/25 bg-platinum/10 text-platinum">
          <Film className="h-5 w-5" />
        </div>
        <p className="mt-5 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-silver">
          ReelNow Studio
        </p>
        <h1 className="mt-3 text-center font-serif text-4xl font-medium text-platinum">
          Sign in
        </h1>
        <p className="mt-3 text-center font-sans text-sm text-silver">
          For admin, manager, and worker accounts.
        </p>

        <label className="studio-label mt-8">
          Email
          <input
            className="studio-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@reelnow.in"
            required
          />
        </label>
        <label className="studio-label mt-5">
          Password
          <input
            className="studio-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && (
          <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-8 w-full rounded-full bg-platinum py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-noir transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Enter studio"}
        </button>

        <Link
          href="/"
          className="mt-6 block text-center font-sans text-[11px] uppercase tracking-[0.18em] text-silver transition-colors hover:text-platinum"
        >
          Back to public site
        </Link>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
