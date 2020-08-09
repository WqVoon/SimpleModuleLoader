const path = require('path');
const rollup = require('rollup').rollup;

rollup({
    input: path.resolve(__dirname, "../src/main.js")
}).then(bundle => {
    bundle.write({
        file: path.resolve(__dirname, "../dist/define.js"),
        format: "umd",
        name: "define"
    }).then(() => console.log("Build Successfully"));
}).catch(err => {
    console.error(err);
})