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
     * 判断 name 指定的模块是否被注册
     */
    registeredModules.has = function (name) {
        return this[name] !== undefined;
    };

    /**
     * 用于缓存已经加载过的模块，防止重复加载，内部每一项的：
     *  key: 模块的唯一标识
     *  value: 模块对应的导出对象，可以被其他模块用 require 获取到
     */
    var cachedModules = {};

    /**
     * 判断 name 指定的模块是否被缓存
     */
    cachedModules.has = function (name) {
        return this[name] !== undefined;
    };

    /**
     * 根据 name 到 registeredModules 找到模块对应的 callback 来执行，
     * 同时传递该方法本身作为 callback 的第一个参数，从而赋予其加载其他模块的能力，
     * 将模块对应的导出对象添加到 cachedModules 中来防止重复加载同一模块
     */
    function require (name) {
        if (! registeredModules.has(name)) {
            throw "No such module: "+name;
        }else if (cachedModules.has(name)) {
            return cachedModules[name];
        }

        var module = cachedModules[name] = {};
        registeredModules[name].call(module, require, module);

        return module;
    }

    /**
     * 模块注册函数，提供模块唯一标识和模块函数添加进 registeredModules 中
     */
    function define (name, callback) {
        registeredModules.push(name, callback);
    }

    /**
     * 以 entry 作为模块标识来运行之
     */
    define.run = function (entry) {
        try {
            require(entry);
        } catch (err) {
            console.error(err);
        }
    };

    return define;

})));
