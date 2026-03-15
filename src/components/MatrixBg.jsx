import { useEffect, useRef } from 'react'

export default function MatrixBg({ opacity = 0.2 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const chars = '01XYZABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const fs = 14
    let drops = []
    let animId

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drops = Array(Math.floor(canvas.width / fs)).fill(1)
    }

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#0f0'
      ctx.font = `${fs}px monospace`
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs)
        if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    resize()
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0, zIndex: -2,
        opacity, pointerEvents: 'none',
        width: '100%', height: '100%'
      }}
    />
  )
}
