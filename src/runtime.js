/**
 * 配置对象，属性分别为：
 *  debugMode: 布尔值，表示是否输出调试信息
 */
export var config = {
    debugMode: true
};

/**
 * 用于在 debug 模式下输出 msg
 */
export function debug(msg) {
    config.debugMode && console.warn("[DEBUG]", indent.get() + msg);
}

var indent = debug.indent = {
    char: '  ',
    buffer: [],
    indent: ""
}

indent.add = function () {
    config.debugMode && this.buffer.push(this.char);
    this.indent = this.buffer.join("");
}

indent.dec = function () {
    config.debugMode && this.buffer.pop();
    this.indent = this.buffer.join("");
}

indent.get = function () {
    return this.indent;
}