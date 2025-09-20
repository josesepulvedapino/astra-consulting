#!/usr/bin/env node

/**
 * Script maestro para auditoría SEO completa
 * Ejecuta el análisis y genera reportes en consola y HTML
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

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

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function main() {
  console.log(colorize('\n🚀 AUDITORÍA SEO COMPLETA - ASTRA CONSULTING', 'bright'));
  console.log(colorize('=' .repeat(60), 'cyan'));
  
  try {
    // Paso 1: Análisis en consola
    console.log(colorize('\n📊 Paso 1: Ejecutando análisis SEO...', 'blue'));
    const seoCheckerPath = path.join(__dirname, 'seo-checker.js');
    execSync(`node "${seoCheckerPath}"`, { stdio: 'inherit' });
    
    // Paso 2: Generar reporte HTML
    console.log(colorize('\n📄 Paso 2: Generando reporte HTML...', 'blue'));
    const reportGeneratorPath = path.join(__dirname, 'generate-seo-report.js');
    execSync(`node "${reportGeneratorPath}"`, { stdio: 'inherit' });
    
    // Paso 3: Verificar archivos generados
    console.log(colorize('\n✅ Paso 3: Verificando archivos generados...', 'blue'));
    
    const files = [
      { path: './seo-report.html', name: 'Reporte HTML' },
      { path: './seo-checker.js', name: 'Script de análisis' },
      { path: './generate-seo-report.js', name: 'Generador de reportes' },
      { path: './seo-config.js', name: 'Configuración' },
      { path: './SEO-CHECKER-README.md', name: 'Documentación' }
    ];
    
    files.forEach(file => {
      if (fs.existsSync(file.path)) {
        const stats = fs.statSync(file.path);
        console.log(colorize(`   ✅ ${file.name}: ${(stats.size / 1024).toFixed(1)} KB`, 'green'));
      } else {
        console.log(colorize(`   ❌ ${file.name}: No encontrado`, 'red'));
      }
    });
    
    // Resumen final
    console.log(colorize('\n🎉 AUDITORÍA COMPLETADA EXITOSAMENTE', 'bright'));
    console.log(colorize('=' .repeat(60), 'cyan'));
    console.log(colorize('\n📋 Archivos generados:', 'blue'));
    console.log(colorize('   • seo-report.html - Reporte visual completo', 'white'));
    console.log(colorize('   • SEO-CHECKER-README.md - Documentación detallada', 'white'));
    console.log(colorize('   • seo-checker.js - Script de análisis principal', 'white'));
    console.log(colorize('   • seo-config.js - Configuración personalizable', 'white'));
    
    console.log(colorize('\n🎯 Próximos pasos recomendados:', 'yellow'));
    console.log(colorize('   1. Abre seo-report.html en tu navegador', 'white'));
    console.log(colorize('   2. Revisa las recomendaciones específicas', 'white'));
    console.log(colorize('   3. Implementa las mejoras sugeridas', 'white'));
    console.log(colorize('   4. Ejecuta el análisis nuevamente para verificar mejoras', 'white'));
    
    console.log(colorize('\n💡 Comandos útiles:', 'cyan'));
    console.log(colorize('   • node seo-checker.js - Solo análisis en consola', 'white'));
    console.log(colorize('   • node generate-seo-report.js - Solo reporte HTML', 'white'));
    console.log(colorize('   • node seo-audit.js - Auditoría completa (este script)', 'white'));
    
    console.log(colorize('\n✨ ¡Tu SEO está siendo optimizado!', 'green'));
    
  } catch (error) {
    console.error(colorize('\n❌ Error durante la auditoría:', 'red'));
    console.error(colorize(error.message, 'red'));
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { main };
