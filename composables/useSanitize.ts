import DOMPurify from 'isomorphic-dompurify'

export const useSanitize = () => {
  const sanitize = (html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p', 'span', 'div', 'code', 'pre'],
      ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class'],
      ALLOW_DATA_ATTR: false
    })
  }

  const sanitizeTerminal = (html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['span', 'div', 'br'],
      ALLOWED_ATTR: ['class'],
      ALLOW_DATA_ATTR: false
    })
  }

  return {
    sanitize,
    sanitizeTerminal
  }
}