const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

function createDirectory(dirName, componentName) {
    if (!fs.existsSync(path.resolve(dirName))) {
        fs.mkdirSync(path.resolve(dirName));
    }
    if (!fs.existsSync(path.resolve(dirName, componentName))) {
        fs.mkdirSync(path.resolve(dirName, componentName));
    }
}

function createFiles(extensions, subDir, component, type, createFile) {
    extensions.forEach((ext) => {
        exec(createFile + path.resolve(subDir, component + ext), (err) => {
            if (err) { throw err }
        });
    });
    if (type === "component") {
        exec(createFile + path.resolve(subDir, "index.js"), (err) => {
            if (err) { throw err }
        });
    }
}

function createTemplate(subDir, componentName, type) {
    if (type === "component") {
        const template = `import React from 'react';
    
function ${componentName}(props) {
    return (
        <div>${componentName} works!</div>
    )
}`;
        fs.writeFileSync(path.resolve(subDir, componentName + ".js"), template);

        const templateIndex = `export default from './${componentName}.js'`;
        fs.writeFileSync(path.resolve(subDir, "index.js"), templateIndex);
    }

    if (type === "container") {
        const template = `import React, { Component } from 'react';
    
class ${componentName} extends Component {
    componentDidMount() {
    
    }

    render() {
        return (
            <div>${componentName} works!</div>
        )
    }
}`;

        fs.writeFileSync(path.resolve(subDir, componentName + ".js"), template);
    }
}

module.exports = {createDirectory, createFiles, createTemplate};