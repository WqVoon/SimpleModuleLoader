define("moduleA", function (require, exports) {
    require('remote').func();

    exports.func1 = function () {
        console.log("This is moduleA func1");
    }

    exports.func2 = function () {
        console.log("This is moduleA func2");
    }
})