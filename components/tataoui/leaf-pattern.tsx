export function LeafPattern() {
  return (
      <svg
      className="pointer-events-none fixed inset-0 -z-10 size-full opacity-[0.06]"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="tataoui-leaves" width="120" height="120" patternUnits="userSpaceOnUse">
          <path
            d="M20 40c10-20 30-20 40 0-10 20-30 20-40 0z"
            fill="currentColor"
            className="text-accent"
            transform="rotate(20 40 40)"
          />
          <path
            d="M80 90c10-20 30-20 40 0-10 20-30 20-40 0z"
            fill="currentColor"
            className="text-accent"
            transform="rotate(-15 100 90)"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tataoui-leaves)" />
    </svg>
  )
}
