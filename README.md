# PDF Watermark Service

Stamp service is using [pdf-lib](https://pdf-lib.js.org/docs/api/) node package, to modify existing pdf. This serves as a proof of concept to migrate from <b>PHP</b> to <b>Node</b>. This service only focus on modifying PDF files, other supported media EPUB, MOBI. 


### What is this hoping to achieve:
- Show an alternative to FPDI php package.
- Migrate codebase to something something.
- Modify the `PDF` whilst preserving the internal and external links.


### Usage: 
- install dependencies `yarn install`
- create a `tmp` dir in root folder.
- add a source pdf with name `source.pdf` (pdf you want to add stamp on)
- start stamping pdf with `yarn start`


### Whats missing in this proof of concept:
- No compression. Compression is not supported by `pdf-lib` - alternative cli for pdf compression `pdftk` or `qpdf`;
- MOBI and EPUB handling.