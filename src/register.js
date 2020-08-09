/**
 * 保存被 define 注册的模块，内部每一项的
 *  key: 模块的唯一标识
 *  value: 模块的具体代码
 */
export var registeredModules = {};

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
}

/**
 * 判断 name 指定的模块是否被注册
 */
registeredModules.has = function (name) {
    return this[name] !== undefined;
}