export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { text: "text-lg", badge: "text-xs" },
    md: { text: "text-xl", badge: "text-xs" },
    lg: { text: "text-3xl", badge: "text-sm" },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gray-900 rounded-lg p-1.5 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 13L7.5 7L10.5 10.5L13.5 5.5L17 13"
            stroke="#14A88F"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10.5" cy="5.5" r="1.5" fill="#D4A017" />
        </svg>
      </div>
      <span
        className={`font-bold tracking-tight text-gray-900 ${sizes[size].text}`}
      >
        SMART-ED
      </span>
    </div>
  );
}