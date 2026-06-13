'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Zap } from 'lucide-react'

const links = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing',      label: 'Pricing' },
  { href: '/developers',   label: 'Developers' },
  { href: '/about',        label: 'About' },
]

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const lastY = useRef(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > lastY.current && y > 100)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        style={{
          transform: hidden && !mobileOpen ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s, border-color 0.3s',
        }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled
            ? 'glass border-b'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container-site flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span
              className="font-display font-700 text-lg tracking-tight"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #E4EBFF, #A5B4FC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Markuce
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === l.href
                    ? 'text-white bg-white/[0.06]'
                    : 'text-sub hover:text-text hover:bg-white/[0.04]'
                }`}
                style={{ color: pathname === l.href ? undefined : 'var(--text-sub)' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="https://app.markuce.com/login" className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '14px' }}>
              Sign in
            </Link>
            <Link href="https://app.markuce.com/register" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
              Start free →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 rounded-lg text-sub hover:text-text hover:bg-white/[0.06] transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col glass transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '64px' }}
      >
        <nav className="container-site flex flex-col gap-1 pt-6">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all text-sub hover:text-text hover:bg-white/[0.06]"
            >
              {l.label}
            </Link>
          ))}
          <div className="divider my-4" />
          <Link
            href="https://app.markuce.com/register"
            className="btn btn-primary w-full justify-center mt-2"
          >
            Start free →
          </Link>
        </nav>
      </div>
    </>
  )
}
