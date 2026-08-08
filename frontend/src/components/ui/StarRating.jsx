import { Star, StarHalf } from 'lucide-react'

export default function StarRating({ rating, size = 16, className = '' }) {
  const full = Math.floor(rating)
  const half = rating - full >= 0.25 && rating - full < 0.75
  const showHalf = rating - full >= 0.75 ? false : half

  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < full) return <Star key={i} size={size} className="fill-gold text-gold" aria-hidden="true" />
        if (i === full && showHalf)
          return <StarHalf key={i} size={size} className="fill-gold text-gold" aria-hidden="true" />
        return <Star key={i} size={size} className="text-gold/40" aria-hidden="true" />
      })}
    </span>
  )
}
