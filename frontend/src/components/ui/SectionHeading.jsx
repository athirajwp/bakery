import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const titleColor = light ? 'text-white' : 'text-brown'
  const subColor = light ? 'text-cream/80' : 'text-brown-muted'

  return (
    <Reveal className={`max-w-2xl ${alignClass}`}>
      <span className={`chip ${light ? 'bg-white/10 text-gold' : ''}`}>{eyebrow}</span>
      <h2 className={`mt-4 text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-tight ${titleColor}`}>
        {title}
      </h2>
      <div className={`mt-3 flex items-center gap-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <span className="h-px w-10 bg-gold" aria-hidden="true" />
        <span className="text-gold" aria-hidden="true">✦</span>
        <span className="h-px w-10 bg-gold" aria-hidden="true" />
      </div>
      {subtitle && <p className={`mt-4 text-sm leading-relaxed sm:text-base ${subColor}`}>{subtitle}</p>}
    </Reveal>
  )
}
