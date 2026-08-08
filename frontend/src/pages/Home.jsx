import { lazy, Suspense } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'

const Categories = lazy(() => import('@/components/Categories'))
const BestSelling = lazy(() => import('@/components/BestSelling'))
const SpecialCakes = lazy(() => import('@/components/SpecialCakes'))
const WhyChooseUs = lazy(() => import('@/components/WhyChooseUs'))
const Reviews = lazy(() => import('@/components/Reviews'))
const Gallery = lazy(() => import('@/components/Gallery'))
const OrderProcess = lazy(() => import('@/components/OrderProcess'))
const Contact = lazy(() => import('@/components/Contact'))

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
        <Categories />
        <BestSelling />
        <SpecialCakes />
        <WhyChooseUs />
        <Reviews />
        <Gallery />
        <OrderProcess />
        <Contact />
      </Suspense>
    </>
  )
}
