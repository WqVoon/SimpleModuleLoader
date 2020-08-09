import {registeredModules} from "./register";
import {require} from "./require";
import {config, debug, loadModules} from "./runtime";

/**
 * 模块注册函数，提供模块唯一标识和模块函数添加进 registeredModules 中
 */
export default function define(name, callback) {
    registeredModules.push(name, callback);
}

/**
 * 对外暴露 config 对象的 seal 版本
 */
define.config = Object.seal(config);

/**
 * 加载 config.paths 中的所有模块
 * 加载成功后以 entry 作为模块标识来运行之
 */
define.run = function (entry) {
    debug("以模块 " + entry + " 作为入口启动");
    try {
        loadModules();
        (function loopRunner() {
            if (!hasLoadedEnd())
                setTimeout(loopRunner);
            else
                require(entry);
        })();
    } catch (err) {
        console.error(err);
    }
}

/**
 * 是否加载完成
 */
function hasLoadedEnd() {
    return registeredModules.count === config.paths.count
}