# SimpleModuleLoader

> 一个简单的模块加载器练习

## 说明

define.js 对外暴露 define 函数对象，该对象具有如下行为：

- 直接调用：接受两个参数
  - 参数一：模块的唯一标识，建议使用字符串
  - 参数二：模块的主体函数，模块的内容写在函数内部，该函数会获得两个参数，第一个等价于 require 用于导入其他模块，第二个等价于 exports 用于导出内容
- config 属性：该属性作为一个经过 Object.seal 处理后的对象，具有如下属性
  - debugMode：布尔值，为 true 时会输出调试信息，只在 define.run 之前修改有效
  - paths：对象，内部每个属性表示一个模块，属性的键为模块名称，值为模块相对当前文档的路径
  - maxPollingTimes：数字，最大轮询次数，超过该次数后判断为模块加载异常
- run 方法：该方法接受一个模块标识（直接调用 define 时的第一个参数）作为入口模块并开始运行它

## 使用方法

> 详见 demo 文件夹中的例子

- 作为模块的 js 文件应该被"直接调用"形式的 define 包裹，并通过 require 和 exports 来与其他模块交互
- 作为启动方的 js 文件可通过修改 define.config 对象的属性来改变默认行为和配置模块路径，然后调用 define.run 来运行入口模块