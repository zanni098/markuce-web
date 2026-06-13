import Link from 'next/link'
import { Zap, ExternalLink, Github, Twitter } from 'lucide-react'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'How it works',   href: '/how-it-works' },
      { label: 'Pricing',        href: '/pricing' },
      { label: 'Dashboard',      href: 'https://app.markuce.com/dashboard' },
      { label: 'Changelog',      href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation',  href: '/developers' },
      { label: 'API Reference',  href: '/developers#api' },
      { label: 'Webhooks',       href: '/developers#webhooks' },
      { label: 'SDKs',           href: '/developers#sdks' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',          href: '/about' },
      { label: 'Symbiothus ↗',  href: 'https://symbiothus.vercel.app/', external: true },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use',   href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      style={{ borderTop: '1px solid var(--border)' }}
      className="bg-base"
    >
      <div className="container-site py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '17px',
                  background: 'linear-gradient(135deg, #E4EBFF, #A5B4FC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Markuce
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-sub)' }}>
              The global Merchant of Record for the countries traditional payment platforms forgot.
            </p>
            {/* Symbiothus badge */}
            <Link
              href="https://symbiothus.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:bg-white/[0.06]"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-sub)',
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
              A Symbiothus product
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Nav columns */}
          {cols.map(col => (
            <div key={col.title}>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'var(--text-muted)' }}
              >
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      className="text-sm transition-colors hover:text-text flex items-center gap-1"
                      style={{ color: 'var(--text-sub)' }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Markuce · All rights reserved ·{' '}
            <span style={{ color: 'var(--text-sub)' }}>Built by</span>{' '}
            <Link
              href="https://symbiothus.vercel.app/"
              target="_blank"
              className="hover:text-text transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              Symbiothus
            </Link>
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/"
              target="_blank"
              className="p-2 rounded-lg transition-all hover:bg-white/[0.06]"
              style={{ color: 'var(--text-muted)' }}
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href="https://twitter.com/"
              target="_blank"
              className="p-2 rounded-lg transition-all hover:bg-white/[0.06]"
              style={{ color: 'var(--text-muted)' }}
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <span
              className="badge badge-live text-xs"
              style={{ fontSize: '11px', padding: '4px 10px' }}
            >
              <span className="live-dot" />
              System operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
