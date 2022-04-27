import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../Layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../pages/login/login.vue'),
  },
  {
    path: '/Layout/index',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/pages/index/index',
        name: 'index',
        component: () => import('../pages/index/index.vue'),
      },
      // 队员信息
      {
        path: '/pages/membermessage/peoplemessage/list',
        name: 'peoplemessage',
        component: () => import('../pages/membermessage/peoplemessage/list.vue')
      },
      {
        path: '/pages/membermessage/peoplemessage/add',
        name: 'peoplemessageadd',
        meta: { activeMenu: '/pages/membermessage/peoplemessage/list' },
        component: () => import('../pages/membermessage/peoplemessage/add.vue')
      },
      {
        path: '/pages/membermessage/peoplemessage/edit',
        name: 'peoplemessageedit',
        meta: { activeMenu: '/pages/membermessage/peoplemessage/list' },
        component: () => import('../pages/membermessage/peoplemessage/edit.vue')
      },
      {
        path: '/pages/membermessage/peoplemessage/detail',
        name: 'peoplemessagedetail',
        meta: { activeMenu: '/pages/membermessage/peoplemessage/list' },
        component: () => import('../pages/membermessage/peoplemessage/detail.vue')
      },
      // 专业队
      {
        path: '/pages/membermessage/marjir/list',
        name: 'marjir',
        component: () => import('../pages/membermessage/marjir/list.vue')
      },
      {
        path: '/pages/membermessage/marjir/add',
        name: 'marjiradd',
        meta: { activeMenu: '/pages/membermessage/marjir/list' },
        component: () => import('../pages/membermessage/marjir/add.vue')
      },
      {
        path: '/pages/membermessage/marjir/edit',
        name: 'marjiredit',
        meta: { activeMenu: '/pages/membermessage/marjir/list' },
        component: () => import('../pages/membermessage/marjir/edit.vue')
      },
      {
        path: '/pages/membermessage/marjir/detail',
        name: 'marjirdetail',
        meta: { activeMenu: '/pages/membermessage/marjir/list' },
        component: () => import('../pages/membermessage/marjir/detail.vue')
      },
      // 装备管理
      {
        path: "/pages/membermessage/equipmentManagement/list",
        name: "equipmentManagementlist",
        component: () => import('../pages/membermessage/equipmentManagement/list.vue')
      },
      {
        path: "/pages/membermessage/equipmentManagement/add",
        name: "equipmentManagementadd",
        meta: { activeMenu: '/pages/membermessage/equipmentManagement/list' },
        component: () => import('../pages/membermessage/equipmentManagement/add.vue')
      },
      {
        path: "/pages/membermessage/equipmentManagement/edit",
        name: "equipmentManagementedit",
        meta: { activeMenu: '/pages/membermessage/equipmentManagement/list' },
        component: () => import('../pages/membermessage/equipmentManagement/edit.vue')
      },
      {
        path: "/pages/membermessage/equipmentManagement/detail",
        name: "equipmentManagementdetail",
        meta: { activeMenu: '/pages/membermessage/equipmentManagement/list' },
        component: () => import('../pages/membermessage/equipmentManagement/detail.vue')
      },
      // 整组交叉审核
      {
        path: '/pages/soldieraudit/list',
        name: 'soldierauditlist',
        component: () => import('../pages/soldieraudit/list.vue')
      },
      {
        meta: { activeMenu: '/pages/soldieraudit/list' },
        path: '/pages/soldieraudit/edit',
        name: 'soldierauditedit',
        component: () => import('../pages/soldieraudit/edit.vue')
      },
      {
        meta: { activeMenu: '/pages/soldieraudit/list' },
        path: '/pages/soldieraudit/detail',
        name: 'soldierauditdetail',
        component: () => import('../pages/soldieraudit/detail.vue')
      },

      // 训练计划表
      {
        path: '/pages/teamtrain/Thetrainingteam/list',
        name: 'Thetrainingteamlist',
        component: () => import('../pages/teamtrain/Thetrainingteam/list.vue')
      },
      {
        path: '/pages/teamtrain/Thetrainingteam/edit',
        meta: { activeMenu: '/pages/teamtrain/Thetrainingteam/list' },
        name: 'Thetrainingteamedit',
        component: () => import('../pages/teamtrain/Thetrainingteam/edit.vue')
      },
      {
        path: '/pages/teamtrain/Thetrainingteam/add',
        meta: { activeMenu: '/pages/teamtrain/Thetrainingteam/list' },
        name: 'Thetrainingteamadd',
        component: () => import('../pages/teamtrain/Thetrainingteam/add.vue')
      },
      {
        path: '/pages/teamtrain/Thetrainingteam/detail',
        meta: { activeMenu: '/pages/teamtrain/Thetrainingteam/list' },
        name: 'Thetrainingteamdetail',
        component: () => import('../pages/teamtrain/Thetrainingteam/detail.vue')
      },
      {
        path: '/pages/teamtrain/Thetrainingteam/satchTv',
        meta: { activeMenu: '/pages/teamtrain/Thetrainingteam/list' },
        name: 'Thetrainingteamdetail',
        component: () => import('../pages/pullcheck/satchTv.vue')
      },
      {
        path: '/pages/teamtrain/Thetrainingteam/allEdit',
        meta: { activeMenu: '/pages/teamtrain/Thetrainingteam/list' },
        name: 'Thetrainingteamdetail',
        component: () => import('../pages/teamtrain/Thetrainingteam/allEdit.vue')
      },

      // 年度训练计划
      {
        path: '/pages/teamtrain/area/list',
        name: 'arealist',
        component: () => import('../pages/teamtrain/area/list.vue')
      },
      {
        path: '/pages/teamtrain/area/edit',
        meta: { activeMenu: '/pages/teamtrain/area/list' },
        name: 'areaedit',
        component: () => import('../pages/teamtrain/area/edit.vue')
      },
      {
        path: '/pages/teamtrain/area/add',
        meta: { activeMenu: '/pages/teamtrain/area/list' },
        name: 'areaAdd',
        component: () => import('../pages/teamtrain/area/add.vue')
      },
      // 拉动点验
      {
        path: '/pages/pullcheck/list',
        name: 'pullchecklist',
        component: () => import('../pages/pullcheck/list.vue')
      },
      {
        path: '/pages/pullcheck/add',
        meta: { activeMenu: '/pages/pullcheck/list' },
        name: 'pullcheckadd',
        component: () => import('../pages/pullcheck/add.vue')
      },
      {
        path: '/pages/pullcheck/edit',
        meta: { activeMenu: '/pages/pullcheck/list' },
        name: 'pullcheckedit',
        component: () => import('../pages/pullcheck/edit.vue')
      },
      {
        path: '/pages/pullcheck/detail',
        meta: { activeMenu: '/pages/pullcheck/list' },
        name: 'pullcheckdetail',
        component: () => import('../pages/pullcheck/detail.vue')
      },
      {
        path: '/pages/pullcheck/satchTv',
        meta: { activeMenu: '/pages/pullcheck/list' },
        name: 'pullchecksatchTv',
        component: () => import('../pages/pullcheck/satchTv.vue')
      },
      // 组织架构
      {
        path: '/pages/organizationalStructure/list',
        name: 'organizationalStructurelist',
        component: () => import('../pages/organizationalStructure/list.vue')
      },
      {
        path: '/pages/organizationalStructure/add',
        name: 'organizationalStructureadd',
        meta: { activeMenu: '/pages/organizationalStructure/list' },
        component: () => import('../pages/organizationalStructure/add.vue')
      },
      {
        path: '/pages/organizationalStructure/neworganization',
        name: 'organizationalStructurenew',
        meta: { activeMenu: '/pages/organizationalStructure/list' },
        component: () => import('../pages/organizationalStructure/neworganization.vue')
      },
      {
        path: '/pages/organizationalStructure/edit',
        name: 'organizationalStructureedit',
        meta: { activeMenu: '/pages/organizationalStructure/list' },
        component: () => import('../pages/organizationalStructure/edit.vue')
      },
      // 考核管理
      {
        path: '/pages/appraisalmanagement/list',
        name: 'appraisalmanagementlist',
        component: () => import('../pages/appraisalmanagement/list.vue')
      },
      {
        path: '/pages/appraisalmanagement/listTwo',
        name: 'appraisalmanagementlist',
        component: () => import('../pages/appraisalmanagement/listTwo.vue')
      },
      // {
      //   path: '/pages/appraisalmanagement/add',
      //   name: 'appraisalmanagementadd',
      //   meta: { activeMenu: '/pages/appraisalmanagement/list' },
      //   component: () => import('../pages/appraisalmanagement/add.vue')
      // },
      {
        path: '/pages/appraisalmanagement/edit',
        meta: { activeMenu: '/pages/appraisalmanagement/list' },
        name: 'appraisalmanagementedit',
        component: () => import('../pages/appraisalmanagement/edit.vue')
      },
      {
        path: '/pages/teamtrain/appraisalmanagement/allEdit',
        meta: { activeMenu: '/pages/appraisalmanagement/list' },
        name: 'allEdit',
        component: () => import('../pages/appraisalmanagement/allEdit.vue')
      },
      {
        path: '/pages/appraisalmanagement/detail',
        meta: { activeMenu: '/pages/appraisalmanagement/list' },
        name: 'appraisalmanagementdetail',
        component: () => import('../pages/appraisalmanagement/detail.vue')
      },
      {
        path: '/pages/appraisalmanagement/editTwo',
        meta: { activeMenu: '/pages/appraisalmanagement/listTwo' },
        name: 'appraisalmanagementedit',
        component: () => import('../pages/appraisalmanagement/editTwo.vue')
      },
      {
        path: '/pages/appraisalmanagement/detailTwo',
        meta: { activeMenu: '/pages/appraisalmanagement/listTwo' },
        name: 'appraisalmanagementdetail',
        component: () => import('../pages/appraisalmanagement/detailTwo.vue')
      },
      // 系统管理-角色管理
      {
        path: '/pages/management/system/list',
        name: 'systemlist',
        component: () => import('../pages/management/system/list.vue'),
        meta: {
          activeMenu: '/pages/management/system/list'
        },
      },
      {
        path: '/pages/management/system/add',
        name: 'systemadd',
        component: () => import('../pages/management/system/add.vue'),
        meta: {
          activeMenu: '/pages/management/system/list'
        },
      },
      {
        path: '/pages/management/system/edit',
        name: 'systemedit',
        component: () => import('../pages/management/system/edit.vue'),
        meta: {
          activeMenu: '/pages/management/system/list'
        },
      },
      {
        path: '/pages/management/system/detail',
        name: 'systemdetail',
        component: () => import('../pages/management/system/detail.vue'),
        meta: {
          activeMenu: '/pages/management/system/list'
        },
      },
      // 系统管理-账号管理
      {
        path: '/pages/management/account/list',
        name: 'accountlist',
        component: () => import('../pages/management/account/list.vue'),
        meta: {
          activeMenu: '/pages/management/account/list'
        },
      },
      {
        path: '/pages/management/account/add',
        name: 'accountadd',
        component: () => import('../pages/management/account/add.vue'),
        meta: {
          activeMenu: '/pages/management/account/list'
        },
      },
      {
        path: '/pages/management/account/edit',
        name: 'accountedit',
        component: () => import('../pages/management/account/edit.vue'),
        meta: {
          activeMenu: '/pages/management/account/list'
        },
      },
      {
        path: '/pages/management/account/detail',
        name: 'accountdetail',
        component: () => import('../pages/management/account/detail.vue'),
        meta: {
          activeMenu: '/pages/management/account/list'
        },
      },
      // 系统管理-字典管理
      {
        path: '/pages/management/dictionary/list',
        name: 'dictionarylist',
        component: () => import('../pages/management/dictionary/list.vue'),
        meta: {
          activeMenu: '/pages/management/dictionary/list'
        },
      },
      {
        path: '/pages/management/dictionary/add',
        name: 'dictionaryadd',
        component: () => import('../pages/management/dictionary/add.vue'),
        meta: {
          activeMenu: '/pages/management/dictionary/list'
        },
      },
      {
        path: '/pages/management/dictionary/edit',
        name: 'dictionaryedit',
        component: () => import('../pages/management/dictionary/edit.vue'),
        meta: {
          activeMenu: '/pages/management/dictionary/list'
        },
      },
      {
        path: '/pages/management/dictionary/detail',
        name: 'dictionarydetail',
        component: () => import('../pages/management/dictionary/detail.vue'),
        meta: {
          activeMenu: '/pages/management/dictionary/list'
        },
      },
      // 日志查看
      {
        path: '/pages/management/logLook/list',
        name: 'logLooklist',
        component: () => import('../pages/management/logLook/list.vue'),
      },
      {
        meta: {
          activeMenu: '/pages/management/logLook/list'
        },
        path: '/pages/management/logLook/detail',
        name: 'logLooklistdetail',
        component: () => import('../pages/management/logLook/detail.vue'),
      },
      // 宣传
      {
        path: '/pages/propaganda/list',
        name: 'propagandalist',
        component: () => import('../pages/propaganda/list.vue')
      },
      {
        path: '/pages/propaganda/add',
        name: 'dictionaryadd',
        component: () => import('../pages/propaganda/add'),
        meta: {
          activeMenu: '/pages/propaganda/list'
        },
      },
      {
        path: '/pages/propaganda/edit',
        name: 'dictionaryedit',
        component: () => import('../pages/propaganda/edit'),
        meta: {
          activeMenu: '/pages/propaganda/list'
        },
      },
      {
        path: '/pages/propaganda/detail',
        name: 'dictionarydetail',
        component: () => import('../pages/propaganda/detail'),
        meta: {
          activeMenu: '/pages/propaganda/list'
        },
      },
      // 训练
      {
        path: '/pages/training/list',
        name: 'traininglist',
        component: () => import('../pages/training/list.vue')
      },
      {
        path: '/pages/training/add',
        name: 'trainingadd',
        component: () => import('../pages/training/add'),
        meta: {
          activeMenu: '/pages/training/list'
        },
      },
      {
        path: '/pages/training/edit',
        name: 'trainingedit',
        component: () => import('../pages/training/edit'),
        meta: {
          activeMenu: '/pages/training/list'
        },
      },
      {
        path: '/pages/training/detail',
        name: 'trainingdetail',
        component: () => import('../pages/training/detail'),
        meta: {
          activeMenu: '/pages/training/list'
        },
      },
      // 力量统计
      {
        path: '/pages/power/list',
        name: 'powerlist',
        component: () => import('../pages/power/list'),
        meta: {
          activeMenu: '/pages/power/list'
        },
      },
      // 经济
      {
        path: '/pages/economic/list',
        name: 'economiclist',
        component: () => import('../pages/economic/list'),
        meta: {
          activeMenu: '/pages/economic/list'
        },
      },
      {
        path: '/pages/economic/add',
        name: 'economicadd',
        component: () => import('../pages/economic/add'),
        meta: {
          activeMenu: '/pages/economic/list'
        },
      },
      {
        path: '/pages/economic/edit',
        name: 'economicedit',
        component: () => import('../pages/economic/edit'),
        meta: {
          activeMenu: '/pages/economic/list'
        },
      },
      {
        path: '/pages/economic/detail',
        name: 'economicdetail',
        component: () => import('../pages/economic/detail'),
        meta: {
          activeMenu: '/pages/economic/list'
        },
      },
      // 数据共享
      {
        path: '/pages/management/DS/list',
        name: 'DSlist',
        component: () => import('../pages/management/DS/list'),
        meta: {
          activeMenu: '/pages/management/DS/list'
        },
      },
      {
        path: '/pages/management/DS/edit',
        name: 'DSedit',
        component: () => import('../pages/management/DS/edit'),
        meta: {
          activeMenu: '/pages/management/DS/list'
        },
      },
      {
        path: '/pages/management/DS/detail',
        name: 'DSdetail',
        component: () => import('../pages/management/DS/detail'),
        meta: {
          activeMenu: '/pages/management/DS/list'
        },
      },
      // 队伍后备兵源
      {
        path: '/pages/soldiers/list',
        name: 'soldierslist',
        component: () => import('../pages/soldiers/list'),
        meta: {
          activeMenu: '/pages/soldiers/list'
        },
      },
      {
        path: '/pages/soldiers/add',
        name: 'soldiersadd',
        component: () => import('../pages/soldiers/add'),
        meta: {
          activeMenu: '/pages/soldiers/list'
        },
      },
      {
        path: '/pages/soldiers/edit',
        name: 'soldiersedit',
        component: () => import('../pages/soldiers/edit'),
        meta: {
          activeMenu: '/pages/soldiers/list'
        },
      },
      {
        path: '/pages/soldiers/detail',
        name: 'soldiersdetail',
        component: () => import('../pages/soldiers/detail'),
        meta: {
          activeMenu: '/pages/soldiers/list'
        },
      },
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
