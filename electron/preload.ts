import {contextBridge, ipcRenderer} from "electron";
import {getLootData} from "./utils/lootData";
import {configStore} from "./stores/configStore";

contextBridge.exposeInMainWorld("browserWindow", {
    versions: () => ipcRenderer.invoke("versions"),
});

contextBridge.exposeInMainWorld('electron', {
    getLootData: () => getLootData(),
    setConfig: (config: any) => configStore.set('config', config),
    getConfig: () => configStore.get('config'),
});
