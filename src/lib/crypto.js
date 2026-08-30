export const encryptApiKey = async (plainText, userId) => {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(userId + 'DEV_VAULT_SALT_2026'),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode('salt_vault'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plainText));
  
  // Safe base64 encode for large payloads
  let binary = '';
  const bytes = new Uint8Array(encrypted);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  
  let ivBinary = '';
  for (let i = 0; i < iv.length; i++) {
    ivBinary += String.fromCharCode(iv[i]);
  }
  
  return { encrypted_key: btoa(binary), iv: btoa(ivBinary) };
};

export const decryptApiKey = async (encryptedBase64, ivBase64, userId) => {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(userId + 'DEV_VAULT_SALT_2026'), { name: 'PBKDF2' }, false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: enc.encode('salt_vault'), iterations: 100000, hash: 'SHA-256' }, keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  
  const ivStr = atob(ivBase64);
  const iv = new Uint8Array(ivStr.length);
  for (let i = 0; i < ivStr.length; i++) iv[i] = ivStr.charCodeAt(i);
  
  const encStr = atob(encryptedBase64);
  const encrypted = new Uint8Array(encStr.length);
  for (let i = 0; i < encStr.length; i++) encrypted[i] = encStr.charCodeAt(i);
  
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted);
  return new TextDecoder().decode(decrypted);
};

