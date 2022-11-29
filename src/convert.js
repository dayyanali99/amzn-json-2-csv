const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
const convertToObjsWithCustomFields = require("./convert-2-obj");
const { parseAsync } = require("json2csv");
const requiredFields = require('./config/requiredFields')

async function getProductDirs() {
  try {
    const files = await fsPromises.readdir(path.join(__dirname, "assets"));
    return files;
  } catch (error) {
    console.error(error);
  }
}

const convert = async () => {
  const directories = await getProductDirs();
  
  for (const directory of directories) {
    const jsonFiles = await fsPromises.readdir(
      path.join(__dirname, "assets", directory)
    );

    if (!fs.existsSync(path.join(__dirname, "csv", directory))) {
      fs.mkdirSync(path.join(__dirname, "csv", directory), {recursive: true})
    }

    let productsOfSameType = [];
    for (const jsonFile of jsonFiles) {
      const obj = require(path.join(__dirname, "assets", directory, jsonFile));
      const convertedObjects = convertToObjsWithCustomFields(obj, directory); 
      
      for (const convObj of convertedObjects) {
        productsOfSameType.push(convObj);
      }
    }

    const csv = await parseAsync(productsOfSameType, {requiredFields});
    await fsPromises.writeFile(path.join(__dirname, "csv", directory, directory+".csv"), csv);
  }
};

convert();