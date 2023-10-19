import path from 'path';
import { StampTransaction } from './watermark/stamp-generator';
import { stamper } from './watermark/stamp-pdf';

(async () => {
    const pdfPath = path.join(__dirname, '../../tmp/source.pdf');
    const outputPath = path.join(__dirname, '../../tmp/finaloutput.pdf');

    const transaction: StampTransaction = {
        author: 'random name',
        email: 'mailer@hotmail.com',
        copyrightBelongsTo: 'EmptyCo',
        filePath: pdfPath,
        outputPath
    };

    await stamper().start(transaction);

})().then().catch(console.error);