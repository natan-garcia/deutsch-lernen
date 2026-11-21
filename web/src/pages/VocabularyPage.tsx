import { useQuery } from '@tanstack/react-query'
import { useServices, useSettings } from '../app/AppContext'
import { ARTICLE_BY_GENDER, type VocabularyItem } from '../domain/language'
import { es } from '../i18n/es'

const GENDER_COLOR = {
  m: 'text-blue-700 dark:text-blue-300',
  f: 'text-red-700 dark:text-red-300',
  n: 'text-green-700 dark:text-green-300',
} as const

export function VocabularyPage() {
  const { content, speech } = useServices()
  const { level, variant } = useSettings()
  const { data, isPending, isError } = useQuery({
    queryKey: ['vocabulary', level, variant],
    queryFn: () => content.getVocabulary({ level, variant }),
  })

  return (
    <section>
      <h1 className="text-2xl font-bold">{es.sections.vocabulary.title}</h1>
      {isPending && <p className="mt-4">{es.loading}</p>}
      {isError && <p role="alert" className="mt-4 text-red-700">{es.loadError}</p>}
      {data && (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {data.map((item) => (
            <WordCard key={item.id} item={item} onListen={() => speech.speak(spoken(item), item.variant)} canListen={speech.isAvailable} />
          ))}
        </ul>
      )}
    </section>
  )
}

function spoken(item: VocabularyItem): string {
  return item.gender ? `${ARTICLE_BY_GENDER[item.gender]} ${item.lemma}` : item.lemma
}

function WordCard({ item, onListen, canListen }: { item: VocabularyItem; onListen: () => void; canListen: boolean }) {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-lg font-semibold">
            {item.gender && <span className={GENDER_COLOR[item.gender]}>{ARTICLE_BY_GENDER[item.gender]} </span>}
            {item.lemma}
            {item.plural && <span className="ml-2 text-sm font-normal text-slate-500">pl. {item.plural}</span>}
          </p>
          <p className="text-slate-600 dark:text-slate-400">{item.translations.es}</p>
        </div>
        {canListen && (
          <button
            type="button"
            onClick={onListen}
            aria-label={`${es.listen}: ${item.lemma}`}
            className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            🔊
          </button>
        )}
      </div>
      {item.example && <p className="mt-2 text-sm italic text-slate-500">„{item.example.de}“</p>}
    </li>
  )
}
