import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  isVaultInitialized, 
  initVault, 
  unlockVault, 
  saveVault, 
  resetAllVaultData 
} from './services/storage';

import { MasterPasswordSetup } from './components/auth/MasterPasswordSetup';
import { UnlockVault } from './components/auth/UnlockVault';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { SecretList } from './components/secrets/SecretList';

import { SecretModal } from './components/secrets/SecretModal';
import { SecretQuickView } from './components/secrets/SecretQuickView';
import { ProjectManagerModal } from './components/projects/ProjectManagerModal';
import { EnvStudioModal } from './components/projects/EnvStudioModal';
import { ApiTesterModal } from './components/tools/ApiTesterModal';
import { PasswordGeneratorModal } from './components/tools/PasswordGeneratorModal';
import { BackupModal } from './components/tools/BackupModal';
import { SettingsModal } from './components/tools/SettingsModal';

// Pro Tools Modals
import { AiPlaygroundModal } from './components/tools/AiPlaygroundModal';
import { SecurityAuditModal } from './components/tools/SecurityAuditModal';
import { EnvDiffModal } from './components/tools/EnvDiffModal';
import { SdkGeneratorModal } from './components/tools/SdkGeneratorModal';
import { CodeSanitizerModal } from './components/tools/CodeSanitizerModal';
import { TokenCalculatorModal } from './components/tools/TokenCalculatorModal';
import { TrashBinModal } from './components/secrets/TrashBinModal';
import { InteractiveGuideModal } from './components/guide/InteractiveGuideModal';

import { ConfirmModal } from './components/common/ConfirmModal';
import { ToastContainer } from './components/common/Toast';

