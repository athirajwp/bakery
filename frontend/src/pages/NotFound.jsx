import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 text-center">
      <p className="font-heading text-8xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold text-brown">Oops! Page Not Found</h1>
      <p className="mt-3 max-w-md text-sm text-brown-muted">
        The page you are looking for was moved, removed, or never existed. Let’s get you back to some
        sweet treats.
      </p>
      <Link to="/" className="btn-gold mt-8">
        <Home size={16} /> Back to Home
      </Link>
    </section>
  )
}
