import {registeredModules} from "./register";

/**
 * 模块注册函数，提供模块唯一标识和模块函数添加进 registeredModules 中
 */
export default function define (name, callback) {
    registeredModules.push(name, callback);
}
