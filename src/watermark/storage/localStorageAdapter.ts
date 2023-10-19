import { StorageAdapter } from "./storageAdapter";

import * as fs from "fs";

const loadSourcePdfResolver = (sourcePath: string): Buffer => {
    console.log(`loading source file from path ${sourcePath}`);

    if (!fs.existsSync(sourcePath)) {
        throw new Error('Source file not found!');
    }

    return fs.readFileSync(sourcePath);
}

const storeLocalResolver = (data: Uint8Array, localPath: string): void => {
    console.log(`Storing file to local path`);

    const bufferData: Buffer = Buffer.from(data);

    fs.writeFileSync(localPath, bufferData);

    console.log('Done.');
}

export const storage: StorageAdapter = {
    loadSourcePDF: loadSourcePdfResolver,
    storeLocal: storeLocalResolver,
    cleanup: () => {},
}