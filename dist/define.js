(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.define = factory());
}(this, (function () { 'use strict';

    /**
     * 保存被 define 注册的模块，内部每一项的
     *  key: 模块的唯一标识
     *  value: 模块的具体代码
     */
    var registeredModules = {};

    /**
     * 记录被注册的模块数量
     */
    registeredModules.count = 0;

    /**
     * 添加一个模块
     */
    registeredModules.push = function (name, callback) {
        this[name] = callback;
        this.count++;
    };

    /**
     * 模块注册函数，提供模块唯一标识和模块函数添加进 registeredModules 中
     */
    function define (name, callback) {
        registeredModules.push(name, callback);
    }

    return define;

})));
