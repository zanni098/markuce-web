'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { UserPlus, Package, Link2, ShieldCheck, ArrowRight, Zap, Globe, CreditCard, Bitcoin, Check } from 'lucide-react'
import type { Metadata } from 'next'

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

const STEPS = [
  {
    n: '01',
    icon: UserPlus,
    color: 'var(--primary)',
    colorDim: 'var(--primary-dim)',
    title: 'Create your account',
    body: 'Sign up with email in under 2 minutes. Set your business name, connect a crypto wallet or bank for payouts, and optionally complete our light KYC. No US LLC required. No Stripe account needed.',
    detail: [
      'Email + password signup',
      'Light KYC via Sumsub (optional)',
      'Solana, Polygon, or Ethereum wallet',
      'Bank payout via Wise in 160+ countries',
    ],
  },
  {
    n: '02',
    icon: Package,
    color: '#A78BFA',
    colorDim: 'rgba(167,139,250,0.1)',
    title: 'Create your products',
    body: 'Add your products or services with a name, description, and price. Each product gets a unique hosted checkout URL you can share or embed anywhere — social media, email, your website.',
    detail: [
      'One-time or recurring billing',
      'Any price in USD, EUR, or GBP',
      'Hosted checkout URL instantly',
      'Embeddable in any website',
    ],
  },
  {
    n: '03',
    icon: Link2,
    color: 'var(--accent)',
    colorDim: 'var(--accent-dim)',
    title: 'Share your checkout link',
    body: 'Send customers to your hosted Markuce checkout page. They choose between paying by card (Stripe Elements) or crypto (ETH, USDC on Solana, MATIC on Polygon). Prices update live from Chainlink oracles.',
    detail: [
      'Stripe Elements for debit/credit cards',
      'ETH on Ethereum mainnet',
      'USDC on Solana',
      'MATIC on Polygon',
    ],
  },
  {
    n: '04',
    icon: ShieldCheck,
    color: '#22C55E',
    colorDim: 'rgba(34,197,94,0.1)',
    title: 'Get paid, instantly',
    body: 'Once payment is confirmed — whether card or on-chain — funds are settled. Card payments route through our Stripe Connect platform. Crypto goes non-custodially straight to your wallet. Webhook fires to your server.',
    detail: [
      'Card: settled to your bank via Stripe',
      'Crypto: straight to your wallet',
      'Signed webhook delivery',
      'Real-time dashboard update',
    ],
  },
]

export default function HowItWorksPage() {
  useReveal()
  return (
    <>
      {/* Hero */}
      <section
        className="grid-bg"
        style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--void)', position: 'relative', overflow: 'hidden' }}
      >
        <div className="orb orb-primary" style={{ width: 500, height: 500, top: -200, right: -100, opacity: 0.2 }} />
        <div className="container-narrow" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span className="badge badge-accent" style={{ marginBottom: 20, display: 'inline-flex' }}>How it works</span>
          <h1 style={{ marginBottom: 20 }}>
            From signup to<br /><span className="gradient-text">first sale in 10 minutes</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-sub)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            Markuce handles the legal, the compliance, and the payment rails. You
            focus on what you're selling.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="section" style={{ background: 'var(--base)' }}>
        <div className="container-site">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
            {STEPS.map(({ n, icon: Icon, color, colorDim, title, body, detail }, i) => (
              <div
                key={title}
                className="reveal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 48,
                  alignItems: 'center',
                  transitionDelay: `${i * 0.05}s`,
                }}
              >
                {/* Step indicator + content */}
                <div style={{ display: 'grid', gap: 40, alignItems: 'center' }} className="md:grid-cols-[1fr_1fr]">
                  <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-display), sans-serif',
                          fontSize: 72,
                          fontWeight: 800,
                          lineHeight: 1,
                          color: color,
                          opacity: 0.15,
                          userSelect: 'none',
                        }}
                      >
                        {n}
                      </span>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: colorDim, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={22} color={color} />
                      </div>
                    </div>
                    <h2 style={{ fontSize: 28, marginBottom: 16, fontFamily: 'var(--font-display), sans-serif' }}>{title}</h2>
                    <p style={{ fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.75, marginBottom: 24 }}>{body}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {detail.map(d => (
                        <div key={d} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <Check size={12} color={color} />
                          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual card */}
                  <div
                    style={{
                      order: i % 2 === 0 ? 1 : 0,
                      background: 'var(--surface)',
                      border: `1px solid ${color}22`,
                      borderRadius: 'var(--radius-xl)',
                      padding: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 200,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, ${color}0D 0%, transparent 70%)` }} />
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                      <div style={{ width: 64, height: 64, borderRadius: 18, background: colorDim, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Icon size={30} color={color} />
                      </div>
                      <p style={{ fontFamily: 'var(--font-display), sans-serif', fontWeight: 700, fontSize: 20, color: 'var(--text)' }}>Step {n}</p>
                      <p style={{ fontSize: 14, color: 'var(--text-sub)', marginTop: 6 }}>{title}</p>
                    </div>
                  </div>
                </div>

                {/* Connector (not last) */}
                {i < STEPS.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 2, height: 40, background: `linear-gradient(to bottom, ${color}44, transparent)`, borderRadius: 2 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment methods deep-dive */}
      <section className="section grid-bg" style={{ background: 'var(--void)' }}>
        <div className="container-site">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2>Two ways to pay.<br /><span className="gradient-text">One checkout.</span></h2>
          </div>
          <div style={{ display: 'grid', gap: 24 }} className="md:grid-cols-2">
            <div className="card reveal" style={{ transitionDelay: '0.1s' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                <CreditCard size={20} color="var(--primary)" />
                <h3 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 20 }}>Card payments</h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: 20 }}>
                Stripe Elements embedded directly in the checkout. Accepts Visa, Mastercard, Amex, and most local debit cards globally. PCI compliant. 3D Secure where required.
              </p>
              <div style={{ display: 'flex', flex: 'column', gap: 10, flexDirection: 'column' }}>
                {['Visa, Mastercard, Amex', 'Local debit cards', '3DS + fraud protection', 'Instant settlement'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8 }}>
                    <Check size={13} color="var(--primary)" style={{ marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card reveal" style={{ transitionDelay: '0.2s', borderColor: 'rgba(14,122,95,0.2)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                <Bitcoin size={20} color="var(--accent)" />
                <h3 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 20 }}>Crypto payments</h3>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: 20 }}>
                ETH on Ethereum, USDC on Solana, MATIC on Polygon. Prices fetched from Chainlink on-chain oracles — tamper-proof. ±2% tolerance handles price movement during settlement.
              </p>
              <div style={{ display: 'flex', flex: 'column', gap: 10, flexDirection: 'column' }}>
                {['ETH · USDC · MATIC', 'Chainlink oracle prices', '±2% tolerance window', 'Non-custodial to your wallet'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8 }}>
                    <Check size={13} color="var(--accent)" style={{ marginTop: 2 }} />
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'var(--base)', textAlign: 'center' }}>
        <div className="container-narrow reveal">
          <h2 style={{ marginBottom: 16 }}>Ready to start?</h2>
          <p style={{ fontSize: 16, color: 'var(--text-sub)', marginBottom: 32 }}>
            Sign up in 2 minutes. Your first checkout link is 5 minutes after that.
          </p>
          <Link href="https://markuce-app.vercel.app/register" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}>
            Create free account <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
