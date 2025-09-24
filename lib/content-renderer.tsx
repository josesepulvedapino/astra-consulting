import React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'

// Componentes para Portable Text (Sanity)
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 mt-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 mt-7">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 mt-6">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg md:text-xl font-bold text-foreground mb-3 mt-5">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-foreground">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-secondary pl-4 italic text-muted-foreground mb-4 bg-secondary/5 py-2 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 pl-5">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 pl-5">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-foreground leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-foreground leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a 
          href={value?.href} 
          target={target} 
          rel={target === '_blank' ? 'noopener noreferrer' : undefined} 
          className="text-secondary hover:underline font-medium"
        >
          {children}
        </a>
      )
    },
  },
}

// Función para detectar el tipo de contenido
function detectContentType(content: any): 'portable-text' | 'html' | 'plain-text' {
  // Si es null o undefined
  if (!content) {
    return 'plain-text'
  }
  
  // Si es un array, probablemente es Portable Text
  if (Array.isArray(content)) {
    // Verificar si es realmente Portable Text (tiene _type: 'block')
    if (content.length > 0 && content[0] && typeof content[0] === 'object' && content[0]._type === 'block') {
      return 'portable-text'
    }
    return 'plain-text'
  }
  
  // Si es string
  if (typeof content === 'string') {
    // Si contiene etiquetas HTML, es HTML
    if (/<[^>]*>/g.test(content)) {
      return 'html'
    }
    // Si es string sin etiquetas, es texto plano
    return 'plain-text'
  }
  
  // Si es objeto, probablemente es Portable Text
  if (typeof content === 'object' && content._type === 'block') {
    return 'portable-text'
  }
  
  // Por defecto, asumir texto plano
  return 'plain-text'
}

// Función para convertir HTML a JSX con estilos Tailwind (compatible con SSR)
function renderHTML(htmlString: string) {
  // Usar regex para parsear HTML de manera segura en SSR
  const parseHTML = (html: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = []
    let currentIndex = 0
    
    // Regex para encontrar etiquetas HTML
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^<>]*>/g
    let match
    
    while ((match = tagRegex.exec(html)) !== null) {
      const [fullMatch, tagName] = match
      const startIndex = match.index
      
      // Agregar texto antes de la etiqueta
      if (startIndex > currentIndex) {
        const text = html.slice(currentIndex, startIndex).trim()
        if (text) {
          elements.push(text)
        }
      }
      
      // Procesar etiqueta de apertura
      if (fullMatch.startsWith('</')) {
        // Etiqueta de cierre - no hacer nada aquí
      } else {
        // Etiqueta de apertura
        const endTagIndex = html.indexOf(`</${tagName}>`, startIndex)
        if (endTagIndex !== -1) {
          const content = html.slice(startIndex + fullMatch.length, endTagIndex)
          const element = createElement(tagName.toLowerCase(), content)
          if (element) {
            elements.push(element)
          }
          tagRegex.lastIndex = endTagIndex + `</${tagName}>`.length
          currentIndex = tagRegex.lastIndex
          continue
        }
      }
      
      currentIndex = startIndex + fullMatch.length
    }
    
    // Agregar texto restante
    if (currentIndex < html.length) {
      const remainingText = html.slice(currentIndex).trim()
      if (remainingText) {
        elements.push(remainingText)
      }
    }
    
    return elements
  }
  
  const createElement = (tagName: string, content: string): React.ReactNode => {
    const cleanContent = content.trim()
    
    switch (tagName) {
      case 'h1':
        return <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 mt-8">{cleanContent}</h1>
      case 'h2':
        return <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 mt-7">{cleanContent}</h2>
      case 'h3':
        return <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 mt-6">{cleanContent}</h3>
      case 'h4':
        return <h4 className="text-lg md:text-xl font-bold text-foreground mb-3 mt-5">{cleanContent}</h4>
      case 'p':
        return <p className="mb-4 leading-relaxed text-foreground">{cleanContent}</p>
      case 'ul':
        return <ul className="list-disc list-inside mb-4 space-y-2 pl-5">{parseListItems(cleanContent)}</ul>
      case 'ol':
        return <ol className="list-decimal list-inside mb-4 space-y-2 pl-5">{parseListItems(cleanContent)}</ol>
      case 'strong':
      case 'b':
        return <strong className="font-semibold text-foreground">{cleanContent}</strong>
      case 'em':
      case 'i':
        return <em className="italic">{cleanContent}</em>
      case 'a':
        return (
          <a 
            href="#" 
            className="text-secondary hover:underline font-medium"
          >
            {cleanContent}
          </a>
        )
      case 'blockquote':
        return (
          <blockquote className="border-l-4 border-secondary pl-4 italic text-muted-foreground mb-4 bg-secondary/5 py-2 rounded-r">
            {cleanContent}
          </blockquote>
        )
      default:
        return <span>{cleanContent}</span>
    }
  }
  
  const parseListItems = (content: string): React.ReactNode[] => {
    // Parsear elementos de lista (li)
    const liRegex = /<li[^>]*>(.*?)<\/li>/g
    const items: React.ReactNode[] = []
    let match
    
    while ((match = liRegex.exec(content)) !== null) {
      const itemContent = match[1]
      items.push(
        <li key={match.index} className="text-foreground leading-relaxed">
          {parseInlineHTML(itemContent)}
        </li>
      )
    }
    
    return items
  }
  
  const parseInlineHTML = (content: string): React.ReactNode => {
    // Parsear HTML inline como strong, em, etc.
    const strongRegex = /<strong[^>]*>(.*?)<\/strong>/gi
    const emRegex = /<em[^>]*>(.*?)<\/em>/gi
    const bRegex = /<b[^>]*>(.*?)<\/b>/gi
    const iRegex = /<i[^>]*>(.*?)<\/i>/gi
    
    let processedContent = content
    
    // Reemplazar strong y b (ambos para negrita)
    processedContent = processedContent.replace(strongRegex, (match, text) => {
      return `__STRONG__${text}__/STRONG__`
    })
    processedContent = processedContent.replace(bRegex, (match, text) => {
      return `__STRONG__${text}__/STRONG__`
    })
    
    // Reemplazar em e i (ambos para cursiva)
    processedContent = processedContent.replace(emRegex, (match, text) => {
      return `__EM__${text}__/EM__`
    })
    processedContent = processedContent.replace(iRegex, (match, text) => {
      return `__EM__${text}__/EM__`
    })
    
    // Dividir por marcadores y crear elementos
    const parts = processedContent.split(/(__STRONG__.*?__\/STRONG__|__EM__.*?__\/EM__)/)
    
    return parts.map((part, index) => {
      if (part.startsWith('__STRONG__') && part.endsWith('__/STRONG__')) {
        const text = part.replace(/^__STRONG__|__\/STRONG__$/g, '')
        return <strong key={index} className="font-semibold text-foreground">{text}</strong>
      }
      if (part.startsWith('__EM__') && part.endsWith('__/EM__')) {
        const text = part.replace(/^__EM__|__\/EM__$/g, '')
        return <em key={index} className="italic">{text}</em>
      }
      return part || ''
    }).filter(part => part !== '')
  }
  
  const elements = parseHTML(htmlString)
  return <div>{elements.map((element, index) => (
    <React.Fragment key={index}>{element}</React.Fragment>
  ))}</div>
}

