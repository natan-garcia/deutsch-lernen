export const SECTION_IDS = [
  'vocabulary',
  'grammar',
  'conversation',
  'listening',
  'pronunciation',
  'resources',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

/** Sections implemented so far; the rest render a "coming soon" page. */
export const AVAILABLE_SECTIONS: ReadonlySet<SectionId> = new Set(['vocabulary'])

export const SECTION_ICONS: Record<SectionId, string> = {
  vocabulary: 'Aa',
  grammar: '§',
  conversation: '💬',
  listening: '🎧',
  pronunciation: '🎙',
  resources: '＋',
}
