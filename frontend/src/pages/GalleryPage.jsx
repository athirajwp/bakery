import { lazy, Suspense } from 'react'

const Gallery = lazy(() => import('@/components/Gallery'))

export default function GalleryPage() {
  return (
    <>
      <section className="relative bg-primary pt-28 pb-12 text-center sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0000] via-primary to-[#4a0505]" aria-hidden="true" />
        <div className="container-x relative">
          <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Our <span className="italic text-gold">Gallery</span>
          </h1>
        </div>
      </section>

      <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
        <Gallery />
      </Suspense>
    </>
  )
}
