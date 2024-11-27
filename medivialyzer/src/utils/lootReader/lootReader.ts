export class LootReader {
    private readonly lootFilePath: string;

    constructor(lootFilePath: string) {
        this.lootFilePath = lootFilePath;
    }

    private get lootFile() {
        return window.electron.fs.readFileSync(this.lootFilePath).toString();
    }
}