"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adm_zip_1 = __importDefault(require("adm-zip"));
const xml2js_1 = __importDefault(require("xml2js"));
const fs_1 = __importDefault(require("fs"));
const importFile = 'data/data/import/10-11-chronik.idml';
const exportFile = 'data/data/export/10-11-chronik.html'; // or something else
// Create an instance of AdmZip to read the IDML file
const zip = new adm_zip_1.default(importFile);
// Get an array of all entries (files) in the zip file
const zipEntries = zip.getEntries();
// Create a directory to store the extracted XML files
const outputDir = 'extracted_xml_files';
if (!fs_1.default.existsSync(outputDir)) {
    fs_1.default.mkdirSync(outputDir);
}
// Loop through each entry in the zip file
zipEntries.forEach((entry) => {
    if (entry.entryName.endsWith('.xml')) {
        // Extract the XML content of the entry
        const xmlContent = zip.readAsText(entry);
        // Write the XML content to a file
        const xmlFilePath = `${outputDir}/${entry.entryName}`;
        fs_1.default.writeFileSync(xmlFilePath, xmlContent);
        // Parse the XML content using xml2js
        xml2js_1.default.parseString(xmlContent, (err, result) => {
            if (err) {
                console.error('Error parsing XML file:', err);
                return;
            }
            // Work with the parsed XML content (stored in 'result' variable)
            console.log(result);
        });
    }
});
