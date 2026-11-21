import { Link, Outlet } from 'react-router'
import { useSettings } from '../app/AppContext'
import { es } from '../i18n/es'

export function Layout() {
  const { level, variant } = useSettings()
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="text-lg font-bold tracking-tight">
            🇨🇭 {es.appName}
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-red-600 px-2.5 py-0.5 font-semibold text-white">{level}</span>
            <span className="hidden text-slate-500 sm:inline dark:text-slate-400">{es.variants[variant]}</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}
