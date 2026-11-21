import type { CefrLevel, LanguageVariant, VocabularyItem } from '../domain/language'

export interface ContentQuery {
  level: CefrLevel
  variant: LanguageVariant
}

/**
 * Where the screens get learning resources from. Screens never know whether
 * content comes from the API, a local file or a test double.
 */
export interface ContentRepository {
  getVocabulary(query: ContentQuery): Promise<VocabularyItem[]>
}

export class HttpContentRepository implements ContentRepository {
  private readonly baseUrl: string

  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl
  }

  async getVocabulary({ level, variant }: ContentQuery): Promise<VocabularyItem[]> {
    const params = new URLSearchParams({ level, variant })
    const response = await fetch(`${this.baseUrl}/vocabulary?${params}`)
    if (!response.ok) throw new Error(`API error ${response.status}`)
    return (await response.json()) as VocabularyItem[]
  }
}
