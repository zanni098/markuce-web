'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Code2, Webhook, Key, Package, ExternalLink, Check } from 'lucide-react'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const ENDPOINTS = [
  {
    method: 'POST',
    path: '/v1/checkout/sessions',
    desc: 'Create a hosted checkout session',
    body: '{ product_id, customer_email?, metadata? }',
    returns: '{ session_id, checkout_url, expires_in }',
  },
  {
    method: 'GET',
    path: '/v1/checkout/sessions/:id',
    desc: 'Retrieve a session by ID',
    body: null,
    returns: '{ id, status, payment_method, amount, currency }',
  },
  {
    method: 'POST',
    path: '/v1/products',
    desc: 'Create a product',
    body: '{ name, price_minor, currency, description?, recurring? }',
    returns: '{ id, payment_link_url }',
  },
  {
    method: 'GET',
    path: '/v1/transactions',
    desc: 'List merchant transactions',
    body: null,
    returns: '{ data: Transaction[], total }',
  },
  {
    method: 'POST',
    path: '/v1/webhooks',
    desc: 'Configure webhook endpoint',
    body: '{ url, enabled_events[] }',
    returns: '{ id, webhook_secret }',
  },
]

const EVENTS = [
  { event: 'payment.completed',   desc: 'A payment was successfully confirmed (card or crypto)' },
  { event: 'payment.failed',      desc: 'A payment failed or was cancelled' },
  { event: 'checkout.expired',    desc: 'A checkout session expired without payment' },
  { event: 'subscription.created',desc: 'A new subscription was created' },
  { event: 'subscription.updated',desc: 'Subscription status changed (e.g. past_due)' },
  { event: 'subscription.ended',  desc: 'Subscription was cancelled or expired' },
  { event: 'payout.completed',    desc: 'A bank or crypto payout was processed' },
  { event: 'refund.issued',       desc: 'A refund was issued to the customer' },
]

