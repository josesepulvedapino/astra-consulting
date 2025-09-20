#!/usr/bin/env node

/**
 * SEO Checker para Astra Consulting
 * Analiza títulos, descripciones, keywords y detecta inconsistencias
 * en todas las páginas de la aplicación Next.js
 */

const fs = require('fs');
const path = require('path');

// Configuración
const BASE_URL = 'https://astraconsulting.cl';
const APP_DIR = './app';
const COMPONENTS_DIR = './components';

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Función para colorear texto
function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

// Función para leer archivos de manera segura
function readFileSafely(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

// Función para extraer metadatos de un archivo
function extractMetadata(filePath, content) {
  const metadata = {
    file: filePath,
    title: null,
    description: null,
    keywords: null,
    openGraph: null,
    twitter: null,
    canonical: null,
    robots: null,
    hasMetadata: false,
    issues: []
  };

  // Buscar export const metadata usando un enfoque más robusto
  const metadataStart = content.indexOf('export const metadata');
  if (metadataStart === -1) {
    metadata.issues.push('No se encontró export const metadata');
    return metadata;
  }

  // Encontrar el inicio del objeto
  const objectStart = content.indexOf('{', metadataStart);
  if (objectStart === -1) {
    metadata.issues.push('No se encontró el inicio del objeto metadata');
    return metadata;
  }

  // Encontrar el final del objeto contando llaves
  let braceCount = 0;
  let objectEnd = -1;
  let inString = false;
  let stringChar = null;

  for (let i = objectStart; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';

    // Manejar strings
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && prevChar !== '\\') {
      inString = false;
      stringChar = null;
    }

    // Contar llaves solo si no estamos en un string
    if (!inString) {
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          objectEnd = i;
          break;
        }
      }
    }
  }

  if (objectEnd === -1) {
    metadata.issues.push('No se pudo encontrar el final del objeto metadata');
    return metadata;
  }

  metadata.hasMetadata = true;
  const metadataContent = content.substring(objectStart + 1, objectEnd);

  // Función helper para extraer valores de strings
  function extractStringValue(key, content) {
    // Buscar key: "valor" o key: 'valor'
    const patterns = [
      new RegExp(`${key}:\\s*"([^"]*)"`, 's'),
      new RegExp(`${key}:\\s*'([^']*)'`, 's'),
      new RegExp(`${key}:\\s*\`([^\`]*)\``, 's')
    ];
    
    for (const pattern of patterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1].replace(/\s+/g, ' ').trim();
      }
    }
    
    // Buscar strings multilinea
    const multilinePatterns = [
      new RegExp(`${key}:\\s*"([^"]*\\n[^"]*)"`, 's'),
      new RegExp(`${key}:\\s*'([^']*\\n[^']*)'`, 's'),
      new RegExp(`${key}:\\s*\`([^\`]*\\n[^\`]*)\``, 's')
    ];
    
    for (const pattern of multilinePatterns) {
      const match = content.match(pattern);
      if (match) {
        return match[1].replace(/\s+/g, ' ').trim();
      }
    }
    
    return null;
  }

  // Extraer title
  metadata.title = extractStringValue('title', metadataContent);
  if (!metadata.title) {
    metadata.issues.push('Título no encontrado');
  }

  // Extraer description
  metadata.description = extractStringValue('description', metadataContent);
  if (!metadata.description) {
    metadata.issues.push('Descripción no encontrada');
  }

  // Extraer keywords
  metadata.keywords = extractStringValue('keywords', metadataContent);
  if (!metadata.keywords) {
    metadata.issues.push('Keywords no encontradas');
  }

  // Extraer OpenGraph
  const ogMatch = metadataContent.match(/openGraph:\s*{([\s\S]*?)}/);
  if (ogMatch) {
    metadata.openGraph = ogMatch[1];
  }

  // Extraer Twitter
  const twitterMatch = metadataContent.match(/twitter:\s*{([\s\S]*?)}/);
  if (twitterMatch) {
    metadata.twitter = twitterMatch[1];
  }

  // Extraer canonical
  metadata.canonical = extractStringValue('canonical', metadataContent);

  // Extraer robots
  metadata.robots = extractStringValue('robots', metadataContent);

  return metadata;
}

