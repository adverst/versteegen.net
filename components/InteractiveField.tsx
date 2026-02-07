'use client'

import { useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export default function InteractiveField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let animationId = 0
    let width = 0
    let height = 0
    let dpr = window.devicePixelRatio || 1
    let points: Point[] = []
    const pointer = { x: 0, y: 0, active: false }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(30, Math.floor((width * height) / 14000))
      points = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 1.2 + Math.random() * 1.6,
      }))
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      context.fillStyle = 'rgba(0, 0, 0, 0.35)'
      context.strokeStyle = 'rgba(0, 0, 0, 0.08)'

      for (const point of points) {
        point.x += point.vx
        point.y += point.vy

        if (point.x < 0 || point.x > width) point.vx *= -1
        if (point.y < 0 || point.y > height) point.vy *= -1

        const dx = point.x - pointer.x
        const dy = point.y - pointer.y
        const dist = Math.hypot(dx, dy)
        if (pointer.active && dist < 140) {
          point.vx += (dx / dist) * 0.02
          point.vy += (dy / dist) * 0.02
        }
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i]
          const b = points[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 120) {
            context.globalAlpha = 1 - dist / 120
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.stroke()
          }
        }
      }
      context.globalAlpha = 1

      for (const point of points) {
        context.beginPath()
        context.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        context.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
}
