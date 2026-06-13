'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import {
  Zap, Globe, Shield, Code2, ArrowRight, Check, X as XIcon,
  Copy, CheckCheck, ChevronDown, ExternalLink, TrendingUp, TrendingDown,
  CreditCard, Bitcoin, Coins, Lock, Layers, Webhook,
} from 'lucide-react'
import dynamic from 'next/dynamic'

const NetworkCanvas = dynamic(() => import('@/components/NetworkCanvas'), { ssr: false })

/* ─────────────────────────────────────────────────────── */
/* LIVE PRICE TICKER                                       */
/* ─────────────────────────────────────────────────────── */

interface CoinData { usd: number; usd_24h_change: number }
type Prices = Record<string, CoinData>

const INITIAL_PRICES: Prices = {
  ethereum:       { usd: 3241.80, usd_24h_change: 2.14 },
  bitcoin:        { usd: 67_450,  usd_24h_change: 0.78 },
  solana:         { usd: 148.32,  usd_24h_change: -0.55 },
  'matic-network':{ usd: 0.89,    usd_24h_change: 1.32 },
}

const COINS = [
  { id: 'ethereum',        sym: 'ETH',   icon: '⬡', name: 'Ethereum' },
  { id: 'bitcoin',         sym: 'BTC',   icon: '₿', name: 'Bitcoin'  },
  { id: 'solana',          sym: 'SOL',   icon: '◎', name: 'Solana'   },
  { id: 'matic-network',   sym: 'MATIC', icon: '⬟', name: 'Polygon'  },
  { id: 'usdc',            sym: 'USDC',  icon: '$', name: 'USD Coin', fixed: { usd: 1, usd_24h_change: 0 } },
  { id: 'usdt',            sym: 'USDT',  icon: '$', name: 'Tether',   fixed: { usd: 1, usd_24h_change: 0 } },
]

