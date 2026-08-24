/**
 * DevVault Cryptographic Engine
 * Uses Web Crypto API (SubtleCrypto)
 * - AES-GCM-256 for symmetric encryption
 * - PBKDF2 (SHA-256, 100,000 iterations) for key derivation
 * - Cryptographically random IVs & Salts
 */

const PBKDF2_ITERATIONS = 100000;
const HASH_ALGO = 'SHA-256';
const KEY_LENGTH = 256;

// Convert ArrayBuffer / Uint8Array to Base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Convert Base64 to Uint8Array
function base64ToUint8Array(base64) {
  const binary = window.atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Generate cryptographically secure random bytes
export function getRandomBytes(length = 16) {
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  return bytes;
}

/**
 * Derives an AES-GCM CryptoKey from a master password and salt using PBKDF2
 */
export async function deriveKey(password, saltUint8) {
  const encoder = new TextEncoder();
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltUint8,
      iterations: PBKDF2_ITERATIONS,
      hash: HASH_ALGO,
    },
    passwordKey,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Creates a verification hash to validate password without decrypting everything
 */
export async function createPasswordVerifier(password) {
  const salt = getRandomBytes(16);
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 50000,
      hash: HASH_ALGO,
    },
    keyMaterial,
    256
  );

  return {
    salt: arrayBufferToBase64(salt),
    verifier: arrayBufferToBase64(derivedBits)
  };
}

/**
 * Validates a password against a stored verification hash
 */
export async function verifyPassword(password, storedVerifier) {
  if (!storedVerifier || !storedVerifier.salt || !storedVerifier.verifier) return false;
  try {
    const salt = base64ToUint8Array(storedVerifier.salt);
    const encoder = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    const derivedBits = await window.crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 50000,
        hash: HASH_ALGO,
      },
      keyMaterial,
      256
    );

    const checkVerifier = arrayBufferToBase64(derivedBits);
    return checkVerifier === storedVerifier.verifier;
  } catch (err) {
    console.error('Password verification error:', err);
    return false;
  }
}

/**
 * Encrypts any JS object or string using AES-GCM-256
 */
export async function encryptVault(data, password) {
  const salt = getRandomBytes(16);
  const iv = getRandomBytes(12); // 96-bit standard IV for AES-GCM
  const key = await deriveKey(password, salt);

  const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(jsonStr);

  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv
    },
    key,
    encodedData
  );

  return {
    v: 1, // format version
    timestamp: new Date().toISOString(),
    salt: arrayBufferToBase64(salt),
    iv: arrayBufferToBase64(iv),
    ciphertext: arrayBufferToBase64(ciphertext)
  };
}

/**
 * Decrypts an encrypted payload with a password
 */
export async function decryptVault(encryptedPackage, password) {
  if (!encryptedPackage || !encryptedPackage.salt || !encryptedPackage.iv || !encryptedPackage.ciphertext) {
    throw new Error('Formato de paquete cifrado inválido o corrupto.');
  }

  const salt = base64ToUint8Array(encryptedPackage.salt);
  const iv = base64ToUint8Array(encryptedPackage.iv);
  const ciphertext = base64ToUint8Array(encryptedPackage.ciphertext);

  const key = await deriveKey(password, salt);

  try {
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    const jsonStr = decoder.decode(decryptedBuffer);
    return JSON.parse(jsonStr);
  } catch {
    throw new Error('Contraseña maestra incorrecta o datos cifrados corruptos.');
  }
}

/**
 * Password generator with customizable rules
 */
export function generateSecurePassword(options = {}) {
  const {
    length = 24,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
    excludeSimilar = false
  } = options;

  let chars = '';
  const uppercaseChars = excludeSimilar ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = excludeSimilar ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = excludeSimilar ? '23456789' : '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (uppercase) chars += uppercaseChars;
  if (lowercase) chars += lowercaseChars;
  if (numbers) chars += numberChars;
  if (symbols) chars += symbolChars;

  if (!chars) chars = lowercaseChars + numberChars;

  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);

  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }

  return result;
}

/**
 * Generate API token format (e.g. hex, base64, uuid, sk-...)
 */
export function generateApiToken(format = 'hex-32') {
  if (format === 'uuid') {
    return window.crypto.randomUUID ? window.crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  if (format === 'sk-bearer') {
    const bytes = getRandomBytes(24);
    return `sk-${arrayBufferToBase64(bytes).replace(/[+/=]/g, '').slice(0, 32)}`;
  }

  // default hex-32 or hex-64
  const len = format === 'hex-64' ? 32 : 16;
  const bytes = getRandomBytes(len);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Calculates password strength (0 to 100 score + label)
 */
export function evaluatePasswordStrength(password) {
  if (!password) return { score: 0, label: 'Vacía', color: 'text-slate-500' };

  let score = 0;
  if (password.length >= 8) score += 20;
  if (password.length >= 14) score += 20;
  if (password.length >= 20) score += 15;
  if (/[A-Z]/.test(password)) score += 15;
  if (/[a-z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^A-Za-z0-9]/.test(password)) score += 10;

  if (score < 40) return { score, label: 'Débil', color: 'text-red-400', barColor: 'bg-red-500' };
  if (score < 70) return { score, label: 'Media', color: 'text-amber-400', barColor: 'bg-amber-500' };
  if (score < 90) return { score, label: 'Fuerte', color: 'text-emerald-400', barColor: 'bg-emerald-500' };
  return { score: 100, label: 'Excelente (Blindada)', color: 'text-cyan-400', barColor: 'bg-cyan-500' };
}
