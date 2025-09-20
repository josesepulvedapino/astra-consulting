# 🔍 SEO Checker para Astra Consulting

Este script analiza automáticamente todas las páginas de tu aplicación Next.js para verificar la calidad del SEO, detectar inconsistencias y sugerir mejoras.

## 🚀 Características

- ✅ **Análisis completo de metadatos**: Títulos, descripciones, keywords
- ✅ **Detección de inconsistencias**: Títulos duplicados, descripciones repetidas
- ✅ **Puntuación SEO**: Sistema de puntuación de 0-100 para cada página
- ✅ **Sugerencias específicas**: Recomendaciones personalizadas para cada página
- ✅ **Análisis de calidad**: Longitud óptima de títulos y descripciones
- ✅ **Reporte detallado**: Resumen completo con colores y formato legible

## 📋 Qué analiza

### Metadatos básicos
- **Títulos**: Longitud, unicidad, palabras clave
- **Descripciones**: Longitud, relevancia, unicidad
- **Keywords**: Cantidad, relevancia, diversificación

### Metadatos avanzados
- **OpenGraph**: Para compartir en redes sociales
- **Twitter Cards**: Para compartir en Twitter
- **URLs canónicas**: Para evitar contenido duplicado
- **Robots**: Para control de indexación

### Inconsistencias detectadas
- Títulos duplicados entre páginas
- Descripciones repetidas
- Keywords sobreutilizadas
- Metadatos faltantes

## 🛠️ Cómo usar

### Opción 1: Ejecución directa
```bash
node seo-checker.js
```

### Opción 2: Script simplificado
```bash
node run-seo-check.js
```

### Opción 3: Hacer ejecutable (Linux/Mac)
```bash
chmod +x seo-checker.js
./seo-checker.js
```

## 📊 Interpretación de resultados

### Puntuación SEO
- **80-100**: Excelente SEO ✅
- **60-79**: Buen SEO, mejoras menores 🟡
- **0-59**: SEO deficiente, requiere mejoras 🔴

### Severidad de problemas
- **Alta**: Problemas críticos que afectan el SEO
- **Media**: Problemas que pueden mejorarse
- **Baja**: Sugerencias de optimización

## 📄 Páginas analizadas

El script analiza automáticamente todas las páginas que encuentre en:
- `app/page.tsx` (página principal)
- `app/*/page.tsx` (todas las subpáginas)

### Páginas actuales detectadas:
- `/` - Página principal
- `/servicios` - Página de servicios
- `/sobre-nosotros` - Página sobre nosotros
- `/casos-exito` - Casos de éxito
- `/politica-privacidad` - Política de privacidad
- `/terminos-servicio` - Términos de servicio
- `/cookies` - Política de cookies

## 🎯 Recomendaciones generales

### Títulos
- Longitud óptima: 30-60 caracteres
- Incluir palabras clave relevantes
- Ser únicos para cada página
- Incluir "Astra Consulting" cuando sea apropiado

### Descripciones
- Longitud óptima: 120-160 caracteres
- Descriptivas y atractivas
- Incluir call-to-action
- Únicas para cada página

### Keywords
- 5-15 keywords por página
- Relevantes al contenido
- Diversificadas entre páginas
- Incluir variaciones y sinónimos

### Metadatos sociales
- OpenGraph para Facebook/LinkedIn
- Twitter Cards para Twitter
- Imágenes optimizadas (1200x630px)
- URLs canónicas para evitar duplicados

## 🔧 Personalización

Puedes modificar el script para:
- Cambiar los criterios de puntuación
- Agregar nuevas métricas de análisis
- Modificar las recomendaciones
- Cambiar el formato del reporte

### Variables configurables:
```javascript
const BASE_URL = 'https://astraconsulting.cl';
const APP_DIR = './app';
```

## 📈 Mejores prácticas SEO

1. **Contenido único**: Cada página debe tener contenido único y valioso
2. **Estructura clara**: Usar H1, H2, H3 de manera jerárquica
3. **URLs amigables**: URLs descriptivas y cortas
4. **Velocidad**: Optimizar imágenes y código
5. **Mobile-first**: Diseño responsive
6. **Enlaces internos**: Conectar páginas relevantes
7. **Structured data**: Implementar JSON-LD
8. **Sitemap**: Mantener sitemap.xml actualizado

## 🐛 Solución de problemas

### Error: "No se encontró export const metadata"
- Verifica que la página tenga metadatos exportados
- Asegúrate de que el formato sea correcto

### Error: "Archivo no encontrado"
- Verifica que estés ejecutando desde la raíz del proyecto
- Confirma que la estructura de carpetas sea correcta

### Resultados inesperados
- Revisa que los metadatos estén en el formato correcto
- Verifica que no haya errores de sintaxis en los archivos

## 📞 Soporte

Si encuentras problemas o tienes sugerencias:
- Revisa la documentación de Next.js sobre metadatos
- Consulta las mejores prácticas de SEO
- Verifica la sintaxis de tus archivos de metadatos

---

**Desarrollado para Astra Consulting** 🚀
*Transformando empresas con tecnología de vanguardia*
