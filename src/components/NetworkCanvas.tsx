'use client'
import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
}

interface Pulse {
  fromIdx: number
  toIdx: number
  progress: number
  color: string
  speed: number
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement!
    let width  = parent.offsetWidth
    let height = parent.offsetHeight

    canvas.width  = width
    canvas.height = height

    const ctx = canvas.getContext('2d')!

    const nodeCount = Math.floor((width * height) / 14000)
    const nodes: Node[] = Array.from({ length: Math.max(nodeCount, 40) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      opacity: 0.2 + Math.random() * 0.6,
    }))

    const pulses: Pulse[] = []
    let lastPulseTime = 0
    const MAX_DIST = Math.min(width, height) * 0.25
    const PULSE_COLORS = ['#5865F2', '#5865F2', '#00C9A7', '#7C8CFF']

    const addPulse = () => {
      const from = Math.floor(Math.random() * nodes.length)
      let to = from
      let attempts = 0
      while (to === from && attempts < 10) {
        to = Math.floor(Math.random() * nodes.length)
        attempts++
      }
      pulses.push({
        fromIdx: from,
        toIdx: to,
        progress: 0,
        color: PULSE_COLORS[Math.floor(Math.random() * PULSE_COLORS.length)],
        speed: 0.006 + Math.random() * 0.008,
      })
    }

    let animId: number

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)

      // Update nodes
      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width)  n.vx *= -1
        if (n.y < 0 || n.y > height)  n.vy *= -1
        n.x = Math.max(0, Math.min(width,  n.x))
        n.y = Math.max(0, Math.min(height, n.y))
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x
          const dy   = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(88,101,242,${a})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(88,101,242,${n.opacity * 0.5})`
        ctx.fill()
      })

      // Spawn pulses
      if (time - lastPulseTime > 900 && pulses.length < 6) {
        addPulse()
        lastPulseTime = time
      }

      // Draw & update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p  = pulses[i]
        p.progress += p.speed

        if (p.progress >= 1) {
          pulses.splice(i, 1)
          continue
        }

        const from = nodes[p.fromIdx]
        const to   = nodes[p.toIdx]
        const x    = from.x + (to.x - from.x) * p.progress
        const y    = from.y + (to.y - from.y) * p.progress
        const alpha = Math.sin(p.progress * Math.PI)

        // Tail
        const tailLen = 0.12
        const tailStart = Math.max(0, p.progress - tailLen)
        const tx = from.x + (to.x - from.x) * tailStart
        const ty = from.y + (to.y - from.y) * tailStart

        const grad = ctx.createLinearGradient(tx, ty, x, y)
        const [r, g, b] = p.color === '#00C9A7' ? [0, 201, 167] : [88, 101, 242]
        grad.addColorStop(0, `rgba(${r},${g},${b},0)`)
        grad.addColorStop(1, `rgba(${r},${g},${b},${alpha * 0.7})`)

        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(x, y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Glow head
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 10)
        grd.addColorStop(0,   `rgba(${r},${g},${b},${alpha * 0.8})`)
        grd.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.3})`)
        grd.addColorStop(1,   'rgba(0,0,0,0)')

        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    const onResize = () => {
      width  = parent.offsetWidth
      height = parent.offsetHeight
      canvas.width  = width
      canvas.height = height
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.45 }}
    />
  )
}
