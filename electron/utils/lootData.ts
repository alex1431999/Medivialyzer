import fs from "node:fs";
import path from "path";
import * as os from "node:os";

export function getLootData() {
    const homeDir = os.homedir();
    const filePath = path.join(homeDir, 'medivia', 'Loot.txt');

    try {
        return fs.readFileSync(filePath).toString()
    }
    catch (error) {
        return ''
    }
}