export default function App() {
  // Vault state
  const [authState, setAuthState] = useState('CHECKING'); // 'CHECKING' | 'SETUP' | 'LOCKED' | 'UNLOCKED'
  const [masterPassword, setMasterPassword] = useState('');
  const [vaultData, setVaultData] = useState(null);

  // Navigation & Filtering
  const [activeProjectId, setActiveProjectId] = useState('all');
  const [activeEnvironment, setActiveEnvironment] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [editingSecret, setEditingSecret] = useState(null);
  const [presetProviderId, setPresetProviderId] = useState(null);

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [inspectingSecret, setInspectingSecret] = useState(null);

  const [isProjectManagerOpen, setIsProjectManagerOpen] = useState(false);
  const [isEnvStudioOpen, setIsEnvStudioOpen] = useState(false);
  const [isApiTesterOpen, setIsApiTesterOpen] = useState(false);
  const [testerInitialData, setTesterInitialData] = useState({ provider: 'gemini', key: '' });

  const [isPasswordGeneratorOpen, setIsPasswordGeneratorOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Pro Suite Modals
  const [isAiPlaygroundOpen, setIsAiPlaygroundOpen] = useState(false);
  const [isSecurityAuditOpen, setIsSecurityAuditOpen] = useState(false);
  const [isEnvDiffOpen, setIsEnvDiffOpen] = useState(false);
  const [isSdkModalOpen, setIsSdkModalOpen] = useState(false);
  const [sdkSelectedSecret, setSdkSelectedSecret] = useState(null);
  const [isSanitizerOpen, setIsSanitizerOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isTrashBinOpen, setIsTrashBinOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Confirmation Modal
  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirmar',
    isDanger: true,
    onConfirm: () => {}
  });

  // Toasts
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).slice(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
  };
  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Inactivity Auto-Lock
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const resetActivity = useCallback(() => {
    setLastActivityTime(Date.now());
  }, []);

  // Initial check
  useEffect(() => {
    if (isVaultInitialized()) {
      setAuthState('LOCKED');
    } else {
      setAuthState('SETUP');
    }
  }, []);

  // Activity listeners when unlocked
  useEffect(() => {
    if (authState !== 'UNLOCKED') return;

    const handleUserActivity = () => resetActivity();
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
    };
  }, [authState, resetActivity]);

  // Check auto lock expiration
  useEffect(() => {
    if (authState !== 'UNLOCKED') return;
    const mins = vaultData?.settings?.autoLockMinutes || 15;
    if (mins === 0) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivityTime;
      if (elapsed >= mins * 60 * 1000) {
        handleLockVault();
        addToast('La caja fuerte se ha bloqueado por inactividad.', 'info');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [authState, lastActivityTime, vaultData?.settings?.autoLockMinutes]);

  // Save changes
  const saveChanges = async (newData) => {
    setVaultData(newData);
    if (masterPassword && authState === 'UNLOCKED') {
      try {
        await saveVault(newData, masterPassword);
      } catch (err) {
        console.error('Error saving vault:', err);
        addToast('Error al guardar cambios', 'error');
      }
    }
  };

  // Vault lifecycle
  const handleSetupComplete = async (newMasterPassword, options) => {
    const initialized = await initVault(newMasterPassword, options);
    setMasterPassword(newMasterPassword);
    setVaultData(initialized.data);
    setAuthState('UNLOCKED');
    addToast('¡Caja fuerte creada y blindada con éxito!', 'success');
  };

  const handleUnlock = async (enteredPassword) => {
    const data = await unlockVault(enteredPassword);
    setMasterPassword(enteredPassword);
    setVaultData(data);
    setAuthState('UNLOCKED');
    setLastActivityTime(Date.now());
    addToast('Caja fuerte desbloqueada.', 'success');
  };

  const handleLockVault = () => {
    setMasterPassword('');
    setVaultData(null);
    setAuthState('LOCKED');
  };

  // Secret Actions
  const handleSaveSecret = (secretPayload) => {
    const existingIndex = (vaultData?.secrets || []).findIndex(s => s.id === secretPayload.id);
    let updatedSecrets = [];

    if (existingIndex >= 0) {
      updatedSecrets = [...vaultData.secrets];
      updatedSecrets[existingIndex] = secretPayload;
      addToast(`Secreto "${secretPayload.title}" actualizado.`, 'success');
    } else {
      updatedSecrets = [secretPayload, ...(vaultData?.secrets || [])];
      addToast(`Secreto "${secretPayload.title}" guardado y cifrado.`, 'success');
    }

    saveChanges({
      ...vaultData,
      secrets: updatedSecrets
    });
  };

  // Soft Delete to Trash Bin
  const handleDeleteSecret = (secret) => {
    const deletedItem = {
      ...secret,
      deletedAt: new Date().toISOString()
    };

    const remainingSecrets = (vaultData?.secrets || []).filter(s => s.id !== secret.id);
    const updatedTrash = [deletedItem, ...(vaultData?.trash || [])];

    saveChanges({
      ...vaultData,
      secrets: remainingSecrets,
      trash: updatedTrash
    });

    addToast(`Secreto movido a la papelera de reciclaje.`, 'info');
  };

  // Restore from Trash
  const handleRestoreSecret = (secretId) => {
    const itemToRestore = (vaultData?.trash || []).find(s => s.id === secretId);
    if (!itemToRestore) return;

    const cleanItem = { ...itemToRestore };
    delete cleanItem.deletedAt;

    const remainingTrash = (vaultData?.trash || []).filter(s => s.id !== secretId);
    const updatedSecrets = [cleanItem, ...(vaultData?.secrets || [])];

    saveChanges({
      ...vaultData,
      secrets: updatedSecrets,
      trash: remainingTrash
    });

    addToast(`Secreto restaurado a la lista principal.`, 'success');
  };

  // Permanent Delete
  const handlePermanentDeleteSecret = (secretId) => {
    const remainingTrash = (vaultData?.trash || []).filter(s => s.id !== secretId);
    saveChanges({
      ...vaultData,
      trash: remainingTrash
    });
    addToast(`Secreto eliminado definitivamente.`, 'info');
  };

  const handleEmptyTrash = () => {
    setConfirmConfig({
      isOpen: true,
      title: '¿Vaciar Papelera?',
      message: '¿Estás seguro de que deseas eliminar permanentemente todos los elementos de la papelera? Esta acción no se puede deshacer.',
      confirmText: 'Vaciar Papelera',
      isDanger: true,
      onConfirm: () => {
        saveChanges({
          ...vaultData,
          trash: []
        });
        addToast('Papelera vaciada.', 'info');
      }
    });
  };

  // Toggle Favorite
  const handleToggleFavorite = (secretId) => {
    const updatedSecrets = (vaultData?.secrets || []).map(s => {
      if (s.id === secretId) {
        return { ...s, isFavorite: !s.isFavorite };
      }
      return s;
    });

    saveChanges({
      ...vaultData,
      secrets: updatedSecrets
    });
  };

  // Project Actions
  const handleSaveProject = (projectData) => {
    const existingIndex = (vaultData?.projects || []).findIndex(p => p.id === projectData.id);
    let updatedProjects = [];

    if (existingIndex >= 0) {
      updatedProjects = [...vaultData.projects];
      updatedProjects[existingIndex] = projectData;
      addToast(`Proyecto "${projectData.name}" actualizado.`, 'success');
    } else {
      updatedProjects = [...(vaultData?.projects || []), projectData];
      addToast(`Proyecto "${projectData.name}" creado.`, 'success');
    }

    saveChanges({
      ...vaultData,
      projects: updatedProjects
    });
  };

  const handleDeleteProject = (projectId) => {
    const project = vaultData.projects.find(p => p.id === projectId);
    const associatedCount = vaultData.secrets.filter(s => s.projectId === projectId).length;

    setConfirmConfig({
      isOpen: true,
      title: '¿Eliminar Proyecto?',
      message: `¿Estás seguro de que deseas eliminar el proyecto "${project?.name}"? Sus ${associatedCount} secretos asociados se moverán al espacio Global.`,
      confirmText: 'Eliminar Proyecto',
      isDanger: true,
      onConfirm: () => {
        const filteredProjects = vaultData.projects.filter(p => p.id !== projectId);
        const updatedSecrets = vaultData.secrets.map(s => {
          if (s.projectId === projectId) {
            return { ...s, projectId: 'global-keys' };
          }
          return s;
        });

        if (activeProjectId === projectId) {
          setActiveProjectId('all');
        }

        saveChanges({
          ...vaultData,
          projects: filteredProjects,
          secrets: updatedSecrets
        });
        addToast(`Proyecto "${project?.name}" eliminado.`, 'info');
      }
    });
  };

  // Import batch secrets from .env
  const handleImportSecrets = (newSecrets) => {
    const merged = [...newSecrets, ...(vaultData?.secrets || [])];
    saveChanges({
      ...vaultData,
      secrets: merged
    });
    addToast(`¡Se importaron y cifraron ${newSecrets.length} secretos con éxito!`, 'success');
  };

  // Restore backup
  const handleRestoreVaultData = (restoredVault) => {
    saveChanges(restoredVault);
    addToast('¡Caja fuerte restaurada correctamente desde el respaldo!', 'success');
  };

  // Reset Vault
  const handleRequestResetVault = () => {
    setConfirmConfig({
      isOpen: true,
      title: '⚠️ ¿REINICIAR CAJA FUERTE POR COMPLETO?',
      message: '¡ATENCIÓN! Esto borrará permanentemente todas tus claves, proyectos y configuración cifrada de este dispositivo.',
      confirmText: 'BORRAR TODO Y REINICIAR',
      isDanger: true,
      onConfirm: () => {
        resetAllVaultData();
        setMasterPassword('');
        setVaultData(null);
        setAuthState('SETUP');
        setIsSettingsModalOpen(false);
        addToast('Bóveda reseteada por completo.', 'info');
      }
    });
  };

  // Quick Open Handlers
  const handleOpenNewSecretWithPreset = (providerId) => {
    setPresetProviderId(providerId);
    setEditingSecret(null);
    setIsSecretModalOpen(true);
  };

  const handleTestApiSecret = (secret) => {
    setTesterInitialData({
      provider: secret.providerId || 'gemini',
      key: secret.value
    });
    setIsApiTesterOpen(true);
  };

  const handleOpenSdkForSecret = (secret) => {
    setSdkSelectedSecret(secret);
    setIsSdkModalOpen(true);
  };

  const handleCopySecretToast = (name) => {
    addToast(`Clave "${name}" copiada al portapapeles.`, 'success');
  };

  const currentProjectObj = activeProjectId === 'all' 
    ? { id: 'all', name: 'Todos los Proyectos', description: 'Visor universal de claves y credenciales.' }
    : vaultData?.projects?.find(p => p.id === activeProjectId) || { name: 'Proyecto' };

  if (authState === 'CHECKING') {
    return (
      <div className="min-h-screen bg-vault-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authState === 'SETUP') {
    return (
      <>
        <MasterPasswordSetup onComplete={handleSetupComplete} />
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  if (authState === 'LOCKED') {
    return (
      <>
        <UnlockVault
          onUnlock={handleUnlock}
          onResetRequest={handleRequestResetVault}
          onImportBackupRequest={() => setIsBackupModalOpen(true)}
        />
        
        <BackupModal
          isOpen={isBackupModalOpen}
          onClose={() => setIsBackupModalOpen(false)}
          vaultData={null}
          masterPassword=""
          onRestoreVaultData={(restored) => {
            setVaultData(restored);
            setAuthState('UNLOCKED');
            setIsBackupModalOpen(false);
            addToast('Respaldo restaurado.', 'success');
          }}
        />

        <ConfirmModal
          isOpen={confirmConfig.isOpen}
          onClose={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
          onConfirm={confirmConfig.onConfirm}
          title={confirmConfig.title}
          message={confirmConfig.message}
          confirmText={confirmConfig.confirmText}
          isDanger={confirmConfig.isDanger}
        />

        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-vault-950 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. Navbar */}
      <Navbar
        vaultData={vaultData}
        activeProject={currentProjectObj}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNewSecret={() => {
          setEditingSecret(null);
          setPresetProviderId('google-ai-studio');
          setIsSecretModalOpen(true);
        }}
        onOpenEnvStudio={() => setIsEnvStudioOpen(true)}
        onOpenApiTester={() => {
          setTesterInitialData({ provider: 'gemini', key: '' });
          setIsApiTesterOpen(true);
        }}
        onOpenPasswordGenerator={() => setIsPasswordGeneratorOpen(true)}
        onOpenBackup={() => setIsBackupModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onOpenAiPlayground={() => setIsAiPlaygroundOpen(true)}
        onOpenSecurityAudit={() => setIsSecurityAuditOpen(true)}
        onOpenEnvDiff={() => setIsEnvDiffOpen(true)}
        onOpenSanitizer={() => setIsSanitizerOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onLockVault={handleLockVault}
        autoLockMinutes={vaultData?.settings?.autoLockMinutes || 15}
        lastActivityTime={lastActivityTime}
      />

      {/* 2. Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          projects={vaultData?.projects || []}
          activeProjectId={activeProjectId}
          setActiveProjectId={setActiveProjectId}
          activeEnvironment={activeEnvironment}
          setActiveEnvironment={setActiveEnvironment}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          secrets={vaultData?.secrets || []}
          trashSecrets={vaultData?.trash || []}
          onOpenProjectManager={() => setIsProjectManagerOpen(true)}
          onOpenEnvStudio={() => setIsEnvStudioOpen(true)}
          onOpenApiTester={() => setIsApiTesterOpen(true)}
          onOpenPasswordGenerator={() => setIsPasswordGeneratorOpen(true)}
          onOpenAiPlayground={() => setIsAiPlaygroundOpen(true)}
          onOpenSecurityAudit={() => setIsSecurityAuditOpen(true)}
          onOpenEnvDiff={() => setIsEnvDiffOpen(true)}
          onOpenSdk={() => {
            setSdkSelectedSecret(null);
            setIsSdkModalOpen(true);
          }}
          onOpenSanitizer={() => setIsSanitizerOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
          onOpenTrashBin={() => setIsTrashBinOpen(true)}
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        <main className="flex-1 flex flex-col overflow-y-auto bg-gradient-to-b from-vault-950 to-vault-900">
          <SecretList
            secrets={vaultData?.secrets || []}
            projects={vaultData?.projects || []}
            activeProject={currentProjectObj}
            activeEnvironment={activeEnvironment}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onOpenNewSecret={() => {
              setEditingSecret(null);
              setPresetProviderId(null);
              setIsSecretModalOpen(true);
            }}
            onOpenEnvStudio={() => setIsEnvStudioOpen(true)}
            onEditSecret={(sec) => {
              setEditingSecret(sec);
              setIsSecretModalOpen(true);
            }}
            onDeleteSecret={handleDeleteSecret}
            onQuickViewSecret={(sec) => {
              setInspectingSecret(sec);
              setIsQuickViewOpen(true);
            }}
            onTestApiSecret={handleTestApiSecret}
            onCopySecret={handleCopySecretToast}
            onSelectProviderPreset={handleOpenNewSecretWithPreset}
            onToggleFavorite={handleToggleFavorite}
            onOpenSdk={handleOpenSdkForSecret}
          />
        </main>
      </div>

      {/* 3. Core Modals */}
      
      {/* Secret Create / Edit Modal */}
      <SecretModal
        isOpen={isSecretModalOpen}
        onClose={() => {
          setIsSecretModalOpen(false);
          setEditingSecret(null);
          setPresetProviderId(null);
        }}
        onSave={handleSaveSecret}
        editingSecret={editingSecret}
        initialProviderId={presetProviderId}
        projects={vaultData?.projects || []}
        activeProjectId={activeProjectId}
      />

      {/* Quick View / Code Inspector Modal */}
      <SecretQuickView
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setInspectingSecret(null);
        }}
        secret={inspectingSecret}
        projectName={vaultData?.projects?.find(p => p.id === inspectingSecret?.projectId)?.name}
      />

      {/* Project Manager Modal */}
      <ProjectManagerModal
        isOpen={isProjectManagerOpen}
        onClose={() => setIsProjectManagerOpen(false)}
        projects={vaultData?.projects || []}
        secrets={vaultData?.secrets || []}
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
      />

      {/* Env Studio Modal */}
      <EnvStudioModal
        isOpen={isEnvStudioOpen}
        onClose={() => setIsEnvStudioOpen(false)}
        projects={vaultData?.projects || []}
        secrets={vaultData?.secrets || []}
        activeProjectId={activeProjectId}
        onImportSecrets={handleImportSecrets}
      />

      {/* API Tester Modal */}
      <ApiTesterModal
        isOpen={isApiTesterOpen}
        onClose={() => setIsApiTesterOpen(false)}
        initialProvider={testerInitialData.provider}
        initialApiKey={testerInitialData.key}
        secrets={vaultData?.secrets || []}
      />

      {/* Password Generator Modal */}
      <PasswordGeneratorModal
        isOpen={isPasswordGeneratorOpen}
        onClose={() => setIsPasswordGeneratorOpen(false)}
      />

      {/* Backup Modal */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        vaultData={vaultData}
        masterPassword={masterPassword}
        onRestoreVaultData={handleRestoreVaultData}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        vaultData={vaultData}
        masterPassword={masterPassword}
        onUpdateSettings={(newSettings) => {
          saveChanges({
            ...vaultData,
            settings: { ...vaultData.settings, ...newSettings }
          });
          addToast('Ajustes guardados.', 'success');
        }}
        onPasswordChanged={(newPwd) => {
          setMasterPassword(newPwd);
          addToast('Contraseña maestra actualizada.', 'success');
        }}
        onRequestResetVault={handleRequestResetVault}
      />

      {/* 4. Pro Suite Modals */}
      
      {/* AI Playground */}
      <AiPlaygroundModal
        isOpen={isAiPlaygroundOpen}
        onClose={() => setIsAiPlaygroundOpen(false)}
        secrets={vaultData?.secrets || []}
      />

      {/* Security Audit */}
      <SecurityAuditModal
        isOpen={isSecurityAuditOpen}
        onClose={() => setIsSecurityAuditOpen(false)}
        vaultData={vaultData}
        onEditSecret={(sec) => {
          setEditingSecret(sec);
          setIsSecretModalOpen(true);
        }}
      />

      {/* Env Diff */}
      <EnvDiffModal
        isOpen={isEnvDiffOpen}
        onClose={() => setIsEnvDiffOpen(false)}
        projects={vaultData?.projects || []}
        secrets={vaultData?.secrets || []}
      />

      {/* SDK Studio */}
      <SdkGeneratorModal
        isOpen={isSdkModalOpen}
        onClose={() => {
          setIsSdkModalOpen(false);
          setSdkSelectedSecret(null);
        }}
        secrets={vaultData?.secrets || []}
        initialSecret={sdkSelectedSecret}
      />

      {/* Code Sanitizer */}
      <CodeSanitizerModal
        isOpen={isSanitizerOpen}
        onClose={() => setIsSanitizerOpen(false)}
      />

      {/* Token & Cost Calculator */}
      <TokenCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      {/* Trash Bin Modal */}
      <TrashBinModal
        isOpen={isTrashBinOpen}
        onClose={() => setIsTrashBinOpen(false)}
        trashSecrets={vaultData?.trash || []}
        onRestoreSecret={handleRestoreSecret}
        onPermanentDeleteSecret={handlePermanentDeleteSecret}
        onEmptyTrash={handleEmptyTrash}
      />

      {/* Interactive Guide Center */}
      <InteractiveGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.confirmText}
        isDanger={confirmConfig.isDanger}
      />

      {/* Toasts Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

    </div>
  );
}
