const { createDirectory, createFiles, createTemplate } = require("../utils/commands");

const args = process.argv.slice(2);
const type = args[1];
const componentName = args[2];

let extensions;
let subDir;

if (type === "component") {
    extensions = [".js", ".css", ".spec.js"];
    subDir = `components/${componentName}/`;
}

if (type === "container") {
    extensions = [".js", ".spec.js"];
    subDir = `containers/${componentName}/`;
}

createDirectory(type + 's', componentName);

createFiles(extensions, subDir, componentName, type);

createTemplate(subDir, componentName, type);