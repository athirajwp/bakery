import { lazy, Suspense } from 'react'

const Gallery = lazy(() => import('@/components/Gallery'))

export default function GalleryPage() {
  return (
    <>
      <section className="relative bg-primary py-28 text-center lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a0000] via-primary to-[#4a0505]" aria-hidden="true" />
        <div className="container-x relative">
          <span className="chip bg-white/10 text-gold">Our Gallery</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            A Peek Inside <span className="italic text-gold">Our Kitchen</span>
          </h1>
        </div>
      </section>

      <Suspense fallback={<div className="h-screen" aria-hidden="true" />}>
        <Gallery />
      </Suspense>
    </>
  )
}
