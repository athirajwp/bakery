import { useEffect, useState } from 'react'

export default function Img({ src, alt = '', className = '', width, height, eager = false, ...rest }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  return (
    <img
      src={failed ? '/placeholder.svg' : src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
