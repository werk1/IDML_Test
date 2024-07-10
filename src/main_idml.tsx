
import AdmZip from 'adm-zip';
import xml2js from 'xml2js';
import fs from 'fs';

const importFile = 'data/data/import/10-11-chronik.idml';
const exportFile = 'data/data/export/10-11-chronik.html'; // or something else

// Create an instance of AdmZip to read the IDML file
const zip = new AdmZip(importFile);

// Get an array of all entries (files) in the zip file
const zipEntries = zip.getEntries();

// Create a directory to store the extracted XML files
const outputDir = 'extracted_xml_files';
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Loop through each entry in the zip file
zipEntries.forEach((entry) => {
    if (entry.entryName.endsWith('.xml')) {
        // Extract the XML content of the entry
        const xmlContent = zip.readAsText(entry);

        // Write the XML content to a file
        const xmlFilePath = `${outputDir}/${entry.entryName}`;
        fs.writeFileSync(xmlFilePath, xmlContent);

        // Parse the XML content using xml2js
        xml2js.parseString(xmlContent, (err, result) => {
            if (err) {
                console.error('Error parsing XML file:', err);
                return;
            }

            // Work with the parsed XML content (stored in 'result' variable)
            console.log(result);
        });
    }
});