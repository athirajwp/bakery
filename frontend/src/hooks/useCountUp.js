import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function useCountUp(target, { duration = 1800, start = false } = {}) {
  const [value, setValue] = useState(0)
  const reduce = useReducedMotion()
  const raf = useRef(null)

  const animate = useCallback(() => {
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(target * eased)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [target, duration])

  useEffect(() => {
    if (reduce) {
      setValue(target)
      return
    }
    if (start) animate()
    return () => cancelAnimationFrame(raf.current)
  }, [start, animate, reduce, target])

  return value
}
