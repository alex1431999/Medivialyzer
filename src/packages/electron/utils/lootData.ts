import fs from 'node:fs';
import path from 'path';
import * as os from 'node:os';
import { configStore } from '../stores/configStore';
import { BrowserWindow } from 'electron';

export const DEFAULT_LOOT_FILE_PATH = path.join(os.homedir(), 'medivia', 'Loot.txt');

export function readEntireLootFile() {
  const filePath = (configStore.get('config') as any).lootFilePath || DEFAULT_LOOT_FILE_PATH;
  try {
    const data = fs.readFileSync(filePath).toString();
    lastReadSize = Buffer.byteLength(data, 'utf8');
    return data;
  } catch (error) {
    return '';
  }
}

let lastReadSize = 0;

function readNewLines(filePath: string) {
  const stats = fs.statSync(filePath);
  const newSize = stats.size;

  if (newSize < lastReadSize) {
    lastReadSize = newSize;
  }

  if (newSize === lastReadSize) {
    return null;
  }

  const stream = fs.createReadStream(filePath, {
    start: lastReadSize,
    end: newSize,
    encoding: 'utf-8',
  });

  let newData = '';
  stream.on('data', (chunk) => {
    newData += chunk;
  });

  stream.on('end', () => {
    lastReadSize = newSize;
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
      mainWindow.webContents.send('loot-data-updated', newData);
    }
  });
}

export function watchLootFile() {
  const filePath = (configStore.get('config') as any).lootFilePath || DEFAULT_LOOT_FILE_PATH;

  const dir = path.dirname(filePath);
  const base = path.basename(filePath);

  // We have to watch the dir here instead of the file name because on mac
  // for example, the file gets removed and replaced when edited via a file
  // editor for example. The dir remains stable
  fs.watch(dir, (eventType, filename) => {
    if (filename === base) {
      readNewLines(filePath);
    }
  });
}
