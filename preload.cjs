const { contextBridge, ipcRenderer } = require('electron');
const { setupAppCreationAPI } = require('./components/app-creation/preload/index.cjs');

// Set up the app creation API
setupAppCreationAPI();

// Expose protected methods that allow the renderer process to use
// IPC communication with the main process
contextBridge.exposeInMainWorld(
  'electronAPI', 
  {
    // Window management
    openWindow: async (type, params = {}) => {
      try {
        return await ipcRenderer.invoke('open-window', { type, params });
      } catch (error) {
        console.error('Error opening window:', error);
        throw error;
      }
    },
    closeCurrentWindow: () => {
      try {
        ipcRenderer.invoke('close-current-window');
      } catch (error) {
        console.error('Error closing window:', error);
        throw error;
      }
    },
    getWindowParams: async () => {
      try {
        return await ipcRenderer.invoke('get-window-params');
      } catch (error) {
        console.error('Error getting window params:', error);
        throw error;
      }
    },
    
    // Inter-window communication
    notifyAppUpdated: () => {
      try {
        ipcRenderer.invoke('notify-app-updated');
      } catch (error) {
        console.error('Error notifying app updated:', error);
        throw error;
      }
    },
    notifyApiKeyUpdated: () => {
      try {
        ipcRenderer.invoke('notify-api-key-updated');
      } catch (error) {
        console.error('Error notifying API key updated:', error);
        throw error;
      }
    },
    onAppUpdated: (callback) => {
      ipcRenderer.on('app-updated', () => callback());
    },
    onApiKeyUpdated: (callback) => {
      ipcRenderer.on('api-key-updated', () => callback());
    },
    
    // Claude API key management
    setApiKey: async (apiKey) => {
      try {
        return await ipcRenderer.invoke('set-api-key', apiKey);
      } catch (error) {
        console.error('Error setting API key:', error);
        throw error;
      }
    },
    checkApiKey: async () => {
      try {
        return await ipcRenderer.invoke('check-api-key');
      } catch (error) {
        console.error('Error checking API key:', error);
        throw error;
      }
    },
    
    // Mini app generation and management
    // Note: These are kept for backward compatibility
    // New code should use the appCreationService API
    generateMiniApp: async (params) => {
      try {
        return await ipcRenderer.invoke('generate-mini-app', params);
      } catch (error) {
        console.error('Error generating mini app:', error);
        throw error;
      }
    },
    generateWidget: async (params) => {
      try {
        return await ipcRenderer.invoke('generate-widget', params);
      } catch (error) {
        console.error('Error generating widget:', error);
        throw error;
      }
    },
    listMiniApps: async () => {
      try {
        return await ipcRenderer.invoke('list-mini-apps');
      } catch (error) {
        console.error('Error listing mini apps:', error);
        throw error;
      }
    },
    // Widget management
    listWidgets: async () => {
      try {
        return await ipcRenderer.invoke('list-widgets');
      } catch (error) {
        console.error('Error listing widgets:', error);
        throw error;
      }
    },
    openMiniApp: async (params) => {
      try {
        return await ipcRenderer.invoke('open-mini-app', params);
      } catch (error) {
        console.error('Error opening mini app:', error);
        throw error;
      }
    },
    openWidget: async (params) => {
      try {
        return await ipcRenderer.invoke('open-widget', params);
      } catch (error) {
        console.error('Error opening widget:', error);
        throw error;
      }
    },
    updateMiniApp: async (params) => {
      try {
        return await ipcRenderer.invoke('update-mini-app', params);
      } catch (error) {
        console.error('Error updating mini app:', error);
        throw error;
      }
    },
    updateWidget: async (params) => {
      try {
        return await ipcRenderer.invoke('update-widget', params);
      } catch (error) {
        console.error('Error updating widget:', error);
        throw error;
      }
    },
    deleteMiniApp: async (params) => {
      try {
        return await ipcRenderer.invoke('delete-mini-app', params);
      } catch (error) {
        console.error('Error deleting mini app:', error);
        throw error;
      }
    },
    deleteWidget: async (params) => {
      try {
        return await ipcRenderer.invoke('delete-widget', params);
      } catch (error) {
        console.error('Error deleting widget:', error);
        throw error;
      }
    },
    exportMiniApp: async (params) => {
      try {
        return await ipcRenderer.invoke('export-mini-app', params);
      } catch (error) {
        console.error('Error exporting mini app:', error);
        throw error;
      }
    },
    exportWidget: async (params) => {
      try {
        return await ipcRenderer.invoke('export-widget', params);
      } catch (error) {
        console.error('Error exporting widget:', error);
        throw error;
      }
    },
    importMiniApp: async () => {
      try {
        return await ipcRenderer.invoke('import-mini-app');
      } catch (error) {
        console.error('Error importing mini app:', error);
        throw error;
      }
    },
    importWidget: async () => {
      try {
        return await ipcRenderer.invoke('import-widget');
      } catch (error) {
        console.error('Error importing widget:', error);
        throw error;
      }
    },
    openAppDirectory: async () => {
      try {
        return await ipcRenderer.invoke('open-widget-directory');
      } catch (error) {
        console.error('Error opening app directory:', error);
        throw error;
      }
    },
    
    // Event listeners for generation progress
    // Note: These are kept for backward compatibility
    // New code should use the appCreationService API
    onGenerationStatus: (callback) => {
      ipcRenderer.on('generation-status', (_event, status) => callback(status));
    },
    onGenerationChunk: (callback) => {
      ipcRenderer.on('generation-chunk', (_event, chunk) => callback(chunk));
    },
    
    // Title and description generation
    // Note: These are kept for backward compatibility
    // New code should use the appCreationService API
    generateTitleAndDescription: async (params) => {
      try {
        return await ipcRenderer.invoke('generate-title-and-description', params);
      } catch (error) {
        console.error('Error generating title and description:', error);
        throw error;
      }
    },
    onTitleDescriptionChunk: (callback) => {
      ipcRenderer.on('title-description-chunk', (_event, chunk) => callback(chunk));
    }
  }
);
