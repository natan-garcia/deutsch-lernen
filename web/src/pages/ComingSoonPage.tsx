import { Link } from 'react-router'
import type { SectionId } from '../app/sections'
import { es } from '../i18n/es'

export function ComingSoonPage({ section }: { section: SectionId }) {
  return (
    <section className="text-center">
      <h1 className="text-2xl font-bold">{es.sections[section].title}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">{es.comingSoon}</p>
      <Link to="/" className="mt-6 inline-block text-red-700 underline dark:text-red-300">
        {es.back}
      </Link>
    </section>
  )
}
