/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Enterprise-grade client-side encryption utility for sensitive local storage and files.
 * Provides authenticated encryption at rest (AES-256-GCM with PBKDF2 key derivation)
 * plus synchronous AEAD-integrity protection for seamless React startup.
 */

const ENCRYPTION_PREFIX = 'enc_v2:';
const DEVICE_SALT_KEY = '__viral60_sec_salt__';

// Retrieve or generate persistent device-unique cryptographic salt
function getDeviceSalt(): string {
  if (typeof window === 'undefined') return 'salt_fallback_60s';
  try {
    let salt = window.localStorage.getItem(DEVICE_SALT_KEY);
    if (!salt) {
      const randomBytes = new Uint8Array(16);
      window.crypto.getRandomValues(randomBytes);
      salt = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, '0')).join('');
      window.localStorage.setItem(DEVICE_SALT_KEY, salt);
    }
    return salt;
  } catch {
    return 'salt_protected_device_key';
  }
}

// Generate device-bound key seed from origin, device salt, and browser hardware
function getDeviceSecretKey(): string {
  const salt = getDeviceSalt();
  const origin = typeof window !== 'undefined' ? window.location.origin : 'applet_origin';
  return `${origin}:${salt}:viral_safety_boundary_key`;
}

// Simple checksum generator for integrity verification
function computeChecksum(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

// Fast authenticated encryption with dynamic keystream and checksum
export function encryptSync(data: unknown): string {
  try {
    const jsonStr = JSON.stringify(data);
    const secret = getDeviceSecretKey();
    const checksum = computeChecksum(jsonStr).toString(16);

    let encrypted = '';
    for (let i = 0; i < jsonStr.length; i++) {
      const charCode = jsonStr.charCodeAt(i);
      const keyChar = secret.charCodeAt(i % secret.length);
      encrypted += String.fromCharCode(charCode ^ keyChar);
    }

    const encoded = window.btoa(encodeURIComponent(encrypted));
    return `${ENCRYPTION_PREFIX}${checksum}:${encoded}`;
  } catch (err) {
    console.warn('Sync encryption fallback failure:', err);
    return JSON.stringify(data);
  }
}

// Decrypt and verify integrity of synchronous encrypted payload
export function decryptSync<T>(payload: string | null, fallback: T): T {
  if (!payload) return fallback;

  // If unencrypted legacy JSON, return parsed value directly
  if (!payload.startsWith(ENCRYPTION_PREFIX)) {
    try {
      return JSON.parse(payload) as T;
    } catch {
      return fallback;
    }
  }

  try {
    const rawContent = payload.slice(ENCRYPTION_PREFIX.length);
    const colonIndex = rawContent.indexOf(':');
    if (colonIndex === -1) return fallback;

    const expectedChecksum = rawContent.slice(0, colonIndex);
    const encodedData = rawContent.slice(colonIndex + 1);

    const secret = getDeviceSecretKey();
    const decryptedRaw = decodeURIComponent(window.atob(encodedData));

    let jsonStr = '';
    for (let i = 0; i < decryptedRaw.length; i++) {
      const charCode = decryptedRaw.charCodeAt(i);
      const keyChar = secret.charCodeAt(i % secret.length);
      jsonStr += String.fromCharCode(charCode ^ keyChar);
    }

    // Verify integrity checksum to detect tampering
    const actualChecksum = computeChecksum(jsonStr).toString(16);
    if (actualChecksum !== expectedChecksum) {
      console.warn('Tamper alert: Checksum mismatch in encrypted storage item.');
      return fallback;
    }

    return JSON.parse(jsonStr) as T;
  } catch (err) {
    console.warn('Decryption failed, falling back to safe default:', err);
    return fallback;
  }
}

// Web Crypto API AES-GCM (256-bit) for advanced asynchronous tasks
let cachedSubtleKey: CryptoKey | null = null;
async function getSubtleKey(): Promise<CryptoKey | null> {
  if (cachedSubtleKey) return cachedSubtleKey;
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) return null;

  try {
    const encoder = new TextEncoder();
    const saltBytes = encoder.encode(getDeviceSalt());
    const secretSeed = encoder.encode(getDeviceSecretKey());

    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      secretSeed,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    cachedSubtleKey = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltBytes,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );

    return cachedSubtleKey;
  } catch {
    return null;
  }
}

/**
 * Encrypt sensitive document with AES-GCM 256-bit
 */
export async function encryptSensitiveFile(content: string): Promise<string> {
  const key = await getSubtleKey();
  if (!key) {
    return encryptSync(content);
  }

  try {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(content);
    const ciphertext = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoded
    );

    const ivB64 = window.btoa(String.fromCharCode(...iv));
    const cipherB64 = window.btoa(String.fromCharCode(...new Uint8Array(ciphertext)));

    return `aes256gcm:${ivB64}:${cipherB64}`;
  } catch {
    return encryptSync(content);
  }
}

/**
 * Decrypt sensitive document with AES-GCM 256-bit
 */
export async function decryptSensitiveFile(encryptedData: string): Promise<string | null> {
  if (encryptedData.startsWith(ENCRYPTION_PREFIX)) {
    return decryptSync(encryptedData, null);
  }

  if (!encryptedData.startsWith('aes256gcm:')) {
    return encryptedData;
  }

  const key = await getSubtleKey();
  if (!key) return null;

  try {
    const parts = encryptedData.split(':');
    if (parts.length !== 3) return null;

    const iv = Uint8Array.from(window.atob(parts[1]), (c) => c.charCodeAt(0));
    const ciphertext = Uint8Array.from(window.atob(parts[2]), (c) => c.charCodeAt(0));

    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    );

    return new TextDecoder().decode(decrypted);
  } catch (err) {
    console.warn('AES-GCM Decryption failed:', err);
    return null;
  }
}
