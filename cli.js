#!/usr/bin/env node

const args = process.argv.slice(2);
const action = args[0];
const type = args[1];

if (action === "g" || action === "generate") {
    if (type === "component" || type === "container") {
        require("./scripts/createComponent")
    }
}
