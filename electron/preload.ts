import { contextBridge, ipcRenderer } from "electron";
import path from "path";
import * as fs from "node:fs";

contextBridge.exposeInMainWorld("browserWindow", {
    versions: () => ipcRenderer.invoke("versions"),
});

contextBridge.exposeInMainWorld('electron', {
    fs: {
        readFileSync: (filePath: string) => fs.readFileSync(filePath, 'utf-8')
    },
    path: {
        join: (...args: any) => path.join(...args)
    }
});