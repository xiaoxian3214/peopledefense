/*
 * @Author: your name
 * @Date: 2022-04-27 23:43:42
 * @LastEditTime: 2022-04-27 23:47:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /peopledefense/src/directives/index.js
 */
import permission from "./permission.js"
export default {
    install(Vue){
        Vue.directive('permission',permission)
    }
}