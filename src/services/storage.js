/**
 * DevVault Storage & Persistence Manager
 * Zero-Knowledge storage: All data is encrypted with AES-GCM-256 before hitting storage.
 */

import { encryptVault, decryptVault, createPasswordVerifier, verifyPassword } from './crypto';

const STORAGE_KEY_META = 'DEVVAULT_META_V1';
const STORAGE_KEY_DATA = 'DEVVAULT_DATA_V1';

const INITIAL_PROJECTS = [
  {
    id: 'global-keys',
    name: 'Claves Globales / Reutilizables',
    description: 'API Keys maestras de IA y servicios compartidos entre múltiples proyectos.',
    color: '#06b6d4',
    icon: 'Globe',
    createdAt: new Date().toISOString()
  },
  {
    id: 'primer-proyecto',
    name: 'Mi Primer Proyecto IA',
    description: 'Espacio de trabajo para experimentos con LLMs, agentes y bases de datos.',
    color: '#10b981',
    icon: 'Sparkles',
    createdAt: new Date().toISOString()
  }
];

export function isVaultInitialized() {
  const meta = localStorage.getItem(STORAGE_KEY_META);
  return Boolean(meta);
}

export function getVaultMeta() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_META);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function initVault(masterPassword, initialOptions = {}) {
  const verifierData = await createPasswordVerifier(masterPassword);

  const meta = {
    isInitialized: true,
    verifier: verifierData.verifier,
    salt: verifierData.salt,
    autoLockMinutes: initialOptions.autoLockMinutes || 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const initialVaultData = {
    projects: INITIAL_PROJECTS,
    secrets: [],
    tags: ['IA', 'Free-Tier', 'LLM', 'Base-Datos', 'Prod', 'Dev'],
    settings: {
      autoLockMinutes: initialOptions.autoLockMinutes || 15,
      theme: 'cyber-dark',
      maskByDefault: true,
      autoClearClipboardSeconds: 30
    }
  };

  // Encrypt and save
  const encryptedPayload = await encryptVault(initialVaultData, masterPassword);

  localStorage.setItem(STORAGE_KEY_META, JSON.stringify(meta));
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(encryptedPayload));

  return {
    meta,
    data: initialVaultData
  };
}

export async function unlockVault(masterPassword) {
  const meta = getVaultMeta();
  if (!meta) {
    throw new Error('No se ha encontrado ninguna caja fuerte inicializada.');
  }

  // Quick verification
  const isValid = await verifyPassword(masterPassword, {
    salt: meta.salt,
    verifier: meta.verifier
  });

  if (!isValid) {
    throw new Error('Contraseña maestra incorrecta.');
  }

  const rawEncrypted = localStorage.getItem(STORAGE_KEY_DATA);
  if (!rawEncrypted) {
    throw new Error('Los datos de la caja fuerte están vacíos o no se encontraron.');
  }

  const encryptedPackage = JSON.parse(rawEncrypted);
  const decryptedData = await decryptVault(encryptedPackage, masterPassword);

  // Update last unlocked timestamp in meta
  meta.lastUnlockedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY_META, JSON.stringify(meta));

  return decryptedData;
}

export async function saveVault(data, masterPassword) {
  if (!masterPassword) {
    throw new Error('No se puede guardar sin la contraseña maestra en memoria.');
  }

  const encryptedPackage = await encryptVault(data, masterPassword);
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(encryptedPackage));

  const meta = getVaultMeta() || {};
  meta.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY_META, JSON.stringify(meta));

  return true;
}

export async function changeMasterPassword(oldPassword, newPassword, currentData) {
  const meta = getVaultMeta();
  if (!meta) throw new Error('Caja fuerte no encontrada.');

  const isValid = await verifyPassword(oldPassword, {
    salt: meta.salt,
    verifier: meta.verifier
  });

  if (!isValid) {
    throw new Error('La contraseña actual es incorrecta.');
  }

  const newVerifierData = await createPasswordVerifier(newPassword);
  meta.verifier = newVerifierData.verifier;
  meta.salt = newVerifierData.salt;
  meta.updatedAt = new Date().toISOString();

  const encryptedPayload = await encryptVault(currentData, newPassword);

  localStorage.setItem(STORAGE_KEY_META, JSON.stringify(meta));
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(encryptedPayload));

  return true;
}

export async function exportEncryptedBackup(password, vaultData) {
  const backupPackage = await encryptVault({
    devVaultBackup: true,
    version: '1.0',
    exportedAt: new Date().toISOString(),
    vault: vaultData
  }, password);

  return JSON.stringify(backupPackage, null, 2);
}

export async function importEncryptedBackup(jsonString, password) {
  const parsedPackage = JSON.parse(jsonString);
  const decrypted = await decryptVault(parsedPackage, password);

  if (!decrypted.devVaultBackup && !decrypted.projects) {
    throw new Error('El archivo no parece ser un respaldo válido de DevVault.');
  }

  return decrypted.vault || decrypted;
}

export function resetAllVaultData() {
  localStorage.removeItem(STORAGE_KEY_META);
  localStorage.removeItem(STORAGE_KEY_DATA);
}
