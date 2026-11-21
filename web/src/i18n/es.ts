/** UI strings (Spanish). Kept in one place so English can be added later. */
export const es = {
  appName: 'Deutsch Lernen',
  tagline: 'Aprende alemán a tu ritmo, con tus propios recursos.',
  level: 'Nivel',
  variant: 'Variante',
  variants: { 'de-DE': 'Alemán estándar', 'gsw-CH': 'Suizo alemán (próximamente)' },
  comingSoon: 'Esta sección llegará en una próxima fase.',
  back: 'Volver al inicio',
  loading: 'Cargando…',
  loadError: 'No se pudo cargar el contenido. ¿Está la API en marcha?',
  listen: 'Escuchar',
  sections: {
    vocabulary: { title: 'Vocabulario', description: 'Palabras con artículo, plural y ejemplos.' },
    grammar: { title: 'Gramática', description: 'Lecciones cortas y ejercicios autocorregidos.' },
    conversation: { title: 'Conversación', description: 'Diálogos de situaciones reales en Suiza.' },
    listening: { title: 'Escucha', description: 'Audios con preguntas y dictado.' },
    pronunciation: { title: 'Pronunciación', description: 'Escucha, grábate y compara.' },
    resources: { title: 'Mis recursos', description: 'Crea, edita e importa tu propio contenido.' },
  },
} as const

export type Strings = typeof es
