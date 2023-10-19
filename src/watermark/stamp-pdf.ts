import { PDFDocument, StandardFonts, PageSizes, rgb } from "pdf-lib";
import { StampTransaction, ownershipStatement, copyrightStatement } from "./stamp-generator";
import { storage } from "./storage";

export const stamper = () => {

    const WATERMARK_PAGE_INDEX = 2;
    const WATERMARK_PAGE_OWNERSHIP_TEXT_SIZE = 16;
    const WATERMARK_PAGE_COPYRIGHT_TEXT_SIZE = 9;
    const WATERMARK_TEXT_SIZE = 7;

    const start = async (transaction: StampTransaction) => {
        
        const pdfData = storage.loadSourcePDF(transaction.filePath);

        const pdf = await PDFDocument.load(pdfData);
    
        insertWatermarkPage(pdf, transaction);

        await stamp(pdf, transaction); // start stamp operation on each page (stamp starts at page 4 (index 3));

        const outputData = await pdf.save();

        storage.storeLocal(outputData, transaction.outputPath);
    }

    const stamp = async (pdf: PDFDocument, transaction: StampTransaction) => {
        console.log('Starting stamp operation...');
        const pageIndices = pdf.getPageIndices();

        const ownership = ownershipStatement(transaction);
        const copyright = copyrightStatement(transaction);
        const helveticaFont = await pdf.embedFont(StandardFonts.Helvetica);

        for (let pageNum of pageIndices) {
            const page = pdf.getPage(pageNum);

            // skip first 3 pages
            if (pageNum > 2) {
                const copyrightTextWidth = helveticaFont.widthOfTextAtSize(copyright, 6);
                page.drawText(ownership, {
                    x: 10,
                    y: 10,
                    size: WATERMARK_TEXT_SIZE,
                    font: helveticaFont,
                    color: rgb(0.5, 0.5, 0.5)
                });
                
                page.drawText(copyright, {
                    x: page.getWidth() - copyrightTextWidth - 20,
                    y: 10,
                    size: WATERMARK_TEXT_SIZE,
                    font: helveticaFont,
                    color: rgb(0.5, 0.5, 0.5)
                });
            }
        }
    }

    const insertWatermarkPage = async (pdf: PDFDocument, transaction: StampTransaction) => {
        console.log('Insert watermark page');

        pdf.insertPage(WATERMARK_PAGE_INDEX, PageSizes.A4);
        const page = pdf.getPage(WATERMARK_PAGE_INDEX);
        const helveticaFont = await pdf.embedFont(StandardFonts.Helvetica);
        const ownership = ownershipStatement(transaction);
        const copyright = copyrightStatement(transaction);

        const ownershipTextWidth = helveticaFont.widthOfTextAtSize(ownership, WATERMARK_PAGE_OWNERSHIP_TEXT_SIZE);
        const ownershipTextHeight = helveticaFont.heightAtSize(WATERMARK_PAGE_OWNERSHIP_TEXT_SIZE);
        page.drawText(ownership, {
            x: page.getWidth() / 2 - ownershipTextWidth / 2,
            y: page.getHeight() / 2 - ownershipTextHeight / 2,
            size: WATERMARK_PAGE_OWNERSHIP_TEXT_SIZE,
            font: helveticaFont,
        });

        const copyrightTextWidth = helveticaFont.widthOfTextAtSize(copyright, WATERMARK_PAGE_COPYRIGHT_TEXT_SIZE);
        page.drawText(copyright, {
            x: page.getWidth() / 2 - copyrightTextWidth / 2,
            y: page.getHeight() / 4,
            size: WATERMARK_PAGE_COPYRIGHT_TEXT_SIZE,
            font: helveticaFont,
        });
    }

    return { start };
}