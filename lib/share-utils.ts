// Utilidades para compartir contenido
export function sharePost(title: string, url: string) {
  if (navigator.share) {
    // Usar Web Share API si está disponible (móviles)
    navigator.share({
      title,
      text: `Lee este artículo: ${title}`,
      url
    }).catch(console.error)
  } else {
    // Fallback: copiar al portapapeles
    copyToClipboard(url)
    // Mostrar notificación
    showNotification('Enlace copiado al portapapeles')
  }
}

function showNotification(message: string) {
  // Crear notificación temporal
  const notification = document.createElement('div')
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `
  
  document.body.appendChild(notification)
  
  // Animar entrada
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 100)
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      // Mostrar toast de confirmación
      console.log('Enlace copiado al portapapeles')
    }).catch(console.error)
  } else {
    // Fallback para navegadores antiguos
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      console.log('Enlace copiado al portapapeles')
    } catch (err) {
      console.error('Error al copiar:', err)
    }
    document.body.removeChild(textArea)
  }
}

export function getShareUrl(platform: string, title: string, url: string): string {
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)
  
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
    default:
      return url
  }
}