function PriceTicker({ prices }: { prices: Prices }) {
  const items = COINS.map(c => ({
    ...c,
    data: c.fixed ?? prices[c.id] ?? INITIAL_PRICES[c.id] ?? { usd: 0, usd_24h_change: 0 },
  }))

  const renderItem = (item: (typeof items)[0], i: number) => {
    const usd = typeof item.data?.usd === 'number' ? item.data.usd : 0
    const change = typeof item.data?.usd_24h_change === 'number' ? item.data.usd_24h_change : 0
    const pos = change >= 0
    return (
      <span key={`${item.sym}-${i}`} className="inline-flex items-center gap-2.5 mx-8 whitespace-nowrap select-none">
        <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{item.icon}</span>
        <span style={{ fontSize: '13px', fontWeight: 500, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{item.sym}</span>
        <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-sub)' }}>
          ${usd >= 1000 ? usd.toLocaleString('en', { maximumFractionDigits: 0 }) : usd.toFixed(usd < 1 ? 4 : 2)}
        </span>
        {change !== 0 && (
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: pos ? 'var(--accent)' : '#EF4444' }}>
            {pos ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
          </span>
        )}
        <span style={{ color: 'var(--text-muted)', opacity: 0.3 }}>·</span>
      </span>
    )
  }

  const double = [...items, ...items]

  return (
    <div
      style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden', position: 'relative' }}
      className="py-3"
    >
      {/* fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, var(--surface), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, var(--surface), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'ticker 50s linear infinite',
        }}
      >
        {double.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────── */
/* CHECKOUT MOCKUP (animated, floats in hero)              */
/* ─────────────────────────────────────────────────────── */

function CheckoutMockup({ ethPrice }: { ethPrice: number }) {
  const [tab, setTab] = useState<'card' | 'crypto'>('card')
  const [copied, setCopied] = useState(false)
  const addr = '0x4aC...3f81'
  const ethAmt = ethPrice ? (49 / ethPrice).toFixed(5) : '0.01511'

  const copy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="checkout-mockup animate-float"
      style={{ width: 320, flexShrink: 0 }}
    >
      {/* Header */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={14} color="white" fill="white" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
              Markuce
            </span>
          </div>
          <span className="badge badge-live" style={{ fontSize: 10 }}>
            <span className="live-dot" style={{ width: 5, height: 5 }} />
            Chainlink
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Due today</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>
            $49.<span style={{ color: 'var(--text-sub)', fontSize: 20 }}>00</span>
          </p>
          <p style={{ fontSize: 12, color: 'var(--text-sub)' }}>Pro Plan · monthly</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '12px 20px 0', display: 'flex', gap: 6 }}>
        {(['card', 'crypto'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="tab"
            style={{
              background: tab === t ? 'var(--primary-dim)' : 'transparent',
              color: tab === t ? 'var(--primary-bright)' : 'var(--text-muted)',
              border: `1px solid ${tab === t ? 'rgba(88,101,242,0.25)' : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {t === 'card' ? <CreditCard size={12} /> : <Bitcoin size={12} />}
            {t === 'card' ? 'Card' : 'Crypto'}
          </button>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: '16px 20px 20px' }}>
        {tab === 'card' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: 'var(--elevated)', border: '1px solid var(--border)', borderRadius: 7, padding: '10px 14px', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span>4242 4242 4242 </span>
              <span className="shimmer-bg" style={{ display: 'inline-block', width: 40, height: 12, borderRadius: 3, verticalAlign: 'middle' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div style={{ background: 'var(--elevated)', border: '1px solid var(--border)', borderRadius: 7, padding: '10px 14px', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                MM/YY
              </div>
              <div style={{ background: 'var(--elevated)', border: '1px solid var(--border)', borderRadius: 7, padding: '10px 14px', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                CVC
              </div>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
            >
              Pay $49.00 <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Network selector */}
            <div style={{ display: 'flex', gap: 6 }}>
              {['ETH', 'USDC', 'MATIC'].map((sym, i) => (
                <button
                  key={sym}
                  style={{
                    flex: 1,
                    padding: '7px 0',
                    borderRadius: 6,
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    background: i === 0 ? 'var(--primary-dim)' : 'var(--elevated)',
                    border: `1px solid ${i === 0 ? 'rgba(88,101,242,0.3)' : 'var(--border)'}`,
                    color: i === 0 ? 'var(--primary-bright)' : 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  {sym}
                </button>
              ))}
            </div>
            {/* Amount */}
            <div style={{ background: 'var(--elevated)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Send exactly</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600, color: 'var(--text)' }}>
                    {ethAmt} <span style={{ color: 'var(--text-sub)', fontSize: 12 }}>ETH</span>
                  </p>
                </div>
                <button
                  onClick={copy}
                  style={{ padding: '6px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, cursor: 'pointer', color: copied ? 'var(--accent)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontFamily: 'Inter, sans-serif' }}
                >
                  {copied ? <><CheckCheck size={11} />Copied</> : <><Copy size={11} />Copy</>}
                </button>
              </div>
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{addr}</span>
                <span style={{ fontSize: 10, color: 'var(--accent)' }}>Chainlink™</span>
              </div>
            </div>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>
              ±2% tolerance · Auto-confirmed · Non-custodial
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 20px 14px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
        <Lock size={10} color="var(--text-muted)" />
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Secured by Markuce</span>
        <Shield size={10} color="var(--text-muted)" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────── */
/* SCROLL REVEAL HOOK                                      */
/* ─────────────────────────────────────────────────────── */

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

/* ─────────────────────────────────────────────────────── */
/* ANIMATED COUNTER                                        */
/* ─────────────────────────────────────────────────────── */

function AnimatedCounter({ to, prefix = '', suffix = '', duration = 1800 }: {
  to: number; prefix?: string; suffix?: string; duration?: number
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
          const elapsed = Date.now() - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setVal(Math.round(eased * to))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────────────── */
/* TYPING TERMINAL                                         */
/* ─────────────────────────────────────────────────────── */

const CODE_LINES = [
  { indent: 0, tokens: [{ t: 'comment', v: '// Install the SDK' }] },
  { indent: 0, tokens: [{ t: 'punc', v: '$ ' }, { t: 'var', v: 'npm install @markuce/sdk' }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'import' }, { t: 'var', v: ' { Markuce } ' }, { t: 'keyword', v: 'from' }, { t: 'string', v: " '@markuce/sdk'" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'var', v: 'client' }, { t: 'punc', v: ' = ' }, { t: 'keyword', v: 'new ' }, { t: 'fn', v: 'Markuce' }, { t: 'punc', v: '({ ' }, { t: 'prop', v: 'apiKey' }, { t: 'punc', v: ': ' }, { t: 'keyword', v: 'process' }, { t: 'punc', v: '.env.' }, { t: 'prop', v: 'MARKUCE_KEY' }, { t: 'punc', v: ' })' }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'var', v: 'session' }, { t: 'punc', v: ' = ' }, { t: 'keyword', v: 'await ' }, { t: 'var', v: 'client' }, { t: 'punc', v: '.' }, { t: 'prop', v: 'checkout' }, { t: 'punc', v: '.' }, { t: 'fn', v: 'create' }, { t: 'punc', v: '({' }] },
  { indent: 2, tokens: [{ t: 'prop', v: 'amount' }, { t: 'punc', v: ': ' }, { t: 'number', v: '4900' }, { t: 'punc', v: ',' }, { t: 'comment', v: '   // $49.00 in cents' }] },
  { indent: 2, tokens: [{ t: 'prop', v: 'currency' }, { t: 'punc', v: ': ' }, { t: 'string', v: "'usd'" }, { t: 'punc', v: ',' }] },
  { indent: 2, tokens: [{ t: 'prop', v: 'redirect_url' }, { t: 'punc', v: ': ' }, { t: 'string', v: "'https://yourapp.com/success'" }] },
  { indent: 0, tokens: [{ t: 'punc', v: '})' }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: 'comment', v: '// Redirect customer to hosted checkout' }] },
  { indent: 0, tokens: [{ t: 'fn', v: 'redirect' }, { t: 'punc', v: '(' }, { t: 'var', v: 'session' }, { t: 'punc', v: '.' }, { t: 'prop', v: 'checkout_url' }, { t: 'punc', v: ')' }] },
]

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let i = 0
        const interval = setInterval(() => {
          i++
          setVisibleLines(i)
          if (i >= CODE_LINES.length) clearInterval(interval)
        }, 90)
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
        <span style={{ marginLeft: 12, fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          payment-integration.ts
        </span>
      </div>
      <div style={{ padding: '20px 24px', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.75, minHeight: 280 }}>
        {CODE_LINES.slice(0, visibleLines).map((line, idx) => (
          <div key={idx} style={{ paddingLeft: line.indent * 16, display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-muted)', marginRight: 20, fontSize: 11, minWidth: 20, textAlign: 'right', userSelect: 'none' }}>
              {line.tokens.length > 0 ? idx + 1 : ''}
            </span>
            <span>
              {line.tokens.map((tok, ti) => (
                <span key={ti} className={`token-${tok.t}`}>{tok.v}</span>
              ))}
              {idx === visibleLines - 1 && (
                <span style={{ display: 'inline-block', width: 8, height: 14, background: 'var(--accent)', verticalAlign: 'middle', marginLeft: 1, animation: 'blink 1s step-end infinite' }} />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────── */
/* FEATURE CARDS                                           */
/* ─────────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: Shield,
    color: 'var(--primary)',
    colorDim: 'var(--primary-dim)',
    title: 'Merchant of Record',
    body: 'We are the legal seller. Your customers pay Markuce, you receive the net. No LLC, no Stripe account, no bureaucratic nightmare.',
    tag: 'Legal layer included',
  },
  {
    icon: Globe,
    color: 'var(--accent)',
    colorDim: 'var(--accent-dim)',
    title: '150+ Countries',
    body: 'Pakistan, Nigeria, Bangladesh, Indonesia, Vietnam, and 145 more. If you can write code, you can sell globally.',
    tag: 'No country restrictions',
  },
  {
    icon: CreditCard,
    color: '#A78BFA',
    colorDim: 'rgba(167,139,250,0.1)',
    title: 'Cards + Crypto',
    body: 'Stripe Elements for debit/credit cards. ETH, USDC, MATIC for crypto. One unified checkout, every customer covered.',
    tag: 'Unified checkout',
  },
  {
    icon: Layers,
    color: '#F59E0B',
    colorDim: 'rgba(245,158,11,0.1)',
    title: 'Chainlink Oracles',
    body: 'Crypto prices come from tamper-proof on-chain Chainlink Data Feeds — not CoinGecko, not a CEX, not anyone\'s server.',
    tag: 'On-chain price feeds',
  },
  {
    icon: Coins,
    color: '#22C55E',
    colorDim: 'rgba(34,197,94,0.1)',
    title: 'Non-Custodial',
    body: 'Crypto goes straight to your wallet. We never hold your funds, never have access, never ask for custody.',
    tag: 'Your keys, your crypto',
  },
  {
    icon: Webhook,
    color: '#EC4899',
    colorDim: 'rgba(236,72,153,0.1)',
    title: 'Dev-First API',
    body: 'REST API, HMAC-signed webhooks, typed SDKs, and a checkout you can embed in 10 lines. Documentation that doesn\'t lie.',
    tag: 'Integrate in minutes',
  },
]

/* ─────────────────────────────────────────────────────── */
/* COMPARISON TABLE DATA                                   */
/* ─────────────────────────────────────────────────────── */

const CMP = [
  { feature: 'Pakistan / Nigeria', markuce: true,  stripe: false, paddle: false, lemon: false },
  { feature: 'Bangladesh / Egypt', markuce: true,  stripe: false, paddle: false, lemon: false },
  { feature: 'Crypto payments',    markuce: true,  stripe: false, paddle: false, lemon: false },
  { feature: 'Chainlink oracles',  markuce: true,  stripe: false, paddle: false, lemon: false },
  { feature: 'Non-custodial',      markuce: true,  stripe: false, paddle: false, lemon: false },
  { feature: 'No LLC required',    markuce: true,  stripe: false, paddle: false, lemon: true  },
  { feature: 'Transparent pricing',markuce: true,  stripe: true,  paddle: false, lemon: true  },
  { feature: 'Instant setup',      markuce: true,  stripe: true,  paddle: false, lemon: true  },
]

/* ─────────────────────────────────────────────────────── */
/* PAGE                                                    */
/* ─────────────────────────────────────────────────────── */

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
        if (res.ok) {
          const data = await res.json() as Prices
          setPrices(data)
        }
      } catch { /* keep defaults */ }
    }
    fetchPrices()
    const t = setInterval(fetchPrices, 60_000)
    return () => clearInterval(t)
  }, [])

  const ethPrice = prices.ethereum?.usd ?? INITIAL_PRICES.ethereum.usd

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="grid-bg hero-gradient relative"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80, overflow: 'hidden' }}
      >
        {/* Canvas */}
        <div className="absolute inset-0">
          <NetworkCanvas />
        </div>

        {/* Orbs */}
        <div className="orb orb-primary" style={{ width: 600, height: 600, top: -200, left: -150, opacity: 0.35 }} />
        <div className="orb orb-accent"  style={{ width: 400, height: 400, top: '30%', right: -100, opacity: 0.2, animationDelay: '3s' }} />

        <div className="container-site relative" style={{ zIndex: 10, width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 64, alignItems: 'center' }}
            className="lg:grid-cols-[1fr_320px]"
          >
            {/* Left */}
            <div>
              {/* Badge */}
              <div style={{ marginBottom: 28 }}>
                <span className="badge badge-live" style={{ gap: 8 }}>
                  <span className="live-dot" />
                  3,200+ merchants live globally
                </span>
              </div>

              {/* Headline */}
              <h1
                style={{
                  marginBottom: 24,
                  lineHeight: 1.08,
                  letterSpacing: '-0.03em',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                Accept payments<br />
                from{' '}
                <span className="gradient-text">everywhere</span>
                <br />
                Stripe won't.
              </h1>

              <p
                style={{
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  color: 'var(--text-sub)',
                  maxWidth: 560,
                  marginBottom: 40,
                  lineHeight: 1.65,
                }}
              >
                The global Merchant of Record for the 150+ countries locked out of
                traditional payment platforms. Cards and crypto in one checkout —
                no LLC, no Stripe account, no gatekeepers.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 40 }}>
                <Link href="https://app.markuce.com/register" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
                  Start for free <ArrowRight size={16} />
                </Link>
                <Link href="/how-it-works" className="btn btn-secondary" style={{ fontSize: 16, padding: '14px 32px' }}>
                  See how it works
                </Link>
              </div>

              {/* Trust strip */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
                {[
                  { icon: <Check size={14} color="var(--accent)" />, label: '3.4% + $0.30 · all-inclusive' },
                  { icon: <Check size={14} color="var(--accent)" />, label: 'No monthly fees' },
                  { icon: <Check size={14} color="var(--accent)" />, label: 'Under 10 min to first sale' },
                ].map(({ icon, label }) => (
                  <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}>
                    {icon} {label}
                  </span>
                ))}
              </div>

              {/* Country pills */}
              <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['🇵🇰 Pakistan', '🇳🇬 Nigeria', '🇧🇩 Bangladesh', '🇮🇩 Indonesia', '🇻🇳 Vietnam', '🇪🇬 Egypt', '+145 more'].map(c => (
                  <span
                    key={c}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 100,
                      fontSize: 12,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-sub)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: checkout mockup */}
            <div
              className="hidden lg:flex justify-center"
              style={{ position: 'relative' }}
            >
              <CheckoutMockup ethPrice={ethPrice} />
              {/* Glow behind card */}
              <div style={{ position: 'absolute', inset: -40, background: 'radial-gradient(ellipse at center, rgba(88,101,242,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────── */}
      <PriceTicker prices={prices} />

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="section-sm" style={{ background: 'var(--base)' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}
            className="md:grid-cols-4"
          >
            {[
              { n: 150, suf: '+', label: 'Countries supported', sub: 'vs 46 on Stripe' },
              { n: 3.4, suf: '%', label: 'Flat transaction fee', sub: 'No hidden charges', fmt: true },
              { n: 10,  suf: 'min', label: 'Time to first sale', sub: 'Average onboarding' },
              { n: 160, suf: '+', label: 'Payout countries', sub: 'Via Wise bank network' },
            ].map(({ n, suf, label, sub, fmt }, i) => (
              <div
                key={label}
                className="reveal"
                style={{
                  textAlign: 'center',
                  padding: '40px 24px',
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: 'var(--text)',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  <AnimatedCounter to={fmt ? n * 10 : n} suffix={suf} />
                  {fmt && <span style={{ fontSize: '0.6em', color: 'var(--text-sub)' }}></span>}
                </p>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ──────────────────────────────── */}
      <section className="section grid-bg" style={{ background: 'var(--void)' }}>
        <div className="container-site">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="badge badge-primary" style={{ marginBottom: 16 }}>The problem</span>
            <h2 style={{ marginBottom: 20 }}>
              The world's payment<br />infrastructure has a <span className="gradient-text">border problem</span>
            </h2>
            <p style={{ fontSize: 18, color: 'var(--text-sub)', maxWidth: 600, margin: '0 auto' }}>
              Stripe, PayPal, Paddle, and LemonSqueezy each support 40–80 countries.
              The other 5.5 billion people just get an error message.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 24 }} className="md:grid-cols-2">
            {/* Without Markuce */}
            <div className="card reveal" style={{ borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.03)', transitionDelay: '0.1s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <XIcon size={18} color="#EF4444" />
                <span style={{ fontWeight: 600, color: '#EF4444', fontFamily: 'Syne, sans-serif', fontSize: 16 }}>Traditional platforms</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Stripe requires a US/EU bank account',
                  'PayPal available in ~200 countries but withdrawals restricted in 100+',
                  'Paddle and LemonSqueezy inherit Stripe restrictions',
                  'No crypto support — fiat only',
                  'Opaque pricing with currency conversion fees',
                  'Account bans without notice for "high-risk" regions',
                ].map(s => (
                  <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <XIcon size={14} color="#EF4444" style={{ marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: 'var(--text-sub)', lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* With Markuce */}
            <div className="card card-glow reveal" style={{ borderColor: 'rgba(0,201,167,0.2)', background: 'rgba(0,201,167,0.03)', transitionDelay: '0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Check size={18} color="var(--accent)" />
                <span style={{ fontWeight: 600, color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontSize: 16 }}>With Markuce</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'We are the legal Merchant of Record — you just connect',
                  '150+ countries with full support, including payout',
                  'Cards (Stripe Elements) + crypto in one checkout',
                  'Chainlink on-chain oracles for tamper-proof crypto prices',
                  'Crypto goes non-custodially to your wallet',
                  'Single 3.4% + $0.30 fee, no monthly cost, no surprises',
                ].map(s => (
                  <div key={s} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Check size={14} color="var(--accent)" style={{ marginTop: 3, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: 'var(--text-sub)', lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--base)' }}>
        <div className="container-site">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="badge badge-accent" style={{ marginBottom: 16 }}>Features</span>
            <h2>Everything you need.<br /><span className="gradient-text">Nothing you don't.</span></h2>
          </div>

          <div style={{ display: 'grid', gap: 20 }} className="md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, color, colorDim, title, body, tag }, i) => (
              <div
                key={title}
                className="card card-glow reveal"
                style={{ transitionDelay: `${i * 0.08}s`, position: 'relative', overflow: 'hidden' }}
              >
                {/* Glow top-right */}
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`, pointerEvents: 'none' }} />

                <div style={{ width: 44, height: 44, borderRadius: 12, background: colorDim, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={20} color={color} />
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 10, fontFamily: 'Syne, sans-serif' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-sub)', lineHeight: 1.65, marginBottom: 16 }}>{body}</p>
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    color,
                    background: colorDim,
                    border: `1px solid ${color}33`,
                    padding: '3px 10px',
                    borderRadius: 100,
                    display: 'inline-block',
                  }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CODE TERMINAL ────────────────────────────────── */}
      <section className="section grid-bg" style={{ background: 'var(--void)' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gap: 56, alignItems: 'center' }} className="lg:grid-cols-2">
            <div className="reveal">
              <span className="badge badge-primary" style={{ marginBottom: 20 }}>Developer experience</span>
              <h2 style={{ marginBottom: 20 }}>
                Integrate in<br /><span className="gradient-text">under an hour</span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: 32 }}>
                Clean SDK, typed responses, and webhooks that actually work.
                Create a checkout session, redirect your customer, done.
                We handle the rest — cards, crypto, Chainlink, verification.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'REST API', desc: 'JSON over HTTPS, predictable error codes' },
                  { label: 'HMAC Webhooks', desc: 'Signed with your secret, verifiable in one line' },
                  { label: 'TypeScript SDK', desc: 'Full type safety, autocomplete everywhere' },
                ].map(({ label, desc }) => (
                  <div key={label} style={{ display: 'flex', gap: 14 }}>
                    <div style={{ width: 4, borderRadius: 4, background: 'linear-gradient(to bottom, var(--primary), var(--accent))', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{label}</p>
                      <p style={{ fontSize: 13, color: 'var(--text-sub)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/developers" className="btn btn-secondary" style={{ marginTop: 32 }}>
                View docs <ExternalLink size={14} />
              </Link>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.15s' }}>
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────── */}
      <section className="section" style={{ background: 'var(--base)' }}>
        <div className="container-site">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="badge badge-primary" style={{ marginBottom: 16 }}>Why Markuce</span>
            <h2>
              The only platform that<br />
              <span className="gradient-text">opens all doors</span>
            </h2>
          </div>

          <div className="reveal" style={{ overflowX: 'auto' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <table className="feature-table" style={{ minWidth: 600 }}>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th style={{ color: 'var(--accent)' }}>Markuce</th>
                    <th>Stripe</th>
                    <th>Paddle</th>
                    <th>LemonSqueezy</th>
                  </tr>
                </thead>
                <tbody>
                  {CMP.map(row => (
                    <tr key={row.feature}>
                      <td style={{ fontWeight: 500 }}>{row.feature}</td>
                      {[row.markuce, row.stripe, row.paddle, row.lemon].map((v, i) => (
                        <td key={i} style={{ textAlign: 'center' }}>
                          {v
                            ? <Check size={16} color={i === 0 ? 'var(--accent)' : 'var(--text-muted)'} />
                            : <XIcon size={16} color="#EF444488" />
                          }
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

      {/* ── PRICING ──────────────────────────────────────── */}
      <section className="section grid-bg-tight" id="pricing" style={{ background: 'var(--void)' }}>
        <div className="container-narrow">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="badge badge-accent" style={{ marginBottom: 16 }}>Pricing</span>
            <h2>One plan. <span className="gradient-text">Zero surprises.</span></h2>
            <p style={{ fontSize: 18, color: 'var(--text-sub)', marginTop: 16 }}>
              No monthly fees. No setup costs. Pay only when you earn.
            </p>
          </div>

          <div
            className="reveal glow-primary"
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(88,101,242,0.3)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}
          >
            {/* Top gradient bar */}
            <div style={{ height: 4, background: 'linear-gradient(to right, var(--primary), var(--accent))' }} />

            <div style={{ padding: '44px 48px' }}>
              <div style={{ display: 'grid', gap: 48 }} className="md:grid-cols-[1fr_1fr]">
                {/* Left: price */}
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <span
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: 72,
                        fontWeight: 800,
                        lineHeight: 1,
                        background: 'linear-gradient(135deg, var(--text), var(--primary-bright))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      3.4%
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                    + $0.30 per transaction
                  </p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 32 }}>
                    All-inclusive. Card processing, crypto settlement, oracle fees, webhooks — all in one number.
                  </p>
                  <Link href="https://app.markuce.com/register" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 0' }}>
                    Start for free <ArrowRight size={16} />
                  </Link>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, textAlign: 'center' }}>
                    No credit card required to sign up
                  </p>
                </div>

                {/* Right: features */}
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 20 }}>
                    Everything included
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                    {[
                      'Cards via Stripe Elements',
                      'ETH, USDC (Solana), MATIC payments',
                      'Chainlink on-chain price oracles',
                      'Non-custodial crypto settlement',
                      'Signed webhooks with 5-attempt retry',
                      'Dashboard + revenue analytics',
                      'REST API + TypeScript SDK',
                      'Wise bank payouts to 160+ countries',
                      'Sumsub KYC light verification',
                      'Email support + community access',
                    ].map(f => (
                      <div key={f} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <Check size={14} color="var(--accent)" />
                        <span style={{ fontSize: 14, color: 'var(--text-sub)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          padding: '120px 0',
          background: 'var(--base)',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Radial explosion */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 70% at 50% 100%, rgba(88,101,242,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 40% 40% at 50% 100%, rgba(0,201,167,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div className="container-narrow reveal" style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge badge-live" style={{ marginBottom: 24, display: 'inline-flex' }}>
            <span className="live-dot" />
            Open for signups
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 20 }}>
            Start selling globally<br />
            <span className="gradient-text">today.</span>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--text-sub)', maxWidth: 480, margin: '0 auto 40px' }}>
            No LLC. No Stripe account. No gatekeepers.
            Just you, your product, and 4 billion new potential customers.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="https://app.markuce.com/register" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}>
              Create free account <ArrowRight size={16} />
            </Link>
            <Link href="/how-it-works" className="btn btn-secondary" style={{ fontSize: 16, padding: '14px 32px' }}>
              See how it works
            </Link>
          </div>
          <p style={{ marginTop: 28, fontSize: 13, color: 'var(--text-muted)' }}>
            Built by{' '}
            <Link href="https://symbiothus.vercel.app/" target="_blank" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Symbiothus ↗
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
