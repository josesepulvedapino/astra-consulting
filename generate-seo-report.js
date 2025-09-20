#!/usr/bin/env node

/**
 * Generador de reporte HTML para el SEO Checker
 * Crea un reporte visual en HTML con los resultados del análisis
 */

const fs = require('fs');
const path = require('path');

// Importar el checker principal
const { extractMetadata, analyzeSEOQuality, detectInconsistencies } = require('./seo-checker.js');

// Función para leer archivos de manera segura
function readFileSafely(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

// Función para analizar todas las páginas
function analyzeAllPages() {
  const pagesMetadata = [];
  const APP_DIR = './app';

  // Analizar página principal
  const mainPageFile = path.join(APP_DIR, 'page.tsx');
  const mainContent = readFileSafely(mainPageFile);
  if (mainContent) {
    const metadata = extractMetadata(mainPageFile, mainContent);
    metadata.seoAnalysis = analyzeSEOQuality(metadata, mainPageFile);
    pagesMetadata.push(metadata);
  }

  // Analizar otras páginas
  function analyzeDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        const pageFile = path.join(fullPath, 'page.tsx');
        if (fs.existsSync(pageFile)) {
          const content = readFileSafely(pageFile);
          if (content) {
            const metadata = extractMetadata(pageFile, content);
            metadata.seoAnalysis = analyzeSEOQuality(metadata, pageFile);
            pagesMetadata.push(metadata);
          }
        }
        analyzeDirectory(fullPath);
      }
    });
  }
  
  analyzeDirectory(APP_DIR);
  return pagesMetadata;
}