// Función para analizar la calidad del SEO
function analyzeSEOQuality(metadata, pagePath) {
  const analysis = {
    score: 0,
    maxScore: 100,
    issues: [],
    suggestions: []
  };

  // Análisis del título (25 puntos)
  if (metadata.title) {
    analysis.score += 10; // Título presente
    
    if (metadata.title.length >= 30 && metadata.title.length <= 60) {
      analysis.score += 10; // Longitud óptima
    } else if (metadata.title.length < 30) {
      analysis.issues.push('Título muy corto (menos de 30 caracteres)');
      analysis.suggestions.push('Considera expandir el título para incluir más palabras clave');
    } else if (metadata.title.length > 60) {
      analysis.issues.push('Título muy largo (más de 60 caracteres)');
      analysis.suggestions.push('Acorta el título para evitar que se corte en los resultados de búsqueda');
    }

    // Verificar si contiene palabras clave relevantes
    const titleLower = metadata.title.toLowerCase();
    const relevantKeywords = ['astra consulting', 'consultoría informática', 'seo', 'desarrollo web', 'transformación digital'];
    const hasRelevantKeywords = relevantKeywords.some(keyword => titleLower.includes(keyword));
    
    if (hasRelevantKeywords) {
      analysis.score += 5;
    } else {
      analysis.issues.push('Título no contiene palabras clave relevantes');
      analysis.suggestions.push('Incluye palabras clave como "Astra Consulting", "consultoría informática", "SEO", etc.');
    }
  } else {
    analysis.issues.push('Título faltante');
    analysis.suggestions.push('Agrega un título descriptivo y atractivo');
  }

  // Análisis de la descripción (25 puntos)
  if (metadata.description) {
    analysis.score += 10; // Descripción presente
    
    if (metadata.description.length >= 120 && metadata.description.length <= 160) {
      analysis.score += 10; // Longitud óptima
    } else if (metadata.description.length < 120) {
      analysis.issues.push('Descripción muy corta (menos de 120 caracteres)');
      analysis.suggestions.push('Expande la descripción para incluir más detalles y palabras clave');
    } else if (metadata.description.length > 160) {
      analysis.issues.push('Descripción muy larga (más de 160 caracteres)');
      analysis.suggestions.push('Acorta la descripción para evitar que se corte en los resultados');
    }

    // Verificar si es única y relevante
    const descLower = metadata.description.toLowerCase();
    if (descLower.includes('astra consulting') || descLower.includes('consultoría')) {
      analysis.score += 5;
    } else {
      analysis.issues.push('Descripción no menciona la marca o servicios principales');
      analysis.suggestions.push('Incluye "Astra Consulting" y servicios principales en la descripción');
    }
  } else {
    analysis.issues.push('Descripción faltante');
    analysis.suggestions.push('Agrega una descripción atractiva que resuma el contenido de la página');
  }

  // Análisis de keywords (20 puntos)
  if (metadata.keywords) {
    analysis.score += 10; // Keywords presentes
    
    const keywordsArray = metadata.keywords.split(',').map(k => k.trim().toLowerCase());
    if (keywordsArray.length >= 5 && keywordsArray.length <= 15) {
      analysis.score += 10; // Cantidad óptima
    } else if (keywordsArray.length < 5) {
      analysis.issues.push('Muy pocas keywords (menos de 5)');
      analysis.suggestions.push('Agrega más keywords relevantes para mejorar el SEO');
    } else if (keywordsArray.length > 15) {
      analysis.issues.push('Demasiadas keywords (más de 15)');
      analysis.suggestions.push('Reduce las keywords a las más relevantes (5-15 es óptimo)');
    }
  } else {
    analysis.issues.push('Keywords faltantes');
    analysis.suggestions.push('Agrega keywords relevantes separadas por comas');
  }

  // Análisis de OpenGraph (15 puntos)
  if (metadata.openGraph) {
    analysis.score += 15;
  } else {
    analysis.issues.push('OpenGraph faltante');
    analysis.suggestions.push('Agrega metadatos OpenGraph para mejor compartir en redes sociales');
  }

  // Análisis de Twitter (10 puntos)
  if (metadata.twitter) {
    analysis.score += 10;
  } else {
    analysis.issues.push('Twitter Cards faltantes');
    analysis.suggestions.push('Agrega metadatos de Twitter para mejor compartir en Twitter');
  }

  // Análisis de canonical (5 puntos)
  if (metadata.canonical) {
    analysis.score += 5;
  } else {
    analysis.issues.push('URL canónica faltante');
    analysis.suggestions.push('Agrega una URL canónica para evitar contenido duplicado');
  }

  return analysis;
}

