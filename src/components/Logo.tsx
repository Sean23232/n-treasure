type LogoProps = {
  className?: string;
  markOnly?: boolean;
  tone?: "dark" | "light";
};

/**
 * Necessary Treasures brand mark.
 * A hand-drawn-feeling monogram (N + T stitched together like thread)
 * inside a soft organic badge, paired with a serif wordmark.
 */
export default function Logo({ className, markOnly = false, tone = "dark" }: LogoProps) {
  const ink = tone === "dark" ? "#3A2F28" : "#FBF6EC";
  const accent = "#C1613F";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        viewBox="0 0 64 64"
        width="34"
        height="34"
        role="img"
        aria-label="Necessary Treasures mark"
        className="shrink-0"
      >
        <circle
          cx="32"
          cy="32"
          r="29"
          fill="none"
          stroke={ink}
          strokeWidth="1.4"
          opacity="0.85"
        />
        <path
          d="M18 44 L18 20 L30 40 L30 20"
          fill="none"
          stroke={ink}
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34 20 L48 20 M41 20 L41 44"
          fill="none"
          stroke={ink}
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="49" cy="16" r="2.6" fill={accent} />
        <path
          d="M14 50 Q32 57 50 50"
          fill="none"
          stroke={accent}
          strokeWidth="1.3"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className="font-serif text-[1.08rem] italic tracking-tight"
            style={{ color: ink }}
          >
            Necessary
          </span>
          <span
            className="font-serif text-[1.08rem] italic tracking-tight -mt-0.5"
            style={{ color: ink }}
          >
            Treasures
          </span>
        </span>
      )}
    </span>
  );
}
