import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Star, Quote, BadgeCheck } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import { testimonials } from '@/data/testimonials'
import { site } from '@/data/site'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import StarRating from './ui/StarRating'

export default function Reviews() {
  return (
    <section id="reviews" className="bg-cream py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Customer Reviews"
          title="What Our Customers Say"
          subtitle="Real feedback from the families we serve every day."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <div className="flex h-full flex-col items-center justify-center rounded-[2rem] bg-gold-gradient p-8 text-center shadow-gold">
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Star key={i} size={22} className="fill-brown text-brown" />
                ))}
                <Star size={22} className="fill-brown/40 text-brown/40" />
              </div>
              <p className="mt-4 font-heading text-6xl font-bold text-brown">{site.rating}</p>
              <p className="mt-1 text-sm font-semibold text-brown/80">
                out of 5 · {site.reviewCount} Google Reviews
              </p>
              <p className="mt-4 text-sm leading-relaxed text-brown/80">
                “Fresh cakes, traditional sweets and friendly service — a local favourite for years.”
              </p>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold text-primary">
                <BadgeCheck size={16} /> Verified by Google
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 2 } }}
              className="!pb-14"
            >
              {testimonials.map((t) => (
                <SwiperSlide key={t.id} className="!h-auto">
                  <figure className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-card">
                    <Quote size={36} className="text-gold" aria-hidden="true" />
                    <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-brown">
                      “{t.text}”
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3 border-t border-primary/10 pt-5">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 font-heading text-lg font-bold text-primary">
                        {t.name.charAt(0)}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-brown">{t.name}</span>
                        <span className="block text-xs text-brown-muted">{t.place}</span>
                      </span>
                      <span className="ml-auto">
                        <StarRating rating={t.rating} size={13} />
                      </span>
                    </figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