// Función para detectar inconsistencias entre páginas
function detectInconsistencies(pagesMetadata) {
  const inconsistencies = [];

  // Verificar títulos duplicados
  const titles = pagesMetadata.map(p => p.title).filter(Boolean);
  const duplicateTitles = titles.filter((title, index) => titles.indexOf(title) !== index);
  if (duplicateTitles.length > 0) {
    inconsistencies.push({
      type: 'Títulos duplicados',
      details: duplicateTitles,
      severity: 'high',
      suggestion: 'Cada página debe tener un título único y específico'
    });
  }

  // Verificar descripciones duplicadas
  const descriptions = pagesMetadata.map(p => p.description).filter(Boolean);
  const duplicateDescriptions = descriptions.filter((desc, index) => descriptions.indexOf(desc) !== index);
  if (duplicateDescriptions.length > 0) {
    inconsistencies.push({
      type: 'Descripciones duplicadas',
      details: duplicateDescriptions,
      severity: 'medium',
      suggestion: 'Cada página debe tener una descripción única y específica'
    });
  }

  // Verificar keywords duplicadas
  const allKeywords = pagesMetadata
    .map(p => p.keywords)
    .filter(Boolean)
    .flatMap(k => k.split(',').map(kw => kw.trim().toLowerCase()));
  
  const keywordCounts = {};
  allKeywords.forEach(keyword => {
    keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
  });

  const overusedKeywords = Object.entries(keywordCounts)
    .filter(([keyword, count]) => count > 3)
    .map(([keyword, count]) => ({ keyword, count }));

  if (overusedKeywords.length > 0) {
    inconsistencies.push({
      type: 'Keywords sobreutilizadas',
      details: overusedKeywords,
      severity: 'medium',
      suggestion: 'Diversifica las keywords para cada página específica'
    });
  }

  return inconsistencies;
}

