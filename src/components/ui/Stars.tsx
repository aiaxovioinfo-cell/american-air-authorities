/** Brass star row with an accessible label, e.g. "5 out of 5 stars". */
export function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill={i < n ? "#E0B478" : "none"}
          stroke="#A97939"
          strokeWidth="1.2"
          aria-hidden
        >
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </div>
  );
}
