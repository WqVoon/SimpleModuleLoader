import {registeredModules} from "./register";
import {require} from "./require";

/**
 * 模块注册函数，提供模块唯一标识和模块函数添加进 registeredModules 中
 */
export default function define (name, callback) {
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
}