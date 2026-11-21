import { createContext, useContext, useState, type ReactNode } from 'react'
import { DEFAULT_VARIANT, type CefrLevel, type LanguageVariant } from '../domain/language'
import type { ContentRepository } from '../services/contentRepository'
import type { SpeechService } from '../services/speechService'

interface Services {
  content: ContentRepository
  speech: SpeechService
}

interface LearningSettings {
  level: CefrLevel
  variant: LanguageVariant
  setVariant: (variant: LanguageVariant) => void
}

const ServicesContext = createContext<Services | null>(null)
const SettingsContext = createContext<LearningSettings | null>(null)

export function AppProvider({ services, children }: { services: Services; children: ReactNode }) {
  const [variant, setVariant] = useState<LanguageVariant>(DEFAULT_VARIANT)
  return (
    <ServicesContext value={services}>
      <SettingsContext value={{ level: 'A1', variant, setVariant }}>{children}</SettingsContext>
    </ServicesContext>
  )
}

export function useServices(): Services {
  const value = useContext(ServicesContext)
  if (!value) throw new Error('useServices must be used inside AppProvider')
  return value
}

export function useSettings(): LearningSettings {
  const value = useContext(SettingsContext)
  if (!value) throw new Error('useSettings must be used inside AppProvider')
  return value
}
