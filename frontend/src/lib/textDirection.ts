/**
 * Utility functions for text direction detection
 */

/**
 * Detects if text contains Arabic characters and should use RTL direction
 * @param text - The text to analyze
 * @returns 'rtl' if text contains Arabic characters, 'ltr' otherwise
 */
export function detectTextDirection(text: string): 'ltr' | 'rtl' {
  if (!text) return 'ltr'
  
  // Arabic Unicode range: U+0600 to U+06FF
  const arabicPattern = /[\u0600-\u06FF]/
  
  return arabicPattern.test(text) ? 'rtl' : 'ltr'
}

/**
 * Checks if text contains any Arabic characters
 * @param text - The text to check
 * @returns true if text contains Arabic characters
 */
export function hasArabicCharacters(text: string): boolean {
  if (!text) return false
  return /[\u0600-\u06FF]/.test(text)
}

/**
 * Gets the appropriate text alignment based on direction
 * @param dir - The text direction
 * @returns CSS text-align value
 */
export function getTextAlign(dir: 'ltr' | 'rtl'): 'left' | 'right' {
  return dir === 'rtl' ? 'right' : 'left'
}
