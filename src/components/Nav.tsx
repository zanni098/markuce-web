'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { APP_URL, Logo } from './brand'

const links = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/pricing',      label: 'Pricing' },
  { href: '/developers',   label: 'Developers' },
  { href: '/about',        label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 16)
      setHidden(y > lastY.current && y > 120)
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
          transition: 'transform .3s cubic-bezier(.4,0,.2,1), background .3s, border-color .3s, box-shadow .3s',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
        className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'glass' : 'bg-transparent'}`}
      >
        <div className="container-site flex items-center justify-between" style={{ height: 68 }}>
          <Logo />

          <nav className="hidden md:flex items-center" style={{ gap: 2 }}>
            {links.map(l => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    fontSize: 14.5,
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    color: active ? 'var(--ink)' : 'var(--text-sub)',
                    background: active ? 'rgba(21,20,15,0.05)' : 'transparent',
                    transition: 'color .15s, background .15s',
                  }}
                  className="nav-link"
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center" style={{ gap: 10 }}>
            <Link href={`${APP_URL}/login`} className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: 14 }}>
              Sign in
            </Link>
            <Link href={`${APP_URL}/register`} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: 14 }}>
              Start free
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
            className="md:hidden"
            style={{ padding: 8, borderRadius: 8, color: 'var(--ink)', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col glass md:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ paddingTop: 68, transition: 'opacity .25s' }}
      >
        <nav className="container-site flex flex-col pt-6" style={{ gap: 4 }}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              style={{ padding: '14px 8px', borderRadius: 10, fontSize: 16, fontWeight: 500, color: 'var(--ink)', borderBottom: '1px solid var(--border)' }}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-6">
            <Link href={`${APP_URL}/login`} className="btn btn-secondary w-full justify-center">Sign in</Link>
            <Link href={`${APP_URL}/register`} className="btn btn-primary w-full justify-center">Start free</Link>
          </div>
        </nav>
      </div>
    </>
  )
}