// Función para generar reporte
function generateReport(pagesMetadata, inconsistencies) {
  console.log(colorize('\n🔍 REPORTE DE SEO - ASTRA CONSULTING', 'bright'));
  console.log(colorize('=' .repeat(50), 'cyan'));
  
  // Resumen general
  const totalPages = pagesMetadata.length;
  const pagesWithMetadata = pagesMetadata.filter(p => p.hasMetadata).length;
  const avgScore = pagesMetadata.reduce((sum, p) => sum + (p.seoAnalysis?.score || 0), 0) / totalPages;

  console.log(colorize('\n📊 RESUMEN GENERAL', 'bright'));
  console.log(`Total de páginas analizadas: ${totalPages}`);
  console.log(`Páginas con metadatos: ${pagesWithMetadata}/${totalPages}`);
  console.log(`Puntuación promedio SEO: ${avgScore.toFixed(1)}/100`);

  // Análisis por página
  console.log(colorize('\n📄 ANÁLISIS POR PÁGINA', 'bright'));
  console.log(colorize('-'.repeat(50), 'cyan'));

  pagesMetadata.forEach((page, index) => {
    const url = page.file.replace('./app', BASE_URL).replace('/page.tsx', '').replace('\\', '/');
    const score = page.seoAnalysis?.score || 0;
    const scoreColor = score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red';
    
    console.log(colorize(`\n${index + 1}. ${url}`, 'blue'));
    console.log(`   Puntuación SEO: ${colorize(score + '/100', scoreColor)}`);
    
    if (page.title) {
      console.log(`   Título: "${page.title}" (${page.title.length} caracteres)`);
    }
    
    if (page.description) {
      console.log(`   Descripción: "${page.description.substring(0, 80)}..." (${page.description.length} caracteres)`);
    }
    
    if (page.keywords) {
      const keywordCount = page.keywords.split(',').length;
      console.log(`   Keywords: ${keywordCount} keywords`);
    }

    // Mostrar issues
    if (page.seoAnalysis?.issues.length > 0) {
      console.log(colorize('   ⚠️  Problemas:', 'yellow'));
      page.seoAnalysis.issues.forEach(issue => {
        console.log(colorize(`      • ${issue}`, 'red'));
      });
    }

    // Mostrar sugerencias
    if (page.seoAnalysis?.suggestions.length > 0) {
      console.log(colorize('   💡 Sugerencias:', 'cyan'));
      page.seoAnalysis.suggestions.forEach(suggestion => {
        console.log(colorize(`      • ${suggestion}`, 'magenta'));
      });
    }
  });

  // Inconsistencias
  if (inconsistencies.length > 0) {
    console.log(colorize('\n⚠️  INCONSISTENCIAS DETECTADAS', 'bright'));
    console.log(colorize('-'.repeat(50), 'cyan'));
    
    inconsistencies.forEach((inconsistency, index) => {
      const severityColor = inconsistency.severity === 'high' ? 'red' : 'yellow';
      console.log(colorize(`\n${index + 1}. ${inconsistency.type}`, severityColor));
      console.log(`   Severidad: ${colorize(inconsistency.severity, severityColor)}`);
      console.log(`   Detalles: ${JSON.stringify(inconsistency.details, null, 2)}`);
      console.log(colorize(`   Sugerencia: ${inconsistency.suggestion}`, 'cyan'));
    });
  } else {
    console.log(colorize('\n✅ No se detectaron inconsistencias importantes', 'green'));
  }

  // Recomendaciones generales
  console.log(colorize('\n🎯 RECOMENDACIONES GENERALES', 'bright'));
  console.log(colorize('-'.repeat(50), 'cyan'));
  
  const recommendations = [
    'Asegúrate de que cada página tenga un título único y descriptivo',
    'Mantén las descripciones entre 120-160 caracteres',
    'Incluye palabras clave relevantes en títulos y descripciones',
    'Agrega metadatos OpenGraph y Twitter para todas las páginas',
    'Implementa URLs canónicas para evitar contenido duplicado',
    'Considera agregar structured data (JSON-LD) para mejor SEO',
    'Revisa regularmente el sitemap.xml para asegurar que todas las páginas estén incluidas',
    'Optimiza las imágenes con alt text descriptivo',
    'Implementa breadcrumbs para mejor navegación y SEO'
  ];

  recommendations.forEach((rec, index) => {
    console.log(colorize(`${index + 1}. ${rec}`, 'magenta'));
  });

  console.log(colorize('\n✨ Análisis completado!', 'green'));
}

// Función principal
function main() {
  console.log(colorize('🚀 Iniciando análisis SEO de Astra Consulting...', 'bright'));
  
  const pagesMetadata = [];
  
  // Analizar todas las páginas en el directorio app
  function analyzeDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Buscar page.tsx en subdirectorios
        const pageFile = path.join(fullPath, 'page.tsx');
        if (fs.existsSync(pageFile)) {
          const content = readFileSafely(pageFile);
          if (content) {
            const metadata = extractMetadata(pageFile, content);
            metadata.seoAnalysis = analyzeSEOQuality(metadata, pageFile);
            pagesMetadata.push(metadata);
          }
        }
        // Recursivamente analizar subdirectorios
        analyzeDirectory(fullPath);
      }
    });
  }
  
  // Analizar página principal
  const mainPageFile = path.join(APP_DIR, 'page.tsx');
  const mainContent = readFileSafely(mainPageFile);
  if (mainContent) {
    const metadata = extractMetadata(mainPageFile, mainContent);
    metadata.seoAnalysis = analyzeSEOQuality(metadata, mainPageFile);
    pagesMetadata.push(metadata);
  }
  
  // Analizar otras páginas
  analyzeDirectory(APP_DIR);
  
  // Detectar inconsistencias
  const inconsistencies = detectInconsistencies(pagesMetadata);
  
  // Generar reporte
  generateReport(pagesMetadata, inconsistencies);
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  extractMetadata,
  analyzeSEOQuality,
  detectInconsistencies,
  generateReport
};
