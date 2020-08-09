import {registeredModules} from "./register";
import {debug} from "./runtime";

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
}

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

export {require};