export default function DevelopersPage() {
  useReveal()

  return (
    <>
      {/* Hero */}
      <section
        className="grid-bg"
        style={{ paddingTop: 140, paddingBottom: 80, background: 'var(--void)', position: 'relative', overflow: 'hidden' }}
      >
        <div className="orb orb-primary" style={{ width: 400, height: 400, bottom: -100, right: -50, opacity: 0.18 }} />
        <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gap: 48, alignItems: 'center' }} className="md:grid-cols-[1fr_1fr]">
            <div>
              <span className="badge badge-primary" style={{ marginBottom: 20, display: 'inline-flex' }}>Developers</span>
              <h1 style={{ marginBottom: 20, fontFamily: 'var(--font-display), sans-serif' }}>
                API-first.<br />
                <span className="gradient-text">No surprises.</span>
              </h1>
              <p style={{ fontSize: 17, color: 'var(--text-sub)', lineHeight: 1.75, marginBottom: 32 }}>
                REST API over HTTPS, JSON everywhere, predictable errors, HMAC-signed webhooks, and a TypeScript SDK with full autocomplete.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="#api" className="btn btn-primary">
                  API Reference <ArrowRight size={14} />
                </Link>
                <Link href="#webhooks" className="btn btn-secondary">
                  Webhooks
                </Link>
              </div>
            </div>
            {/* Quick start */}
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: '#FF5F57' }} />
                <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
                <div className="terminal-dot" style={{ background: '#28C840' }} />
                <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>quickstart.ts</span>
              </div>
              <div style={{ padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75 }}>
                {[
                  <><span className="token-comment">// 1. Install</span></>,
                  <><span className="token-punc">$ </span><span className="token-var">npm install @markuce/sdk</span></>,
                  <></>,
                  <><span className="token-keyword">import</span><span className="token-var"> {'{ Markuce }'} </span><span className="token-keyword">from</span><span className="token-string"> '@markuce/sdk'</span></>,
                  <></>,
                  <><span className="token-comment">// 2. Create client</span></>,
                  <><span className="token-keyword">const </span><span className="token-var">mkc</span><span className="token-punc"> = </span><span className="token-keyword">new </span><span className="token-fn">Markuce</span><span className="token-punc">({'{ apiKey: process.env.MARKUCE_KEY }'})</span></>,
                  <></>,
                  <><span className="token-comment">// 3. Create checkout</span></>,
                  <><span className="token-keyword">const </span><span className="token-var">session</span><span className="token-punc"> = </span><span className="token-keyword">await </span><span className="token-var">mkc</span><span className="token-punc">.</span><span className="token-prop">checkout</span><span className="token-punc">.</span><span className="token-fn">create</span><span className="token-punc">({'({'})</span></>,
                  <><span className="token-prop">  amount</span><span className="token-punc">: </span><span className="token-number">4900</span><span className="token-punc">,</span><span className="token-comment">  // $49</span></>,
                  <><span className="token-prop">  currency</span><span className="token-punc">: </span><span className="token-string">'usd'</span><span className="token-punc">,</span></>,
                  <><span className="token-punc">{'})'}</span></>,
                  <></>,
                  <><span className="token-comment">// 4. Redirect</span></>,
                  <><span className="token-fn">redirect</span><span className="token-punc">(</span><span className="token-var">session</span><span className="token-punc">.</span><span className="token-prop">checkout_url</span><span className="token-punc">)</span></>,
                ].map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Base URL + Auth */}
      <section className="section-sm" style={{ background: 'var(--base)' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gap: 24 }} className="md:grid-cols-3">
            {[
              { icon: Code2, color: 'var(--primary)', title: 'Base URL', body: 'https://api.markuce.com/v1', mono: true },
              { icon: Key, color: '#F59E0B', title: 'Authentication', body: 'Bearer token via Authorization header using your sk_live_* key', mono: false },
              { icon: Package, color: 'var(--accent)', title: 'Response format', body: '{ success, data, error, meta } — consistent across all endpoints', mono: false },
            ].map(({ icon: Icon, color, title, body, mono }) => (
              <div key={title} className="card reveal">
                <div style={{ width: 40, height: 40, borderRadius: 11, background: `${color}18`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={18} color={color} />
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{title}</p>
                <p style={{ fontSize: 13, color: 'var(--text-sub)', fontFamily: mono ? 'var(--font-mono)' : 'inherit', lineHeight: 1.6 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section id="api" className="section grid-bg-tight" style={{ background: 'var(--void)' }}>
        <div className="container-site">
          <div className="reveal" style={{ marginBottom: 40 }}>
            <h2>API endpoints</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ENDPOINTS.map((ep, i) => (
              <div
                key={ep.path}
                className="card reveal"
                style={{ transitionDelay: `${i * 0.07}s`, padding: '20px 28px' }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 5,
                      background: ep.method === 'POST' ? 'var(--primary-dim)' : 'var(--accent-dim)',
                      color: ep.method === 'POST' ? 'var(--primary-bright)' : 'var(--accent)',
                      flexShrink: 0,
                    }}
                  >
                    {ep.method}
                  </span>
                  <code style={{ fontSize: 14, color: 'var(--text)', fontFamily: 'var(--font-mono)', flexGrow: 1 }}>{ep.path}</code>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-sub)', marginTop: 8 }}>{ep.desc}</p>
                {ep.body && (
                  <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Body</p>
                      <code style={{ fontSize: 12, color: 'var(--text-sub)', fontFamily: 'var(--font-mono)' }}>{ep.body}</code>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Returns</p>
                      <code style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{ep.returns}</code>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webhooks */}
      <section id="webhooks" className="section" style={{ background: 'var(--base)' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gap: 52, alignItems: 'start' }} className="lg:grid-cols-[1fr_1fr]">
            <div className="reveal">
              <span className="badge badge-accent" style={{ marginBottom: 20, display: 'inline-flex' }}>Webhooks</span>
              <h2 style={{ marginBottom: 16 }}>
                Signed. Retried.<br />
                <span className="gradient-text">Reliable.</span>
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-sub)', lineHeight: 1.75, marginBottom: 28 }}>
                Every webhook is HMAC-SHA256 signed with your <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>webhook_secret</code>.
                Verify the <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>Markuce-Signature</code> header on every request.
                Failed deliveries are retried 5 times with exponential backoff (10s → 1m → 5m → 30m → 2h).
              </p>
              <div className="code-block">
                <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text-muted)' }}>
                  Signature header format
                </div>
                <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.8 }}>
                  <div><span className="token-string">Markuce-Signature: </span><span className="token-var">t=1718000000,v1=abc123…</span></div>
                  <div style={{ marginTop: 12 }}><span className="token-comment">// Verify in Node.js</span></div>
                  <div><span className="token-keyword">const </span><span className="token-var">payload</span><span className="token-punc"> = </span><span className="token-string">`{'${t}.${rawBody}'}`</span></div>
                  <div><span className="token-keyword">const </span><span className="token-var">sig</span><span className="token-punc"> = </span><span className="token-fn">hmac</span><span className="token-punc">(</span><span className="token-var">secret</span><span className="token-punc">, </span><span className="token-var">payload</span><span className="token-punc">)</span></div>
                  <div><span className="token-keyword">const </span><span className="token-var">valid</span><span className="token-punc"> = sig === </span><span className="token-var">header</span><span className="token-punc">.</span><span className="token-prop">v1</span></div>
                </div>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 16 }}>
                Available events
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {EVENTS.map(({ event, desc }) => (
                  <div key={event} style={{ padding: '14px 18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                    <code style={{ fontSize: 13, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{event}</code>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
