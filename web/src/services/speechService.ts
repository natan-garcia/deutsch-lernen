import type { LanguageVariant } from '../domain/language'

/**
 * Text-to-speech (and later pronunciation scoring). The browser implementation
 * can be replaced by Azure Speech or a Python microservice without touching UI.
 */
export interface SpeechService {
  readonly isAvailable: boolean
  speak(text: string, variant: LanguageVariant): void
}

const VOICE_LOCALE: Record<LanguageVariant, string> = {
  'de-DE': 'de-DE',
  // Browsers have no Swiss German voices; de-CH is the closest standard voice.
  'gsw-CH': 'de-CH',
}

export class BrowserSpeechService implements SpeechService {
  get isAvailable(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  speak(text: string, variant: LanguageVariant): void {
    if (!this.isAvailable) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = VOICE_LOCALE[variant]
    utterance.rate = 0.9
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }
}
