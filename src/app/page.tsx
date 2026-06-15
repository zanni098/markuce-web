'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Shield, Globe, Check, X as XIcon, Copy, CheckCheck, ArrowRight, ArrowUpRight,
  CreditCard, Coins, Layers, Webhook, Lock,
} from 'lucide-react'
import { APP_URL } from '@/components/brand'

/* ───────────────────────── Live price ticker ───────────────────────── */

interface CoinData { usd: number; usd_24h_change: number }
type Prices = Record<string, CoinData>

const INITIAL_PRICES: Prices = {
  ethereum:        { usd: 3241.80, usd_24h_change: 2.14 },
  bitcoin:         { usd: 67_450,  usd_24h_change: 0.78 },
  solana:          { usd: 148.32,  usd_24h_change: -0.55 },
  'matic-network': { usd: 0.89,    usd_24h_change: 1.32 },
}

const COINS = [
  { id: 'ethereum',      sym: 'ETH',   name: 'Ethereum' },
  { id: 'bitcoin',       sym: 'BTC',   name: 'Bitcoin' },
  { id: 'solana',        sym: 'SOL',   name: 'Solana' },
  { id: 'matic-network', sym: 'MATIC', name: 'Polygon' },
  { id: 'usdc',          sym: 'USDC',  name: 'USD Coin', fixed: { usd: 1, usd_24h_change: 0 } },
  { id: 'usdt',          sym: 'USDT',  name: 'Tether',   fixed: { usd: 1, usd_24h_change: 0 } },
]

