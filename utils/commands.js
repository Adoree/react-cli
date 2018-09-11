const fs = require('fs');
const { exec } = require('child_process');

function createDirectory(dirName, componentName) {
    if (!fs.existsSync(dirName)) {
        exec(`mkdir ${dirName}`, (err) => {
            if (err) {
                throw err
            }
        })
    }
    if (!fs.existsSync(`${dirName}/${componentName}`)) {
        exec(`mkdir ${dirName}/${componentName}`, (err) => {
            if(err) { throw err }
        })
    }
}

function createFiles(extensions, subDir, component, type) {
    extensions.forEach((ext) => {
        exec('touch '+ subDir + component + ext, (err) => {
            if (err) { throw err }
        });
    });
    if (type === "component") {
        exec('touch '+ subDir + "index.js", (err) => {
            if (err) { throw err }
        });
    }
}

function createTemplate(subDir, componentName, type) {
    if (type === "component") {
        const templateJSX= `import React from 'react';
    
function ${componentName}(props) {
    return (
        <div>${componentName} works!</div>
    )
}`;
        fs.writeFileSync(subDir + componentName + ".js", templateJSX);

        const templateIndex = `export default from './${componentName}.js'`;
        fs.writeFileSync(subDir + "index.js", templateIndex);
    }

    if (type === "container") {
        const templateJSX = `import React, { Component } from 'react';
    
class ${componentName} extends Component {
    componentDidMount() {
    
    }

    render() {
        return (
            <div>${componentName} works!</div>
        )
    }
}`;

        fs.writeFileSync(subDir + componentName + ".js", templateJSX);
    }
}

module.exports = {createDirectory, createFiles, createTemplate};