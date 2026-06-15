import Link from 'next/link'

/** Destination for all auth / dashboard CTAs (the real Markuce app). */
export const APP_URL = 'https://markuce-app.vercel.app'

interface LogoProps {
  onDark?: boolean
  size?: number
}

/** Markuce wordmark — minimal ink mark + emerald spark. */
export function Logo({ onDark = false, size = 28 }: LogoProps) {
  const ink = onDark ? '#F4F2EC' : 'var(--ink)'
  return (
    <Link href="/" className="inline-flex items-center" style={{ gap: 10, textDecoration: 'none' }}>
      <span
        aria-hidden
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          background: 'var(--ink)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
          <path d="M3 19V5l6 8 6-8v14" stroke="#F4F2EC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="19.5" cy="6.5" r="2.4" fill="#12936F" />
        </svg>
      </span>
      <span
        style={{
          fontFamily: 'var(--font-display), sans-serif',
          fontWeight: 700,
          fontSize: size * 0.66,
          letterSpacing: '-0.04em',
          color: ink,
        }}
      >
        Markuce
      </span>
    </Link>
  )
}
