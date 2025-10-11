import {contextBridge, ipcRenderer} from "electron";
import {configStore} from "./stores/configStore";
import { readEntireLootFile } from './utils/lootData';

contextBridge.exposeInMainWorld("browserWindow", {
    versions: () => ipcRenderer.invoke("versions"),
});

contextBridge.exposeInMainWorld('electron', {
    setConfig: (config: string) => configStore.set('config', JSON.parse(config)),
    getConfig: () => configStore.get('config'),
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    onLootDataUpdated: (callback: (event: any, ...args: any[]) => void) => ipcRenderer.on('loot-data-updated', callback),
    readEntireLootFile: () => ipcRenderer.invoke('read-entire-loot-file'),
    watchLootFile: () => ipcRenderer.invoke('watch-loot-file'),
});
