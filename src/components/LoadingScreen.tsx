const HOLES = [0, 60, 120, 180, 240, 300];

function FilmReel() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="h-16 w-16 animate-spin text-platinum"
      aria-hidden
      style={{ animationDuration: "2.4s" }}
    >
      <circle
        cx="40"
        cy="40"
        r="36"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.35"
      />
      <circle
        cx="40"
        cy="40"
        r="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      {HOLES.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 40 + Math.cos(rad) * 22;
        const y = 40 + Math.sin(rad) * 22;
        return (
          <circle
            key={deg}
            cx={x}
            cy={y}
            r="5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          />
        );
      })}
    </svg>
  );
}

function FilmStrip() {
  const frames = Array.from({ length: 10 });
  return (
    <div className="mt-1 w-28 overflow-hidden rounded-md border border-platinum/25 bg-noir">
      <div className="flex justify-between px-1 py-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="h-1 w-1 rounded-[1px] bg-platinum/40" />
        ))}
      </div>
      <div className="overflow-hidden">
        <div className="reel-strip-track flex w-[200%]">
          {frames.map((_, i) => (
            <span
              key={i}
              className="mx-0.5 h-6 w-5 shrink-0 rounded-[2px] border border-platinum/20 bg-platinum/10"
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between px-1 py-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="h-1 w-1 rounded-[1px] bg-platinum/40" />
        ))}
      </div>
    </div>
  );
}

export function LoadingMark({
  label = "Loading",
  full = false,
}: {
  label?: string;
  full?: boolean;
}) {
  return (
    <div
      className={
        full
          ? "flex min-h-screen flex-col items-center justify-center gap-3 bg-noir"
          : "flex min-h-[42vh] flex-col items-center justify-center gap-3"
      }
      role="status"
      aria-live="polite"
    >
      <FilmReel />
      <FilmStrip />
      <p className="mt-2 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-silver">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
        {label}
      </p>
    </div>
  );
}
