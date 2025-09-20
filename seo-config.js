/**
 * Configuración para el SEO Checker de Astra Consulting
 * Personaliza los criterios de análisis y recomendaciones
 */

module.exports = {
  // Configuración de la aplicación
  app: {
    baseUrl: 'https://astraconsulting.cl',
    appDir: './app',
    componentsDir: './components'
  },

  // Criterios de puntuación SEO
  scoring: {
    title: {
      present: 10,
      optimalLength: 10,
      hasKeywords: 5,
      maxLength: 60,
      minLength: 30
    },
    description: {
      present: 10,
      optimalLength: 10,
      hasBrand: 5,
      maxLength: 160,
      minLength: 120
    },
    keywords: {
      present: 10,
      optimalCount: 10,
      minCount: 5,
      maxCount: 15
    },
    openGraph: 15,
    twitter: 10,
    canonical: 5
  },

  // Palabras clave relevantes para la empresa
  relevantKeywords: [
    'astra consulting',
    'consultoría informática',
    'seo',
    'desarrollo web',
    'transformación digital',
    'marketing digital',
    'aplicaciones móviles',
    'ciberseguridad',
    'automatización',
    'análisis de datos'
  ],

  // Configuración de inconsistencias
  inconsistencies: {
    duplicateTitles: {
      severity: 'high',
      threshold: 1
    },
    duplicateDescriptions: {
      severity: 'medium',
      threshold: 1
    },
    overusedKeywords: {
      severity: 'medium',
      threshold: 3
    }
  },

  // Recomendaciones personalizadas
  recommendations: [
    'Asegúrate de que cada página tenga un título único y descriptivo',
    'Mantén las descripciones entre 120-160 caracteres',
    'Incluye palabras clave relevantes en títulos y descripciones',
    'Agrega metadatos OpenGraph y Twitter para todas las páginas',
    'Implementa URLs canónicas para evitar contenido duplicado',
    'Considera agregar structured data (JSON-LD) para mejor SEO',
    'Revisa regularmente el sitemap.xml para asegurar que todas las páginas estén incluidas',
    'Optimiza las imágenes con alt text descriptivo',
    'Implementa breadcrumbs para mejor navegación y SEO',
    'Usa títulos H1, H2, H3 de manera jerárquica',
    'Incluye enlaces internos relevantes entre páginas',
    'Optimiza la velocidad de carga de las páginas',
    'Implementa un diseño mobile-first',
    'Agrega testimonios y casos de éxito para credibilidad',
    'Mantén el contenido actualizado y relevante'
  ],

  // Configuración de colores para la consola
  colors: {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
  }
};