function PriceTicker({ prices }: { prices: Prices }) {
  const items = COINS.map(c => {
    const live = prices[c.id]
    const liveValid = !!live && typeof live.usd === 'number' && live.usd > 0
    const data = c.fixed ?? (liveValid ? live : (INITIAL_PRICES[c.id] ?? { usd: 0, usd_24h_change: 0 }))
    return { ...c, data }
  })

  const renderItem = (item: (typeof items)[0], i: number) => {
    const usd = typeof item.data?.usd === 'number' ? item.data.usd : 0
    const change = typeof item.data?.usd_24h_change === 'number' ? item.data.usd_24h_change : 0
    const pos = change >= 0
    return (
      <span key={`${item.sym}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, margin: '0 26px', whiteSpace: 'nowrap', userSelect: 'none' }}>
        <span style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--ink)' }}>{item.sym}</span>
        <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-sub)' }}>
          ${usd >= 1000 ? usd.toLocaleString('en', { maximumFractionDigits: 0 }) : usd.toFixed(usd < 1 ? 4 : 2)}
        </span>
        {change !== 0 && (
          <span style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', color: pos ? 'var(--accent)' : 'var(--red)' }}>
            {pos ? '↑' : '↓'}{Math.abs(change).toFixed(1)}%
          </span>
        )}
        <span style={{ color: 'var(--text-faint)' }}>·</span>
      </span>
    )
  }

  const double = [...items, ...items]
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden', position: 'relative' }} className="py-3.5">
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(to right, var(--surface), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 90, background: 'linear-gradient(to left, var(--surface), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', width: 'max-content', animation: 'ticker 55s linear infinite' }}>
        {double.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  )
}

/* ───────────────────────── Checkout mockup ───────────────────────── */

function CheckoutMockup({ ethPrice }: { ethPrice: number }) {
  const [tab, setTab] = useState<'card' | 'crypto'>('card')
  const [copied, setCopied] = useState(false)
  const addr = '0x4aC2…3f81'
  const ethAmt = ethPrice ? (49 / ethPrice).toFixed(5) : '0.01511'

  return (
    <div className="checkout-mockup animate-float" style={{ width: 340, flexShrink: 0 }}>
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: 9 }}>
            <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 19V5l6 8 6-8v14" stroke="#F4F2EC" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em' }}>Markuce</span>
          </div>
          <span className="badge badge-accent" style={{ fontSize: 10.5, padding: '4px 9px' }}>
            <span className="live-dot" style={{ width: 5, height: 5 }} />Chainlink
          </span>
        </div>
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total due</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em' }}>
            $49.<span style={{ color: 'var(--text-muted)', fontSize: 22 }}>00</span>
          </p>
          <p style={{ fontSize: 12.5, color: 'var(--text-sub)' }}>Pro Plan · billed monthly</p>
        </div>
      </div>

      <div style={{ padding: '12px 20px 0', display: 'flex', gap: 6 }}>
        {(['card', 'crypto'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`tab ${tab === t ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: 6, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
            {t === 'card' ? <CreditCard size={13} /> : <Coins size={13} />}
            {t === 'card' ? 'Card' : 'Crypto'}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 20px 20px' }}>
        {tab === 'card' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: 'var(--elevated)', border: '1px solid var(--border-strong)', borderRadius: 9, padding: '12px 14px', fontSize: 13.5, color: 'var(--text-sub)', fontFamily: 'var(--font-mono)' }}>
              4242 4242 4242 <span className="shimmer-bg" style={{ display: 'inline-block', width: 38, height: 12, borderRadius: 3, verticalAlign: 'middle' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ background: 'var(--elevated)', border: '1px solid var(--border-strong)', borderRadius: 9, padding: '12px 14px', fontSize: 13.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>MM / YY</div>
              <div style={{ background: 'var(--elevated)', border: '1px solid var(--border-strong)', borderRadius: 9, padding: '12px 14px', fontSize: 13.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CVC</div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>Pay $49.00 <ArrowRight size={15} /></button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['ETH', 'USDC', 'MATIC'].map((sym, i) => (
                <div key={sym} style={{
                  flex: 1, padding: '8px 0', borderRadius: 8, fontSize: 11.5, textAlign: 'center', fontFamily: 'var(--font-mono)',
                  background: i === 0 ? 'var(--accent-dim)' : 'var(--elevated)',
                  border: `1px solid ${i === 0 ? 'rgba(14,122,95,0.28)' : 'var(--border)'}`,
                  color: i === 0 ? 'var(--accent-deep)' : 'var(--text-muted)',
                }}>{sym}</div>
              ))}
            </div>
            <div style={{ background: 'var(--elevated)', border: '1px solid var(--border-strong)', borderRadius: 10, padding: '13px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Send exactly</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, color: 'var(--ink)' }}>
                    {ethAmt} <span style={{ color: 'var(--text-sub)', fontSize: 12 }}>ETH</span>
                  </p>
                </div>
                <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1600) }}
                  style={{ padding: '7px 11px', background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 8, cursor: 'pointer', color: copied ? 'var(--accent)' : 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontFamily: 'var(--font-sans)' }}>
                  {copied ? <><CheckCheck size={12} />Copied</> : <><Copy size={12} />Copy</>}
                </button>
              </div>
              <div style={{ marginTop: 9, paddingTop: 9, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11.5, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{addr}</span>
                <span style={{ fontSize: 10.5, color: 'var(--accent-deep)' }}>Chainlink™ rate</span>
              </div>
            </div>
            <p style={{ fontSize: 10.5, color: 'var(--text-muted)', textAlign: 'center' }}>±2% tolerance · auto-confirmed · non-custodial</p>
          </div>
        )}
      </div>

      <div style={{ padding: '11px 20px 14px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Lock size={11} color="var(--text-muted)" />
        <span style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Secured by Markuce</span>
      </div>
    </div>
  )
}

/* ───────────────────────── Scroll reveal ───────────────────────── */

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ───────────────────────── Animated counter ───────────────────────── */

function AnimatedCounter({ to, prefix = '', suffix = '', decimals = 0, duration = 1600 }: {
  to: number; prefix?: string; suffix?: string; decimals?: number; duration?: number
}) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = Date.now()
        const tick = () => {
          const p = Math.min((Date.now() - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setVal(eased * to)
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  const shown = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString()
  return <span ref={ref}>{prefix}{shown}{suffix}</span>
}

/* ───────────────────────── Typing terminal ───────────────────────── */

const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'comment', v: '// Install the SDK' }] },
  { indent: 0, tokens: [{ t: 'punc', v: '$ ' }, { t: 'var', v: 'npm install @markuce/sdk' }] },
  { indent: 0, tokens: [] as { t: string; v: string }[] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'import' }, { t: 'var', v: ' { Markuce } ' }, { t: 'keyword', v: 'from' }, { t: 'string', v: " '@markuce/sdk'" }] },
  { indent: 0, tokens: [] as { t: string; v: string }[] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'var', v: 'markuce' }, { t: 'punc', v: ' = ' }, { t: 'keyword', v: 'new ' }, { t: 'fn', v: 'Markuce' }, { t: 'punc', v: '({ ' }, { t: 'prop', v: 'apiKey' }, { t: 'punc', v: ': ' }, { t: 'keyword', v: 'process' }, { t: 'punc', v: '.env.' }, { t: 'prop', v: 'MARKUCE_KEY' }, { t: 'punc', v: ' })' }] },
  { indent: 0, tokens: [] as { t: string; v: string }[] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'var', v: 'session' }, { t: 'punc', v: ' = ' }, { t: 'keyword', v: 'await ' }, { t: 'var', v: 'markuce' }, { t: 'punc', v: '.' }, { t: 'prop', v: 'checkout' }, { t: 'punc', v: '.' }, { t: 'fn', v: 'create' }, { t: 'punc', v: '({' }] },
  { indent: 2, tokens: [{ t: 'prop', v: 'amount' }, { t: 'punc', v: ': ' }, { t: 'number', v: '4900' }, { t: 'punc', v: ',' }, { t: 'comment', v: '   // $49.00' }] },
  { indent: 2, tokens: [{ t: 'prop', v: 'currency' }, { t: 'punc', v: ': ' }, { t: 'string', v: "'usd'" }, { t: 'punc', v: ',' }] },
  { indent: 2, tokens: [{ t: 'prop', v: 'redirect_url' }, { t: 'punc', v: ': ' }, { t: 'string', v: "'https://app.com/done'" }] },
  { indent: 0, tokens: [{ t: 'punc', v: '})' }] },
  { indent: 0, tokens: [] as { t: string; v: string }[] },
  { indent: 0, tokens: [{ t: 'comment', v: '// → redirect to hosted checkout' }] },
  { indent: 0, tokens: [{ t: 'fn', v: 'redirect' }, { t: 'punc', v: '(' }, { t: 'var', v: 'session' }, { t: 'punc', v: '.' }, { t: 'prop', v: 'url' }, { t: 'punc', v: ')' }] },
]