// Función para convertir texto plano a JSX con estilos
function renderPlainText(text: string) {
  // Dividir por párrafos (doble salto de línea)
  const paragraphs = text.split(/\n\s*\n/)
  
  return (
    <div>
      {paragraphs.map((paragraph, index) => {
        const trimmedParagraph = paragraph.trim()
        if (!trimmedParagraph) return null
        
        // Detectar si es un título (línea corta sin punto al final)
        if (trimmedParagraph.length < 100 && !trimmedParagraph.endsWith('.') && !trimmedParagraph.endsWith(':')) {
          return (
            <h2 key={index} className="text-2xl md:text-3xl font-bold text-foreground mb-5 mt-7">
              {trimmedParagraph}
            </h2>
          )
        }
        
        // Detectar listas (líneas que empiezan con - o *)
        if (trimmedParagraph.includes('\n-') || trimmedParagraph.includes('\n*')) {
          const lines = trimmedParagraph.split('\n')
          const listItems = lines
            .map(line => line.trim())
            .filter(line => line.startsWith('-') || line.startsWith('*'))
            .map(line => line.substring(1).trim())
          
          return (
            <ul key={index} className="list-disc list-inside mb-4 space-y-2 pl-5">
              {listItems.map((item, itemIndex) => (
                <li key={itemIndex} className="text-foreground leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          )
        }
        
        // Párrafo normal
        return (
          <p key={index} className="mb-4 leading-relaxed text-foreground">
            {trimmedParagraph}
          </p>
        )
      })}
    </div>
  )
}

// Componente principal que detecta y renderiza el contenido
export function ContentRenderer({ content }: { content: any }) {
  if (!content) {
    return <p className="text-muted-foreground italic">Contenido no disponible</p>
  }
  
  const contentType = detectContentType(content)
  
  
  switch (contentType) {
    case 'portable-text':
      return <PortableText value={content} components={portableTextComponents} />
    
    case 'html':
      return renderHTML(content)
    
    case 'plain-text':
      return renderPlainText(content)
    
    default:
      return <p className="text-muted-foreground italic">Formato de contenido no soportado</p>
  }
}

// Función helper para usar en componentes
export function renderContent(content: any) {
  return <ContentRenderer content={content} />
}
