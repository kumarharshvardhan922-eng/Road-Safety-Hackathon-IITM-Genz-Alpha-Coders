import fs from 'fs';
import path from 'path';
import * as xlsx from 'xlsx';

const DATASET_DIR = './dataset';
const OUTPUT_JSON_PATH = './src/data.json';

// The 8 categories your chatbot understands
const CATEGORIES = [
  "Hospital and Trauma Centres",
  "Ambulance Service",
  "Police Station",
  "Vehicle Rescue Services",
  "Petrol Pump",
  "Fire Station",
  "Service Centres",
  "Local Contacts"
];

function convertMultipleExcelToJson() {
    console.log(`Looking for Excel files in ${DATASET_DIR} folder...`);

    // Create the dataset folder if it doesn't exist
    if (!fs.existsSync(DATASET_DIR)) {
        fs.mkdirSync(DATASET_DIR);
        console.log(`\n⚠️ I just created a folder named 'dataset'.`);
        console.log(`Please move ALL your Excel files into the 'dataset' folder and run this script again.`);
        return;
    }

    const files = fs.readdirSync(DATASET_DIR).filter(file => file.endsWith('.xlsx') && !file.startsWith('~$'));
    
    if (files.length === 0) {
        console.log(`\n⚠️ No Excel files found in the 'dataset' folder.`);
        console.log(`Please paste all your location Excel files inside 'D:\\ROAD SAFTEY AI ASSISTANT\\dataset' and run again.`);
        return;
    }

    // Initialize our final data object with empty arrays for all 8 categories
    const finalData = {};
    CATEGORIES.forEach(cat => finalData[cat] = []);

    let totalRecordsProcessed = 0;

    // Loop through every Excel file in the folder
    files.forEach(file => {
        console.log(`\nProcessing file: ${file}`);
        const filePath = path.join(DATASET_DIR, file);
        const fileBuffer = fs.readFileSync(filePath);
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        
        // Loop through all sheets in this file
        workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);
            
            // We need to figure out which of the 8 categories this data belongs to.
            // It could be that the Sheet name is the category, OR the File name is the category.
            let matchedCategory = null;
            
            const ALIASES = {
              "Hospital and Trauma Centres": ["hospital", "trauma"],
              "Ambulance Service": ["ambulance"],
              "Police Station": ["police"],
              "Vehicle Rescue Services": ["vehicle rescue", "tow", "crane", "breakdown"],
              "Petrol Pump": ["petrol", "fuel", "gas"],
              "Fire Station": ["fire"],
              "Service Centres": ["service centre", "service center", "garage", "repair", "mechanic", "motors"],
              "Local Contacts": ["contact", "helpline", "disaster"]
            };
            
            for (const cat of CATEGORIES) {
                const sheetLower = sheetName.toLowerCase();
                const fileLower = file.toLowerCase();
                
                // If the exact category name is in the file/sheet, or one of the aliases
                if (sheetLower.includes(cat.toLowerCase()) || fileLower.includes(cat.toLowerCase())) {
                    matchedCategory = cat;
                    break;
                }
                
                // Check aliases
                if (ALIASES[cat] && ALIASES[cat].some(alias => sheetLower.includes(alias) || fileLower.includes(alias))) {
                    matchedCategory = cat;
                    break;
                }
            }

            let addedCount = 0;
            if (jsonData.length > 0) {
                jsonData.forEach(row => {
                    let rowCategory = matchedCategory;
                    
                    // Inspect row keys for explicit category
                    const typeStr = String(row.Type || row.TYPE || row.Category || row.Service || row['Service Name'] || row.Name || row['__EMPTY_1'] || "").toLowerCase();
                    if (typeStr) {
                        for (const cat of CATEGORIES) {
                            if (typeStr.includes(cat.toLowerCase())) {
                                rowCategory = cat; break;
                            }
                            if (ALIASES[cat] && ALIASES[cat].some(alias => typeStr.includes(alias))) {
                                rowCategory = cat; break;
                            }
                        }
                    }
                    
                    if (rowCategory) {
                        finalData[rowCategory].push(row);
                        addedCount++;
                        totalRecordsProcessed++;
                    }
                });

                if (addedCount > 0) {
                    console.log(`  -> Extracted ${addedCount} records from sheet '${sheetName}'`);
                } else {
                    console.log(`  -> Warning: Ignored sheet '${sheetName}'. Could not map rows to any of the 8 parameters.`);
                }
            }
        });
    });

    // Write the combined data to data.json
    fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(finalData, null, 2));
    console.log(`\n✅ SUCCESS! Combined ${files.length} Excel files (${totalRecordsProcessed} total records) into ${OUTPUT_JSON_PATH}`);
}

convertMultipleExcelToJson();
