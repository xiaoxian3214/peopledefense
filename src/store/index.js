import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let data = JSON.parse(sessionStorage.getItem('data')) || {}
let roleIdList = data.roleIdList || []
// console.log(data);
function judge(roleIdList = []) {
  if (roleIdList.includes(7) && roleIdList.length == 1) {
    return false
  }
  if (roleIdList.includes(8) && roleIdList.length == 1) {
    return false
  }
  if (roleIdList.includes(8) && roleIdList.includes(7) && roleIdList.length == 2) {
    return false
  }
  return true
}
export default new Vuex.Store({
  state: {
    roleIdList: roleIdList,
    longData: data,
    roleName: data.roleName,
    roleId: data.roleId,
    administrativeCode: data.administrativeCode,
    // 只有是市领导和角色id为8就返回false
    ifBut: judge(data.roleIdList),
    CityOrArea: (roleIdList.includes(1) || roleIdList.includes(2)),
    timeChange: {
      disabledDate(time) {
        return (
          time.getTime() < Date.now() - 3600 * 1000 * 24 * 183 ||
          time.getTime() > Date.now()
        ); //选择时间范围
      },
    },
    option: {
      disabledDate: (time) => {
        return time.getTime() < Date.now() - 1 * 24 * 3600 * 1000
      }
    },
    // 存储当前page
    listForm: {
      page: 1
    }
  },
  mutations: {
    longData(state, val) {
      state.longData = val
      state.roleName = val.roleName
      state.roleId = val.roleId
      state.administrativeCode = val.administrativeCode
      // 只有是市领导和角色id为8就返回false
      state.ifBut = judge(val.roleIdList)
      state.CityOrArea = (val.roleIdList.includes(1) || val.roleIdList.includes(2))
    },
    CHANGE_ROLENAME(state, val) {
      state.roleName = val
    },
    administrativeCode(state, val) {
      state.administrativeCode = val
    },
    restListForm(state, val) {
      state.listForm.page = val
    }
  },
  actions: {},
  modules: {}
})