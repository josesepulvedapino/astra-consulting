#!/usr/bin/env node

/**
 * Script de ejecución simplificado para el SEO Checker
 * Ejecuta el análisis SEO y muestra los resultados
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🔍 Ejecutando análisis SEO de Astra Consulting...\n');

try {
  // Ejecutar el script principal
  const seoCheckerPath = path.join(__dirname, 'seo-checker.js');
  execSync(`node "${seoCheckerPath}"`, { stdio: 'inherit' });
  
  console.log('\n✅ Análisis completado exitosamente!');
  console.log('📋 Revisa los resultados arriba para ver las recomendaciones de SEO.');
  
} catch (error) {
  console.error('❌ Error ejecutando el análisis SEO:', error.message);
  process.exit(1);
}
