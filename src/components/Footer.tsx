import Link from 'next/link'
import { ArrowUpRight, Github, Twitter } from 'lucide-react'
import { APP_URL, Logo } from './brand'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Pricing',      href: '/pricing' },
      { label: 'Dashboard',    href: `${APP_URL}/dashboard` },
      { label: 'Changelog',    href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '/developers' },
      { label: 'API Reference', href: '/developers#api' },
      { label: 'Webhooks',      href: '/developers#webhooks' },
      { label: 'Status',        href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About',         href: '/about' },
      { label: 'Symbiothus',    href: 'https://symbiothus.vercel.app/', external: true },
      { label: 'Privacy',       href: '#' },
      { label: 'Terms',         href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="section-ink" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container-site" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 48, marginBottom: 64 }}>
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo onDark />
            <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 18, marginBottom: 22, color: 'var(--on-ink-sub)', maxWidth: 260 }}>
              The global Merchant of Record for the countries traditional payment platforms forgot.
            </p>
            <Link
              href="https://symbiothus.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 14px', borderRadius: 10, fontSize: 12.5, fontWeight: 500,
                color: 'var(--on-ink)', background: 'rgba(244,242,236,0.06)',
                border: '1px solid rgba(244,242,236,0.16)', textDecoration: 'none',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-bright)' }} />
              A Symbiothus product
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <p style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--on-ink-sub)', marginBottom: 18 }}>
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      style={{ fontSize: 14, color: 'var(--on-ink-sub)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, transition: 'color .15s' }}
                      className="footer-link"
                    >
                      {l.label}
                      {l.external && <ArrowUpRight size={12} />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between"
          style={{ gap: 16, paddingTop: 28, borderTop: '1px solid rgba(244,242,236,0.12)' }}
        >
          <p style={{ fontSize: 12.5, color: 'var(--on-ink-sub)' }}>
            © {new Date().getFullYear()} Markuce · Built by{' '}
            <Link href="https://symbiothus.vercel.app/" target="_blank" style={{ color: 'var(--accent-bright)', textDecoration: 'none' }}>
              Symbiothus
            </Link>
          </p>
          <div className="flex items-center" style={{ gap: 8 }}>
            <Link href="https://github.com/" target="_blank" aria-label="GitHub" style={{ padding: 8, borderRadius: 8, color: 'var(--on-ink-sub)' }}>
              <Github size={16} />
            </Link>
            <Link href="https://twitter.com/" target="_blank" aria-label="Twitter" style={{ padding: 8, borderRadius: 8, color: 'var(--on-ink-sub)' }}>
              <Twitter size={16} />
            </Link>
            <span className="badge badge-live" style={{ fontSize: 11.5, marginLeft: 4 }}>
              <span className="live-dot" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
