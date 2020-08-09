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
     * 配置对象，属性分别为：
     *  debugMode: 布尔值，表示是否输出调试信息
     */
    var config = {
        debugMode: true
    };

    /**
     * 用于在 debug 模式下输出 msg
     */
    function debug(msg) {
        config.debugMode && console.warn("[DEBUG]", indent.get() + msg);
    }

    var indent = debug.indent = {
        char: '  ',
        buffer: [],
        indent: ""
    };

    indent.add = function () {
        config.debugMode && this.buffer.push(this.char);
        this.indent = this.buffer.join("");
    };

    indent.dec = function () {
        config.debugMode && this.buffer.pop();
        this.indent = this.buffer.join("");
    };

    indent.get = function () {
        return this.indent;
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
    function require(name) {
        debug.indent.add();
        var module = null;

        if (!registeredModules.has(name)) {
            throw "无法导入未注册的模块: " + name;
        } else if (cachedModules.has(name)) {
            debug("└模块 " + name + " 的缓存命中");
            module = cachedModules[name];
        } else {
            debug("└尝试导入模块 " + name);
            module = cachedModules[name] = {};
            registeredModules[name].call(module, require, module);
            debug("└模块 " + name + " 导入成功");
        }

        debug.indent.dec();
        return module;
    }

    /**
     * 模块注册函数，提供模块唯一标识和模块函数添加进 registeredModules 中
     */
    function define(name, callback) {
        registeredModules.push(name, callback);
        debug("注册了 " + name + " 模块");
    }

    /**
     * 对外暴露 config 对象的 seal 版本
     */
    define.config = Object.seal(config);

    /**
     * 以 entry 作为模块标识来运行之
     */
    define.run = function (entry) {
        debug("以模块 " + entry + " 作为入口启动");
        try {
            require(entry);
        } catch (err) {
            console.error(err);
        }
    };

    return define;

})));
