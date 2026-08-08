import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { products } from '@/data/products'
import SectionHeading from './ui/SectionHeading'
import ProductCard from './ui/ProductCard'
import Reveal from './ui/Reveal'

export default function BestSelling() {
  return (
    <section id="menu" className="relative overflow-hidden bg-cream-dark py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Best Sellers"
            title="Most Loved by Our Customers"
            subtitle="Handpicked favourites — from indulgent cakes to traditional sweets, baked fresh every morning."
          />
          <Reveal>
            <Link to="/menu" className="btn-outline">
              View Full Menu <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            breakpoints={{
              480: { slidesPerView: 1.25 },
              640: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!pb-14"
          >
            {products.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto">
                <ProductCard product={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  )
}
