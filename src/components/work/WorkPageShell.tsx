import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export function WorkPageShell({
  children,
  wide = false,
  embedded = false,
}: {
  children: ReactNode;
  wide?: boolean;
  /** Studio / inline preview — no site chrome */
  embedded?: boolean;
}) {
  const content = (
    <section
      className={`relative overflow-hidden px-4 sm:px-6 md:px-8 lg:px-10 ${
        embedded
          ? "pb-10 pt-6 md:pb-12 md:pt-8"
          : "pb-16 pt-28 md:pb-24 md:pt-32"
      }`}
    >
      {!embedded && (
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-platinum/[0.06] blur-[100px]" />
      )}
      <div
        className={`relative mx-auto w-full ${
          wide ? "max-w-[1400px]" : "max-w-[1200px]"
        }`}
      >
        {children}
      </div>
    </section>
  );

  if (embedded) {
    return <div className="bg-noir">{content}</div>;
  }

  return (
    <div className="min-h-screen bg-noir">
      <Navigation />
      {content}
      <Footer />
    </div>
  );
}
