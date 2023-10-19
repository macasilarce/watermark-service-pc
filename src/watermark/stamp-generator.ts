/** Should be moved to types folder */
export interface StampTransaction {
    author: string;
    email: string;
    copyrightBelongsTo: string;
    filePath: string;
    outputPath: string;
}

export const ownershipStatement = (transaction: StampTransaction) => {
    return `This book belongs to ${transaction.author} (${transaction.email})`;
}

export const copyrightStatement = (transaction: StampTransaction) => {
    const currentYear = new Date().getFullYear();

    return `Copyright ${transaction.copyrightBelongsTo} ${currentYear}`;
}