// Función para generar el HTML
function generateHTMLReport(pagesMetadata, inconsistencies) {
  const totalPages = pagesMetadata.length;
  const pagesWithMetadata = pagesMetadata.filter(p => p.hasMetadata).length;
  const avgScore = pagesMetadata.reduce((sum, p) => sum + (p.seoAnalysis?.score || 0), 0) / totalPages;

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte SEO - Astra Consulting</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .summary {
            padding: 40px;
            background: #f8f9fa;
            border-bottom: 1px solid #e9ecef;
        }
        
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .summary-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .summary-card h3 {
            font-size: 2rem;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        
        .summary-card p {
            color: #666;
            font-size: 0.9rem;
        }
        
        .score-excellent { color: #27ae60; }
        .score-good { color: #f39c12; }
        .score-poor { color: #e74c3c; }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
        }
        
        .section h2 {
            font-size: 1.8rem;
            color: #2c3e50;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #3498db;
        }
        
        .page-card {
            background: white;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            margin-bottom: 20px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .page-header {
            background: #f8f9fa;
            padding: 20px;
            border-bottom: 1px solid #e9ecef;
        }
        
        .page-url {
            font-size: 1.1rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 5px;
        }
        
        .page-score {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .page-details {
            padding: 20px;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 8px 0;
            border-bottom: 1px solid #f1f3f4;
        }
        
        .detail-label {
            font-weight: 600;
            color: #555;
        }
        
        .detail-value {
            color: #666;
            max-width: 60%;
            text-align: right;
        }
        
        .issues {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 6px;
            padding: 15px;
            margin-top: 15px;
        }
        
        .issues h4 {
            color: #856404;
            margin-bottom: 10px;
        }
        
        .issues ul {
            list-style: none;
        }
        
        .issues li {
            color: #856404;
            margin-bottom: 5px;
            padding-left: 20px;
            position: relative;
        }
        
        .issues li:before {
            content: "⚠️";
            position: absolute;
            left: 0;
        }
        
        .suggestions {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            border-radius: 6px;
            padding: 15px;
            margin-top: 15px;
        }
        
        .suggestions h4 {
            color: #0c5460;
            margin-bottom: 10px;
        }
        
        .suggestions ul {
            list-style: none;
        }
        
        .suggestions li {
            color: #0c5460;
            margin-bottom: 5px;
            padding-left: 20px;
            position: relative;
        }
        
        .suggestions li:before {
            content: "💡";
            position: absolute;
            left: 0;
        }
        
        .inconsistencies {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 6px;
            padding: 15px;
            margin-top: 15px;
        }
        
        .inconsistencies h4 {
            color: #721c24;
            margin-bottom: 10px;
        }
        
        .recommendations {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 6px;
            padding: 20px;
        }
        
        .recommendations h3 {
            color: #155724;
            margin-bottom: 15px;
        }
        
        .recommendations ol {
            color: #155724;
        }
        
        .recommendations li {
            margin-bottom: 8px;
        }
        
        .footer {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 20px;
        }
        
        @media (max-width: 768px) {
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .header {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .content {
                padding: 20px;
            }
            
            .summary-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Reporte SEO</h1>
            <p>Astra Consulting - Análisis completo de optimización para motores de búsqueda</p>
        </div>
        
        <div class="summary">
            <h2>📊 Resumen General</h2>
            <div class="summary-grid">
                <div class="summary-card">
                    <h3>${totalPages}</h3>
                    <p>Páginas Analizadas</p>
                </div>
                <div class="summary-card">
                    <h3>${pagesWithMetadata}/${totalPages}</h3>
                    <p>Con Metadatos</p>
                </div>
                <div class="summary-card">
                    <h3 class="${avgScore >= 80 ? 'score-excellent' : avgScore >= 60 ? 'score-good' : 'score-poor'}">${avgScore.toFixed(1)}/100</h3>
                    <p>Puntuación Promedio</p>
                </div>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>📄 Análisis por Página</h2>
                ${pagesMetadata.map((page, index) => {
                  const url = page.file.replace('./app', 'https://astraconsulting.cl').replace('/page.tsx', '').replace('\\', '/');
                  const score = page.seoAnalysis?.score || 0;
                  const scoreClass = score >= 80 ? 'score-excellent' : score >= 60 ? 'score-good' : 'score-poor';
                  
                  return `
                    <div class="page-card">
                        <div class="page-header">
                            <div class="page-url">${index + 1}. ${url}</div>
                            <div class="page-score ${scoreClass}">${score}/100</div>
                        </div>
                        <div class="page-details">
                            ${page.title ? `
                                <div class="detail-row">
                                    <span class="detail-label">Título:</span>
                                    <span class="detail-value">"${page.title}" (${page.title.length} caracteres)</span>
                                </div>
                            ` : ''}
                            ${page.description ? `
                                <div class="detail-row">
                                    <span class="detail-label">Descripción:</span>
                                    <span class="detail-value">"${page.description.substring(0, 80)}..." (${page.description.length} caracteres)</span>
                                </div>
                            ` : ''}
                            ${page.keywords ? `
                                <div class="detail-row">
                                    <span class="detail-label">Keywords:</span>
                                    <span class="detail-value">${page.keywords.split(',').length} keywords</span>
                                </div>
                            ` : ''}
                            
                            ${page.seoAnalysis?.issues.length > 0 ? `
                                <div class="issues">
                                    <h4>⚠️ Problemas Detectados</h4>
                                    <ul>
                                        ${page.seoAnalysis.issues.map(issue => `<li>${issue}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            ${page.seoAnalysis?.suggestions.length > 0 ? `
                                <div class="suggestions">
                                    <h4>💡 Sugerencias de Mejora</h4>
                                    <ul>
                                        ${page.seoAnalysis.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                  `;
                }).join('')}
            </div>
            
            ${inconsistencies.length > 0 ? `
                <div class="section">
                    <h2>⚠️ Inconsistencias Detectadas</h2>
                    <div class="inconsistencies">
                        <h4>Problemas que requieren atención</h4>
                        ${inconsistencies.map((inconsistency, index) => `
                            <div style="margin-bottom: 15px;">
                                <strong>${index + 1}. ${inconsistency.type}</strong><br>
                                <span style="color: #721c24;">Severidad: ${inconsistency.severity}</span><br>
                                <span style="color: #721c24;">Sugerencia: ${inconsistency.suggestion}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="section">
                <h2>🎯 Recomendaciones Generales</h2>
                <div class="recommendations">
                    <h3>Mejores prácticas para optimizar tu SEO</h3>
                    <ol>
                        <li>Asegúrate de que cada página tenga un título único y descriptivo</li>
                        <li>Mantén las descripciones entre 120-160 caracteres</li>
                        <li>Incluye palabras clave relevantes en títulos y descripciones</li>
                        <li>Agrega metadatos OpenGraph y Twitter para todas las páginas</li>
                        <li>Implementa URLs canónicas para evitar contenido duplicado</li>
                        <li>Considera agregar structured data (JSON-LD) para mejor SEO</li>
                        <li>Revisa regularmente el sitemap.xml para asegurar que todas las páginas estén incluidas</li>
                        <li>Optimiza las imágenes con alt text descriptivo</li>
                        <li>Implementa breadcrumbs para mejor navegación y SEO</li>
                        <li>Usa títulos H1, H2, H3 de manera jerárquica</li>
                        <li>Incluye enlaces internos relevantes entre páginas</li>
                        <li>Optimiza la velocidad de carga de las páginas</li>
                        <li>Implementa un diseño mobile-first</li>
                        <li>Agrega testimonios y casos de éxito para credibilidad</li>
                        <li>Mantén el contenido actualizado y relevante</li>
                    </ol>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Reporte generado el ${new Date().toLocaleDateString('es-CL')} - Astra Consulting</p>
            <p>Transformando empresas con tecnología de vanguardia</p>
        </div>
    </div>
</body>
</html>
  `;

  return html;
}

// Función principal
function main() {
  console.log('🚀 Generando reporte HTML de SEO...');
  
  // Analizar todas las páginas
  const pagesMetadata = analyzeAllPages();
  
  // Detectar inconsistencias
  const inconsistencies = detectInconsistencies(pagesMetadata);
  
  // Generar HTML
  const html = generateHTMLReport(pagesMetadata, inconsistencies);
  
  // Guardar archivo
  const outputPath = './seo-report.html';
  fs.writeFileSync(outputPath, html, 'utf8');
  
  console.log(`✅ Reporte HTML generado exitosamente: ${outputPath}`);
  console.log('📋 Abre el archivo en tu navegador para ver el reporte completo');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { generateHTMLReport, analyzeAllPages };
