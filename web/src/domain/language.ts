/**
 * Language variant of a resource. Standard German first; Swiss German (gsw-CH)
 * is planned and resolved with a fallback to the standard variant.
 */
export const LANGUAGE_VARIANTS = ['de-DE', 'gsw-CH'] as const
export type LanguageVariant = (typeof LANGUAGE_VARIANTS)[number]
export const DEFAULT_VARIANT: LanguageVariant = 'de-DE'

/** CEFR level. Levels are data, not code: adding A2 means adding content. */
export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const
export type CefrLevel = (typeof CEFR_LEVELS)[number]

export type Gender = 'm' | 'f' | 'n'

export interface ResourceSource {
  url?: string
  license?: string
}

/** Mirrors `VocabularyItem` in content/schema/resource-package.schema.json. */
export interface VocabularyItem {
  id: string
  level: CefrLevel
  variant: LanguageVariant
  /** For a regional variant, the id of the standard item it replaces. */
  variantOf?: string
  lemma: string
  gender?: Gender
  plural?: string
  partOfSpeech: string
  translations: Record<string, string>
  example?: { de: string; translation?: string }
  tags: string[]
  source?: ResourceSource
}

export const ARTICLE_BY_GENDER: Record<Gender, string> = { m: 'der', f: 'die', n: 'das' }
