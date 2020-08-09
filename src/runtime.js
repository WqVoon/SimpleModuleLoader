/**
 * 配置对象，属性分别为：
 *  debugMode: 布尔值，表示是否输出调试信息
 *  paths: 记录模块标识及路径
 *  maxPollingTimes: 记录模块加载的最大轮询次数，超过后判断为无法加载
 */
export var config = {
    debugMode: false,
    paths: {},
    maxPollingTimes: 30
};

/**
 * 用于在 debug 模式下输出 msg
 */
export function debug(msg) {
    config.debugMode && console.warn("[DEBUG]", indent.get() + msg);
}

/**
 * 用于记录当前 debug 信息的缩进（只是为了更好看一点）
 */
var indent = debug.indent = {
    char: '  ',
    buffer: [],
    indent: ""
}

/**
 * 增加一个缩进长度
 */
indent.add = function () {
    config.debugMode && this.buffer.push(this.char);
    this.indent = this.buffer.join("");
}

/**
 * 减少一个缩进字符
 */
indent.dec = function () {
    config.debugMode && this.buffer.pop();
    this.indent = this.buffer.join("");
}

/**
 * 获得当前的缩进
 */
indent.get = function () {
    return this.indent;
}

/**
 * 制作一个 script 标签并插入到文档的结尾
 */
function insertScript(src) {
    let scriptNode = document.createElement('script');
    scriptNode.src = src;
    scriptNode.async = false;
    document.body.appendChild(scriptNode);
}

/**
 * 加载 config.paths 里的所有模块
 */
export function loadModules() {
    let pathsKeys = Object.keys(config.paths);
    config.paths.count = pathsKeys.length;
    pathsKeys.forEach(function (key) {
        insertScript(config.paths[key]);
    });
}