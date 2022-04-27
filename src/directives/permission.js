/*
 * @Author: your name
 * @Date: 2022-04-27 22:23:11
 * @LastEditTime: 2022-04-27 23:23:13
 * @LastEditors: Please set LastEditors
 * @Description: 自定义指令权限
 * @FilePath: /peopledefense/src/directives/permission.js
 */
import store from '../store';
//判断是否有权限
function checkArray(roleIdList){
   let allRoleList = store.state.roleIdList
   return allRoleList.find(i=>roleIdList.includes(i)) ? true:false
}
//权限自定义指令
const permission = {
    inserted: function (el, binding) {
      let permission = binding.value// 获取到 v-permission的值
      if (permission) {
        let hasPermission = checkArray(permission)
        if (!hasPermission) {
          // 没有权限 移除Dom元素
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    },
  }
export default permission