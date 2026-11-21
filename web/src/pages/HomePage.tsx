import { Link } from 'react-router'
import { AVAILABLE_SECTIONS, SECTION_ICONS, SECTION_IDS } from '../app/sections'
import { es } from '../i18n/es'

export function HomePage() {
  return (
    <>
      <h1 className="text-2xl font-bold sm:text-3xl">{es.tagline}</h1>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTION_IDS.map((id) => {
          const section = es.sections[id]
          const available = AVAILABLE_SECTIONS.has(id)
          return (
            <li key={id}>
              <Link
                to={`/${id}`}
                className="flex h-full gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-xl font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                  {SECTION_ICONS[id]}
                </span>
                <span>
                  <span className="block font-semibold">{section.title}</span>
                  <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">{section.description}</span>
                  {!available && <span className="mt-2 inline-block text-xs text-slate-400">Próximamente</span>}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
