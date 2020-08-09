define("moduleA", function (require, exports) {
    console.log("ModuleA has been loaded");

    exports.func1 = function () {
        console.log("This is moduleA func1");
    }

    exports.func2 = function () {
        console.log("This is moduleA func2");
    }
})