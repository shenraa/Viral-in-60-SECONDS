/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Security sanitization and anti-injection utilities
 */

/**
 * Sanitize untrusted user string inputs (anti-XSS and control character stripping)
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .slice(0, maxLength)
    // Strip HTML tags
    .replace(/<[^>]*>?/gm, '')
    // Strip dangerous protocol prefixes
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    // Normalize whitespace
    .trim();
}

/**
 * Redact sensitive PII (emails, telephone numbers, card numbers) from user text
 */
export function redactSensitiveData(input: string): string {
  if (!input) return '';

  return input
    // Mask email addresses
    .replace(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g, '[REDACTED_EMAIL]')
    // Mask phone numbers
    .replace(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g, '[REDACTED_PHONE]');
}

/**
 * Validate that an identifier strictly matches safe regex criteria
 */
export function isValidIdentifier(id: string): boolean {
  if (!id || typeof id !== 'string') return false;
  return id.length <= 128 && /^[a-zA-Z0-9_-]+$/.test(id);
}
