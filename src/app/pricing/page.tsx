'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight, HelpCircle } from 'lucide-react'

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

const FAQS = [
  {
    q: 'Are there any monthly fees or minimums?',
    a: 'No. Markuce charges 3.4% + $0.30 per successful transaction. If you don\'t sell, you pay nothing. No subscription, no setup fee, no minimum.',
  },
  {
    q: 'What does "all-inclusive" mean?',
    a: 'Everything is in that one percentage: Stripe card processing, Chainlink oracle lookups, webhook delivery, analytics, and our platform fee. You will never see a hidden line item.',
  },
  {
    q: 'How do payouts work?',
    a: 'Card payments settle through our Stripe Connect platform and are paid out to your bank (via Wise in 160+ countries). Crypto payments are non-custodial — they go directly to your wallet the moment confirmed on-chain.',
  },
  {
    q: 'Is there a fee for crypto payments?',
    a: 'The same 3.4% + $0.30 applies to crypto transactions, based on the USD value at the time of payment (using the Chainlink oracle price). You receive the net amount in crypto.',
  },
  {
    q: 'What currencies do you support?',
    a: 'Products are priced in USD. Card payments can be made in any currency (Stripe handles conversion). Crypto: ETH, USDC (Solana), MATIC (Polygon).',
  },
  {
    q: 'Do I need to pay for failed payments?',
    a: 'No. You are only charged when a transaction is successfully confirmed — either a successful Stripe charge or an on-chain confirmation.',
  },
]

export default function PricingPage() {
  useReveal()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const amounts = [100, 500, 1000, 5000, 10000]

  return (
    <>
      {/* Hero */}
      <section
        className="grid-bg"
        style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--void)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div className="orb orb-accent" style={{ width: 400, height: 400, top: -100, left: '50%', transform: 'translateX(-50%)', opacity: 0.15 }} />
        <div className="container-narrow" style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge badge-accent" style={{ marginBottom: 20, display: 'inline-flex' }}>Pricing</span>
          <h1 style={{ marginBottom: 20 }}>
            One price.<br /><span className="gradient-text">No surprises.</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-sub)', lineHeight: 1.7 }}>
            Pay only when you earn. Everything included.
          </p>
        </div>
      </section>

      {/* Pricing card */}
      <section className="section" style={{ background: 'var(--base)' }}>
        <div className="container-narrow">
          <div
            className="reveal glow-primary"
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(88,101,242,0.35)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}
          >
            <div style={{ height: 5, background: 'linear-gradient(to right, var(--primary), var(--accent))' }} />
            <div style={{ padding: '52px 56px' }}>
              <div style={{ display: 'grid', gap: 48, alignItems: 'start' }} className="md:grid-cols-2">
                <div>
                  <div style={{ marginBottom: 24 }}>
                    <span
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: 80,
                        fontWeight: 800,
                        lineHeight: 1,
                        background: 'linear-gradient(135deg, var(--text), var(--primary-bright))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      3.4%
                    </span>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 700, color: 'var(--text-sub)', marginLeft: 8 }}>
                      + $0.30
                    </span>
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: 32 }}>
                    Per successful transaction. All-inclusive — card processing, oracle feeds, webhooks, payouts.
                    No monthly plan. No minimums. No surprises.
                  </p>
                  <Link href="https://app.markuce.com/register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '15px 0' }}>
                    Start for free <ArrowRight size={16} />
                  </Link>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
                    No credit card required · Cancel anytime
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 18 }}>
                    Everything included
                  </p>
                  {[
                    'Stripe Elements card processing',
                    'ETH · USDC (Solana) · MATIC payments',
                    'Chainlink on-chain oracle prices',
                    'Non-custodial crypto settlement',
                    'Signed webhook delivery (5 retries)',
                    'Full merchant dashboard',
                    'Revenue analytics + charts',
                    'REST API + TypeScript SDK',
                    'Wise bank payouts to 160+ countries',
                    'Light KYC via Sumsub',
                    'Email + community support',
                  ].map(f => (
                    <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 11 }}>
                      <Check size={13} color="var(--accent)" />
                      <span style={{ fontSize: 14, color: 'var(--text-sub)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue calculator */}
      <section className="section grid-bg-tight" style={{ background: 'var(--void)' }}>
        <div className="container-narrow">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2>What will you keep?</h2>
            <p style={{ fontSize: 16, color: 'var(--text-sub)', marginTop: 12 }}>See your take-home from monthly revenue</p>
          </div>
          <div className="reveal" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Monthly GMV', 'Platform fee', 'Transaction fees', 'You keep'].map(h => (
                    <th key={h} style={{ padding: '16px 24px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {amounts.map((gmv, i) => {
                  const txCount = gmv / 49 // assume avg $49 order
                  const platformFee = gmv * 0.034
                  const txFee = txCount * 0.30
                  const total = platformFee + txFee
                  const keep = gmv - total
                  const keepPct = ((keep / gmv) * 100).toFixed(1)
                  return (
                    <tr key={gmv} style={{ borderBottom: i < amounts.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                      <td style={{ padding: '16px 24px', fontSize: 15, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                        ${gmv.toLocaleString()}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-sub)', fontFamily: 'var(--font-mono)' }}>
                        ${platformFee.toFixed(0)}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: 14, color: 'var(--text-sub)', fontFamily: 'var(--font-mono)' }}>
                        ${txFee.toFixed(0)}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                          ${keep.toFixed(0)}
                        </span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 6 }}>({keepPct}%)</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border)', background: 'var(--elevated)' }}>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                Estimate assumes avg order value of $49. Actual fees depend on transaction count. Crypto payouts are direct — no withdrawal fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--base)' }}>
        <div className="container-narrow">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2>Pricing FAQ</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  transitionDelay: `${i * 0.06}s`,
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: 16,
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text)' }}>{faq.q}</span>
                  <HelpCircle size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 18px', fontSize: 14, color: 'var(--text-sub)', lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