function Terminal() {
  const [visible, setVisible] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let i = 0
        const t = setInterval(() => { i++; setVisible(i); if (i >= CODE_LINES.length) clearInterval(t) }, 95)
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="terminal">
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: '#FF5F57' }} />
        <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
        <div className="terminal-dot" style={{ background: '#28C840' }} />
        <span style={{ marginLeft: 10, fontSize: 12, color: 'rgba(244,242,236,0.5)', fontFamily: 'var(--font-mono)' }}>checkout.ts</span>
      </div>
      <div style={{ padding: '20px 22px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.8, minHeight: 290 }}>
        {CODE_LINES.slice(0, visible).map((line, idx) => (
          <div key={idx} style={{ paddingLeft: line.indent * 16, display: 'flex' }}>
            <span style={{ color: 'rgba(244,242,236,0.25)', marginRight: 18, fontSize: 11, minWidth: 18, textAlign: 'right', userSelect: 'none' }}>
              {line.tokens.length > 0 ? idx + 1 : ''}
            </span>
            <span>
              {line.tokens.map((tok, ti) => <span key={ti} className={`token-${tok.t}`}>{tok.v}</span>)}
              {idx === visible - 1 && <span style={{ display: 'inline-block', width: 7, height: 14, background: 'var(--accent-bright)', verticalAlign: 'middle', marginLeft: 2, animation: 'blink 1s step-end infinite' }} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────────────────────── Static data ───────────────────────── */

const FEATURES = [
  { icon: Shield,     color: '#0E7A5F', title: 'Merchant of Record', body: 'We are the legal seller. Customers pay Markuce, you receive the net. No LLC, no Stripe account, no bureaucracy.', tag: 'Legal layer included' },
  { icon: Globe,      color: '#38566B', title: '150+ Countries',     body: 'Pakistan, Nigeria, Bangladesh, Indonesia, Vietnam and 145 more. If you can write code, you can sell globally.', tag: 'No country limits' },
  { icon: CreditCard, color: '#B5623A', title: 'Cards + Crypto',     body: 'Stripe Elements for debit and credit cards. ETH, USDC and MATIC for crypto. One unified checkout for every customer.', tag: 'Unified checkout' },
  { icon: Layers,     color: '#9A6B2F', title: 'Chainlink Oracles',  body: 'Crypto prices come from tamper-proof on-chain Chainlink data feeds — not CoinGecko, not a CEX, not our server.', tag: 'On-chain price feeds' },
  { icon: Coins,      color: '#0A5C49', title: 'Non-Custodial',      body: 'Crypto goes straight to your wallet. We never hold your funds, never have access, never ask for custody.', tag: 'Your keys, your crypto' },
  { icon: Webhook,    color: '#6B4A6E', title: 'Dev-First API',      body: 'REST API, HMAC-signed webhooks, typed SDKs and a checkout you embed in ten lines. Docs that do not lie.', tag: 'Integrate in minutes' },
]

const CMP = [
  { feature: 'Pakistan / Nigeria',  markuce: true, stripe: false, paddle: false, lemon: false },
  { feature: 'Bangladesh / Egypt',  markuce: true, stripe: false, paddle: false, lemon: false },
  { feature: 'Crypto payments',     markuce: true, stripe: false, paddle: false, lemon: false },
  { feature: 'Chainlink oracles',   markuce: true, stripe: false, paddle: false, lemon: false },
  { feature: 'Non-custodial',       markuce: true, stripe: false, paddle: false, lemon: false },
  { feature: 'No LLC required',     markuce: true, stripe: false, paddle: false, lemon: true },
  { feature: 'Transparent pricing', markuce: true, stripe: true,  paddle: false, lemon: true },
  { feature: 'Instant setup',       markuce: true, stripe: true,  paddle: false, lemon: true },
]

/* ───────────────────────── Page ───────────────────────── */

export default function Home() {
  useReveal()
  const [prices, setPrices] = useState<Prices>(INITIAL_PRICES)

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,solana,matic-network&vs_currencies=usd&include_24hr_change=true',
          { cache: 'no-store' }
        )
        if (res.ok) setPrices(await res.json() as Prices)
      } catch { /* keep defaults */ }
    }
    fetchPrices()
    const t = setInterval(fetchPrices, 60_000)
    return () => clearInterval(t)
  }, [])

  const ethPrice = (prices.ethereum?.usd && prices.ethereum.usd > 0) ? prices.ethereum.usd : INITIAL_PRICES.ethereum.usd

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="hero-gradient" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 96, overflow: 'hidden' }}>
        <div className="orb orb-primary" style={{ width: 520, height: 520, top: -160, right: -120 }} />
        <div className="orb orb-accent" style={{ width: 360, height: 360, bottom: -120, left: -80 }} />

        <div className="container-site" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 64, alignItems: 'center' }} className="lg:grid-cols-[1.1fr_340px]">
            <div>
              <div style={{ marginBottom: 26 }}>
                <span className="badge badge-primary">
                  <span className="live-dot" />3,200+ merchants live in 150+ countries
                </span>
              </div>

              <h1 style={{ marginBottom: 24 }}>
                Accept payments<br />
                from <span className="serif-accent">everywhere</span><br />
                Stripe won&rsquo;t.
              </h1>

              <p style={{ fontSize: 'clamp(16px, 1.7vw, 19px)', color: 'var(--text-sub)', maxWidth: 540, marginBottom: 36, lineHeight: 1.6 }}>
                The global Merchant of Record for the 150+ countries locked out of traditional
                payment platforms. Cards and crypto in one checkout — no LLC, no Stripe account,
                no gatekeepers.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
                <Link href={`${APP_URL}/register`} className="btn btn-primary" style={{ fontSize: 15.5, padding: '14px 28px' }}>
                  Start for free <ArrowRight size={16} />
                </Link>
                <Link href="/how-it-works" className="btn btn-secondary" style={{ fontSize: 15.5, padding: '14px 26px' }}>
                  See how it works
                </Link>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 30 }}>
                {['3.4% + $0.30 all-inclusive', 'No monthly fees', 'Under 10 min to first sale'].map(label => (
                  <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: 'var(--text-sub)' }}>
                    <Check size={15} color="var(--accent)" strokeWidth={2.6} /> {label}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['🇵🇰 Pakistan', '🇳🇬 Nigeria', '🇧🇩 Bangladesh', '🇮🇩 Indonesia', '🇻🇳 Vietnam', '🇪🇬 Egypt', '+145 more'].map(c => (
                  <span key={c} style={{ padding: '5px 13px', borderRadius: 100, fontSize: 12.5, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-sub)', boxShadow: 'var(--shadow-sm)' }}>{c}</span>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center" style={{ position: 'relative' }}>
              <CheckoutMockup ethPrice={ethPrice} />
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ─────────────────────────────────────────── */}
      <PriceTicker prices={prices} />

      {/* ── STATS ──────────────────────────────────────────── */}
      <section className="section-sm" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }} className="md:grid-cols-4">
            {[
              { node: <AnimatedCounter to={150} suffix="+" />,            label: 'Countries supported', sub: 'vs 46 on Stripe' },
              { node: <AnimatedCounter to={3.4} suffix="%" decimals={1} />, label: 'Flat transaction fee', sub: 'No hidden charges' },
              { node: <AnimatedCounter to={10} suffix=" min" />,          label: 'Time to first sale', sub: 'Average onboarding' },
              { node: <AnimatedCounter to={160} suffix="+" />,            label: 'Payout countries', sub: 'Via Wise network' },
            ].map((s, i) => (
              <div key={s.label} className="reveal" style={{ textAlign: 'center', padding: '32px 22px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', transitionDelay: `${i * 0.08}s` }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--ink)', lineHeight: 1, marginBottom: 8, letterSpacing: '-0.04em' }}>
                  {s.node}
                </p>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 3 }}>{s.label}</p>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container-site">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 60, maxWidth: 680, margin: '0 auto 60px' }}>
            <span className="badge badge-primary" style={{ marginBottom: 18 }}>The problem</span>
            <h2 style={{ marginBottom: 18 }}>Payment infrastructure has a <span className="serif-accent">border problem</span></h2>
            <p style={{ fontSize: 18, color: 'var(--text-sub)' }}>
              Stripe, PayPal, Paddle and LemonSqueezy each support 40–80 countries.
              The other 5.5 billion people just get an error message.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 22 }} className="md:grid-cols-2">
            <div className="card reveal" style={{ transitionDelay: '0.08s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(192,57,43,0.10)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><XIcon size={16} color="var(--red)" /></span>
                <span style={{ fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: 17 }}>Traditional platforms</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {[
                  'Stripe requires a US or EU bank account',
                  'PayPal restricts withdrawals in 100+ countries',
                  'Paddle and LemonSqueezy inherit Stripe’s limits',
                  'No crypto support — fiat only',
                  'Opaque pricing with conversion fees',
                  'Account bans without notice for “high-risk” regions',
                ].map(s => (
                  <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <XIcon size={15} color="var(--red)" style={{ marginTop: 3, flexShrink: 0, opacity: 0.7 }} />
                    <span style={{ fontSize: 14.5, color: 'var(--text-sub)', lineHeight: 1.55 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-glow reveal" style={{ transitionDelay: '0.16s', borderColor: 'rgba(14,122,95,0.28)', background: 'linear-gradient(180deg, var(--accent-tint), var(--surface) 60%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-dim)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Check size={16} color="var(--accent)" strokeWidth={2.6} /></span>
                <span style={{ fontWeight: 600, color: 'var(--accent-deep)', fontFamily: 'var(--font-display)', fontSize: 17 }}>With Markuce</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                {[
                  'We are the legal Merchant of Record — you just connect',
                  '150+ countries with full support, including payout',
                  'Cards (Stripe Elements) + crypto in one checkout',
                  'Chainlink on-chain oracles for tamper-proof prices',
                  'Crypto settles non-custodially to your wallet',
                  'One 3.4% + $0.30 fee, no monthly cost, no surprises',
                ].map(s => (
                  <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Check size={15} color="var(--accent)" strokeWidth={2.6} style={{ marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.55 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="badge badge-primary" style={{ marginBottom: 18 }}>What you get</span>
            <h2>Everything you need.<br /><span className="serif-accent">Nothing you don&rsquo;t.</span></h2>
          </div>

          <div style={{ display: 'grid', gap: 20 }} className="md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, color, title, body, tag }, i) => (
              <div key={title} className="card card-glow reveal" style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: `${color}14`, border: `1px solid ${color}2E`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={21} color={color} strokeWidth={2} />
                </div>
                <h3 style={{ fontSize: 18.5, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: 16 }}>{body}</p>
                <span style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', color, background: `${color}12`, border: `1px solid ${color}26`, padding: '4px 11px', borderRadius: 100 }}>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPER ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gap: 56, alignItems: 'center' }} className="lg:grid-cols-2">
            <div className="reveal">
              <span className="badge badge-primary" style={{ marginBottom: 20 }}>Developer experience</span>
              <h2 style={{ marginBottom: 18 }}>Integrate in <span className="serif-accent">under an hour</span></h2>
              <p style={{ fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.65, marginBottom: 30 }}>
                Clean SDK, typed responses and webhooks that actually fire. Create a checkout
                session, redirect your customer, done. We handle cards, crypto, Chainlink and verification.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'REST API', desc: 'JSON over HTTPS, predictable error codes' },
                  { label: 'HMAC webhooks', desc: 'Signed with your secret, verifiable in one line' },
                  { label: 'TypeScript SDK', desc: 'Full type safety, autocomplete everywhere' },
                ].map(({ label, desc }) => (
                  <div key={label} style={{ display: 'flex', gap: 14 }}>
                    <div style={{ width: 3, borderRadius: 4, background: 'var(--accent)', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{label}</p>
                      <p style={{ fontSize: 13.5, color: 'var(--text-sub)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/developers" className="btn btn-secondary" style={{ marginTop: 30 }}>
                View documentation <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="reveal" style={{ transitionDelay: '0.12s' }}>
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ─────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container-site">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-primary" style={{ marginBottom: 18 }}>Why Markuce</span>
            <h2>The only platform that <span className="serif-accent">opens every door</span></h2>
          </div>
          <div className="reveal" style={{ overflowX: 'auto' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              <table className="feature-table" style={{ minWidth: 620 }}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th style={{ color: 'var(--accent-deep)' }}>Markuce</th>
                    <th>Stripe</th><th>Paddle</th><th>LemonSqueezy</th>
                  </tr>
                </thead>
                <tbody>
                  {CMP.map(row => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      {[row.markuce, row.stripe, row.paddle, row.lemon].map((v, i) => (
                        <td key={i} style={{ textAlign: 'center' }}>
                          {v ? <Check size={17} color={i === 0 ? 'var(--accent)' : 'var(--text-muted)'} strokeWidth={2.4} />
                             : <XIcon size={16} color="var(--text-faint)" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────── */}
      <section className="section" id="pricing" style={{ background: 'var(--bg-2)' }}>
        <div className="container-narrow">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="badge badge-primary" style={{ marginBottom: 18 }}>Pricing</span>
            <h2>One plan. <span className="serif-accent">Zero surprises.</span></h2>
            <p style={{ fontSize: 18, color: 'var(--text-sub)', marginTop: 14 }}>No monthly fees. No setup costs. Pay only when you earn.</p>
          </div>

          <div className="reveal card" style={{ padding: 0, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ height: 4, background: 'linear-gradient(to right, var(--accent), var(--accent-deep))' }} />
            <div style={{ padding: '40px 44px' }}>
              <div style={{ display: 'grid', gap: 44 }} className="md:grid-cols-2">
                <div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 700, lineHeight: 1, color: 'var(--ink)', letterSpacing: '-0.05em' }}>3.4%</span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', marginTop: 8, marginBottom: 6 }}>+ $0.30 per transaction</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 28 }}>
                    All-inclusive. Card processing, crypto settlement, oracle fees and webhooks — one number.
                  </p>
                  <Link href={`${APP_URL}/register`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 0' }}>
                    Start for free <ArrowRight size={16} />
                  </Link>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, textAlign: 'center' }}>No credit card required</p>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 18 }}>Everything included</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                      'Cards via Stripe Elements',
                      'ETH, USDC and MATIC payments',
                      'Chainlink on-chain price oracles',
                      'Non-custodial crypto settlement',
                      'Signed webhooks with retry',
                      'Dashboard + revenue analytics',
                      'REST API + TypeScript SDK',
                      'Wise payouts to 160+ countries',
                    ].map(f => (
                      <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <Check size={15} color="var(--accent)" strokeWidth={2.6} />
                        <span style={{ fontSize: 14.5, color: 'var(--text)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="reveal" style={{ textAlign: 'center', marginTop: 22 }}>
            <Link href="/pricing" style={{ fontSize: 14, color: 'var(--accent-deep)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              See the full pricing breakdown <ArrowUpRight size={14} />
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA (ink) ──────────────────────────────────────── */}
      <section className="section-ink" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="orb orb-primary" style={{ width: 460, height: 460, bottom: -200, left: '50%', transform: 'translateX(-50%)', opacity: 0.35 }} />
        <div className="container-narrow" style={{ position: 'relative', zIndex: 2, textAlign: 'center', paddingTop: 104, paddingBottom: 104 }}>
          <span className="badge badge-live" style={{ marginBottom: 24 }}>
            <span className="live-dot" />Open for signups
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', marginBottom: 18 }}>
            Start selling <span className="serif-accent" style={{ color: 'var(--accent-bright)' }}>globally</span> today.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--on-ink-sub)', maxWidth: 480, margin: '0 auto 36px' }}>
            No LLC. No Stripe account. No gatekeepers. Just you, your product, and 4 billion new customers.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`${APP_URL}/register`} className="btn btn-primary" style={{ fontSize: 15.5, padding: '14px 32px' }}>
              Create free account <ArrowRight size={16} />
            </Link>
            <Link href="/how-it-works" className="btn btn-secondary" style={{ fontSize: 15.5, padding: '14px 28px' }}>
              See how it works
            </Link>
          </div>
          <p style={{ marginTop: 26, fontSize: 13, color: 'var(--on-ink-sub)' }}>
            Built by{' '}
            <Link href="https://symbiothus.vercel.app/" target="_blank" style={{ color: 'var(--accent-bright)', textDecoration: 'none' }}>
              Symbiothus ↗
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
