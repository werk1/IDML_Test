const fs = require('fs');

// Read the JSON file
const jsonData = fs.readFileSync('../out/10-11-chronik.json', 'utf8');

const data = JSON.parse(jsonData);

// console.log(data);

function getData(obj: any): { key: string; value: any }[] {
    let foundContent = false;
    // const keyValuePairs = [];
    const text = [];

    for (const key in obj) {
        const value = obj[key];

        /*
        if (typeof value === 'object' && value !== null) {
            const nestedData = getData(value);
            keyValuePairs.push(...nestedData);
        } else {
            keyValuePairs.push({ key, value });
        }
        */
        if (foundContent && key === '@value') {
            text.push(value);
            foundContent = false;
            console.log("Value: " + value);
        }
        
        if (key == '@name' && value == 'Content') {
            console.log("Key: " + key + ", Value: " + value);
            foundContent = true;
            // keyValuePairs.push({ key, value });
        } else if (typeof value === 'object' && value !== null) {
            const nestedData = getData(value);
            // keyValuePairs.push(...nestedData);
            text.push(...nestedData);
        }
    }

    // return keyValuePairs;
    return text;
}

const text = getData(data);

console.log(text);