/**
 * 
 */
export interface StorageAdapter {
    /**
     * Load the pdf from source as and return as Buffer
     * @param sourcePath String
     * @returns Buffer
     */
    loadSourcePDF: (sourcePath: string) => Buffer;

    /**
     * Localy store files
     * @param data Uint8Array
     * @param localPath String
     * @returns Void
     */
    storeLocal: (data: Uint8Array, localPath: string) => void;

    /**
     * Clean up localPath
     * @returns 
     */
    cleanup: () => void;
}