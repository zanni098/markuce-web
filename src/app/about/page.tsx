'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ExternalLink, Globe, Zap, Heart, Code2 } from 'lucide-react'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const TIMELINE = [
  { year: '2024', label: 'The problem', body: 'Every developer in Pakistan, Nigeria, and Bangladesh hitting the same wall: Stripe onboarding rejected, PayPal payouts blocked, LemonSqueezy unavailable. A billion people with working hands, working internet, working products — and no way to get paid.' },
  { year: '2025', label: 'Building Onramp', body: 'First prototype: a crypto-only checkout for personal use. ETH, SOL, MATIC accepted via smart contract. Verified on-chain. No intermediary. It worked for crypto-native buyers, but closed the door on everyone else.' },
  { year: '2025', label: 'The insight', body: 'The solution wasn\'t another crypto wallet. It was being the Merchant of Record. If Markuce is the legal seller — our Stripe, our bank, our entity — then any merchant in 150 countries can sell to any customer anywhere. Chainlink oracles give crypto payments the price integrity cards take for granted.' },
  { year: '2026', label: 'Markuce launches', body: 'Cards via Stripe Elements, crypto via Chainlink-priced on-chain verification. One checkout, both worlds. Full Merchant of Record legal layer. Deployed under Symbiothus.' },
]

const VALUES = [
  { icon: Globe, color: 'var(--primary)', title: 'Radically open', body: 'If you have internet and something to sell, you should be able to sell globally. Geography is an accident of birth, not a qualification.' },
  { icon: Code2, color: 'var(--accent)', title: 'Developer-first', body: 'We built this because we needed it as developers. Every API decision, every webhook format, every error message was written by someone who has been on the other side.' },
  { icon: Heart, color: '#EC4899', title: 'Honest pricing', body: 'One number. No tiers, no add-ons, no "contact sales." 3.4% + $0.30 per transaction, every time, for every feature we ship.' },
  { icon: Zap, color: '#F59E0B', title: 'Speed matters', body: 'Time to first sale under 10 minutes. Integration under 1 hour. Responses under 200ms. Because your time is your most valuable resource.' },
]

export default function AboutPage() {
  useReveal()

  return (
    <>
      {/* Hero */}
      <section
        className="grid-bg"
        style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--void)', position: 'relative', overflow: 'hidden' }}
      >
        <div className="orb orb-primary" style={{ width: 500, height: 500, top: -150, left: -100, opacity: 0.2 }} />
        <div className="orb orb-accent" style={{ width: 300, height: 300, bottom: -80, right: 50, opacity: 0.15, animationDelay: '3s' }} />
        <div className="container-narrow" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <span className="badge badge-primary" style={{ marginBottom: 20, display: 'inline-flex' }}>Our story</span>
          <h1 style={{ marginBottom: 24 }}>
            Built by people who<br />
            <span className="gradient-text">felt the problem first.</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-sub)', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 40px' }}>
            Markuce started as a personal frustration — a developer in Pakistan who couldn't get paid
            for products he built. It became a platform for everyone in the same position.
          </p>
          {/* Symbiothus highlight */}
          <Link
            href="https://symbiothus.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 24px',
              background: 'var(--surface)',
              border: '1px solid rgba(0,201,167,0.25)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} color="white" fill="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Part of Symbiothus</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>symbiothus.vercel.app →</p>
            </div>
            <ExternalLink size={14} color="var(--accent)" />
          </Link>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--base)' }}>
        <div className="container-narrow">
          <div className="reveal" style={{ marginBottom: 52, textAlign: 'center' }}>
            <h2>How we got here</h2>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--primary), var(--accent), transparent)', borderRadius: 2 }} />

            <div style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 48 }}>
              {TIMELINE.map(({ year, label, body }, i) => (
                <div key={year + i} className="reveal" style={{ transitionDelay: `${i * 0.1}s`, position: 'relative' }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute',
                    left: -42,
                    top: 6,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    border: '2px solid var(--base)',
                    boxShadow: '0 0 12px rgba(88,101,242,0.5)',
                  }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary)', marginBottom: 6, display: 'block' }}>{year}</span>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, marginBottom: 10 }}>{label}</h3>
                  <p style={{ fontSize: 15, color: 'var(--text-sub)', lineHeight: 1.75 }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section grid-bg" style={{ background: 'var(--void)' }}>
        <div className="container-site">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2>What we believe</h2>
          </div>
          <div style={{ display: 'grid', gap: 20 }} className="md:grid-cols-2">
            {VALUES.map(({ icon: Icon, color, title, body }, i) => (
              <div key={title} className="card card-glow reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={20} color={color} />
                </div>
                <h3 style={{ fontSize: 18, fontFamily: 'Syne, sans-serif', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-sub)', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Symbiothus section */}
      <section className="section" style={{ background: 'var(--base)' }}>
        <div className="container-narrow">
          <div
            className="reveal"
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(0,201,167,0.2)',
              borderRadius: 'var(--radius-xl)',
              padding: '52px 56px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(0,201,167,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <Zap size={26} color="white" fill="white" />
              </div>
              <h2 style={{ marginBottom: 16 }}>
                Part of the <span className="gradient-text">Symbiothus</span> family
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.75, maxWidth: 500, margin: '0 auto 32px' }}>
                Markuce is a product built and maintained by Symbiothus — a studio building infrastructure tools for developers in underserved markets.
              </p>
              <Link
                href="https://symbiothus.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
                style={{ padding: '12px 32px' }}
              >
                Visit Symbiothus <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'var(--void)', textAlign: 'center' }}>
        <div className="container-narrow reveal">
          <h2 style={{ marginBottom: 20 }}>
            Join the <span className="gradient-text">revolution</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-sub)', marginBottom: 32 }}>
            Be part of the platform that opens payments to the world.
          </p>
          <Link href="https://app.markuce.com/register" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}>
            Start for free <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
