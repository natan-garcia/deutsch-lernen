import { Route, Routes } from 'react-router'
import { SECTION_IDS, type SectionId } from './app/sections'
import { Layout } from './components/Layout'
import { ComingSoonPage } from './pages/ComingSoonPage'
import { HomePage } from './pages/HomePage'
import { VocabularyPage } from './pages/VocabularyPage'

const PAGES: Partial<Record<SectionId, () => React.JSX.Element>> = {
  vocabulary: VocabularyPage,
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        {SECTION_IDS.map((id) => {
          const Page = PAGES[id]
          return <Route key={id} path={id} element={Page ? <Page /> : <ComingSoonPage section={id} />} />
        })}
      </Route>
    </Routes>
  )
}
