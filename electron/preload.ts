import { contextBridge, ipcRenderer } from "electron";
import {getLootData} from "./utils/lootData";

contextBridge.exposeInMainWorld("browserWindow", {
    versions: () => ipcRenderer.invoke("versions"),
});


contextBridge.exposeInMainWorld('electron', {
    getLootData: () => getLootData(),
});
