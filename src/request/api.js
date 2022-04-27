import {
  get,
  post,
  BASE_URL
} from "./http";
export const urlMem = "https://rfb-zlf.wenzhou.gov.cn:8003/mode/专业队队员信息导入模板.xls";
export const urlSol = "https://rfb-zlf.wenzhou.gov.cn:8003/mode/队伍后备兵源导入模板.xls";
export const urlSold = "https://rfb-zlf.wenzhou.gov.cn:8003/mode/队员编兵导入模板.xlsx";
export const urlEco = "https://rfb-zlf.wenzhou.gov.cn:8003/mode/重要经济目标导入模板.xlsx";

// 文件上传
export const uploadFile = (data) => {
  return post("api/web/uploadFile", data);
};

// 获取验证码
export const sendCode = (data) => {
  // return get("api/screen/login", data)
  return post("api/web/defense/login/sendCode", data);
};
// 所有的训练科目
export const trainingSubjectsallList = (data) => {
  return get("api/web/defense/trainingSubjects/allList", data);
};
// 专业队信息-所有的专业队列表
export const teamallList = (data) => {
  return get("api/web/defense/team/allList", data);
};

// 所有装备
export const equipmentlist = (data) => {
  return get("api/web/defense/equipment/list", data);
};
// 所有队员
export const playersallList = (data) => {
  return get("api/web/defense/players/allList", data);
};
// 字典
// 宣传内容建设所有类型
export const TypeOfPropagandaContentConstruction = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_JSLX"
  });
};
// 温州市行政代码
export const ZD_WZ_XZQDM = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_WZ_XZQDM"
  });
};
// 组织指挥-人防指挥机构级别
export const ZD_ZZZH_RFZHJGJB = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_RFZHJGJB",
  });
};
// 组织指挥-指挥长职务级别
export const ZD_ZZZH_ZHZZWJB = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_ZHZZWJB",
  });
};
// 组织指挥-指挥平台级别
export const ZD_ZZZH_ZHPTJB = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_ZHPTJB",
  });
};
// 组织指挥-数据类型
export const ZD_ZZZH_SJLX = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_SJLX"
  });
};
// 组织指挥-信息通信情况
export const ZD_ZZZH_XXTXQK = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_XXTXQK",
  });
};
// 组织指挥-配套车辆用途
export const ZD_ZZZH_PTCLYT = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_PTCLYT",
  });
};
// 组织指挥-重要经济目标等级
export const ZD_ZZZH_ZYJJMBDJ = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_ZYJJMBDJ",
  });
};
// 组织指挥-重要经济目标大类
export const ZD_ZZZH_ZYJJMBDL = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_ZYJJMBDL",
  });
};
// 组织指挥-重要经济目标中类
export const ZD_ZZZH_ZYJJMBZL = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_ZYJJMBZL",
  });
};
// 组织指挥-重要经济目标小类
export const ZD_ZZZH_ZYJJMBXL = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_ZYJJMBXL",
  });
};
// 组织指挥-重要经济目标性质
export const ZD_ZZZH_ZYJJMBXZ = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_ZYJJMBXZ",
  });
};
// 组织指挥-专业队能力类型
export const ZD_ZZZH_ZYDNLLX = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_ZYDNLLX",
  });
};
// 组织指挥-性别
export const ZD_ZZZH_XB = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_XB"
  });
};
// 组织指挥-政治面貌
export const ZD_ZZZH_ZZMM = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_ZZMM"
  });
};
// 组织指挥-防护装备情况
export const ZD_ZZZH_FHZBQK = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_FHZBQK",
  });
};
// 组织指挥-防护物资储备情况
export const ZD_ZZZH_FHWZCBQK = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_ZZZH_FHWZCBQK",
  });
};
// 学历等级
export const ZD_XLDJ = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_XLDJ"
  });
};
// 行政区代码
export const ZD_XZQDM = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_WZ_XZQDM"
  });
};
export const ZD_KHCJ = (data) => {
  return get("api/web/defense/dictionary/detailList", {
    type: "ZD_KHCJ"
  });
};

// 角色管理-获取所有角色
export const rolegetRoleList = (data) => {
  return get("api/web/defense/role/getRoleList", data);
};
// 根据角色id获取所有角色
export const usergetAccountByRoleList = (data) => {
  return get("api/web/defense/user/getAccountByRoleList", data);
};

// 首页
export const apiIndex = (data) => {
  return get("api/web/index", data);
};
// 队员信息列表
export const playerslist = (data) => {
  return get("api/web/defense/players/list", data);
};
// 新增队员信息
export const playersadd = (data) => {
  return post("api/web/defense/players/add", data);
};
// 编辑队员信息
export const playersupdate = (data) => {
  return post("api/web/defense/players/update", data);
};
// 队员信息 -详情
export const playersdetail = (data) => {
  return get("api/web/defense/players/detail", data);
};
// 队员信息 -删除
export const playersdelete = (data) => {
  return get("api/web/defense/players/delete", data);
};
// 队员信息 -导入
export const playersImp = (data) => {
  return post("api/web/defense/players/import", data);
};
// 队员信息 -全部导出
export const exportPlayerlist = (data) => {
  return get("api/web/defense/players/exportPlayerlist", data);
};

// 专业队信息列表
export const teamlist = (data) => {
  return get("api/web/defense/team/list", data);
};
// 专业队信息-新增
export const teamadd = (data) => {
  return post("api/web/defense/team/add", data);
};
// 专业队信息-编辑
export const teamupdate = (data) => {
  return post("api/web/defense/team/update", data);
};
// 专业队信息-详情
export const teamdetail = (data) => {
  return get("api/web/defense/team/detail", data);
};
// 专业队信息-删除
export const teamdelete = (data) => {
  return get("api/web/defense/team/delete", data);
};
// 队员信息共享
export const getPlayerByGetPlayerList = (data) => {
  return get("api/web/defense/players/getPlayerByGetPlayerList", data);
};

// 整组交叉审核列表
export const soldierauditlist = (data) => {
  return get("api/web/defense/soldieraudit/list", data);
};
// 取消扩编
export const cancelTheIncrease = (data) => {
  return get("api/web/defense/players/cancelTheIncrease", data);
};
// 多扩编列表
export const cancelTheIncreaseList = (data) => {
  return get("api/web/defense/players/cancelTheIncreaseList", data);
};
// 整组交叉审核编辑
export const soldierauditupdate = (data) => {
  return post("api/web/defense/soldieraudit/update", data);
};
// 整组交叉审核详情
export const soldierauditdetail = (data) => {
  return get("api/web/defense/soldieraudit/detail", data);
};
// 整组交叉审核删除
export const soldierauditdelete = (data) => {
  return get("api/web/defense/soldieraudit/delete", data);
};
// 整组交叉审核编替换
export const soldierauditreplace = (data) => {
  return post("api/web/defense/soldieraudit/replace", data);
};
// 整组交叉审核导入
export const soldierauditimport = (data) => {
  return post("api/web/defense/soldieraudit/import", data);
};
// 导入兵源
export const importBY = (data) => {
  return post("api/web/defense/players/import", data);
};

// 队伍训练列表
export const traininglist = (data) => {
  return get("api/web/defense/training/list", data);
};
// 队伍训练新增
export const trainingadd = (data) => {
  return post("api/web/defense/training/add", data);
};
// 队伍训练编辑
export const trainingupdate = (data) => {
  return post("api/web/defense/training/update", data);
};
// 队伍训练详情
export const trainingdetail = (data) => {
  return get("api/web/defense/training/detail", data);
};
// 队伍训练删除
export const trainingdelete = (data) => {
  return get("api/web/defense/training/delete", data);
};
// 获取所有的训练计划
export const trainingallPlan = (data) => {
  return post("api/web/defense/training/allPlan", data);
};

// 计划列表
export const trainingplanList = (data) => {
  return post("api/web/defense/training/planList", data);
};
// 计划新增
export const trainingplanAdd = (data) => {
  return post("api/web/defense/training/planAdd", data);
};
// 计划编辑
export const trainingplanUpdate = (data) => {
  return post("api/web/defense/training/planUpdate", data);
};
// 计划删除
export const trainingplanDelete = (data) => {
  return post("api/web/defense/training/planDelete", data);
};

// 拉动点验列表
export const pullchecklist = (data) => {
  return get("api/web/defense/pullcheck/list", data);
};
// 拉动点验新增
export const pullcheckadd = (data) => {
  return post("api/web/defense/pullcheck/add", data);
};
// 拉动点验修改
export const pullcheckupdate = (data) => {
  return post("api/web/defense/pullcheck/update", data);
};
// 拉动点验详情
export const pullcheckdetail = (data) => {
  return get("api/web/defense/pullcheck/detail", data);
};
// 拉动点验删除
export const pullcheckdelete = (data) => {
  return get("api/web/defense/pullcheck/delete", data);
};

// 训练科目列表
export const trainingSubjectslist = (data) => {
  return get("api/web/defense/trainingSubjects/list", data);
};
// 训练科目-新增
export const trainingSubjectsadd = (data) => {
  return post("api/web/defense/trainingSubjects/add", data);
};
// 训练科目-删除
export const trainingSubjectsdelete = (data) => {
  return get("api/web/defense/trainingSubjects/delete", data);
};
// 训练科目-详情
export const trainingSubjectsdetail = (data) => {
  return get("api/web/defense/trainingSubjects/detail", data);
};
// 训练科目-编辑
export const trainingSubjectsupdate = (data) => {
  return post("api/web/defense/trainingSubjects/update", data);
};

// 宣传内容建设列表
export const propagandalist = (data) => {
  return get("api/web/defense/propaganda/list", data);
};
// 宣传内容建设新增
export const propagandaadd = (data) => {
  return post("api/web/defense/propaganda/add", data);
};
// 宣传内容建设编辑
export const propagandaupdate = (data) => {
  return post("api/web/defense/propaganda/update", data);
};
// 宣传内容建设详情
export const propagandadetail = (data) => {
  return get("api/web/defense/propaganda/detail", data);
};
// 宣传内容建设删除
export const propagandadelete = (data) => {
  return get("api/web/defense/propaganda/delete", data);
};

// 队伍后备兵源 -列表
export const playersSourceList = (data) => {
  return get("api/web/defense/playersSource/list", data);
};
// 队伍后备兵源 -导入
export const playersSourceImp = (data) => {
  return post("api/web/defense/playersSource/import", data);
};
// 队伍后备兵源-编辑
export const playersSourceupdate = (data) => {
  return post("api/web/defense/playersSource/update", data);
};
// 队伍后备兵源 -详情
export const playersSourcedetail = (data) => {
  return get("api/web/defense/playersSource/detail", data);
};
// 队伍后备兵源 -删除
export const playersSourcedelete = (data) => {
  return get("api/web/defense/playersSource/delete", data);
};
// 队伍后备兵源 -扩编
export const playersSourceexpansion = (data) => {
  return post("api/web/defense/playersSource/expansion", data);
};

// 重要经济目标列表
export const economiclist = (data) => {
  return get("api/web/defense/economic/list", data);
};
//  重要经济目标新增
export const economicadd = (data) => {
  return post("api/web/defense/economic/add", data);
};
//  重要经济目标编辑
export const economicupdate = (data) => {
  return post("api/web/defense/economic/update", data);
};
//  重要经济目标详情
export const economicdetail = (data) => {
  return get("api/web/defense/economic/detail", data);
};
//  重要经济目标删除
export const economicdelete = (data) => {
  return get("api/web/defense/economic/delete", data);
};
//  重要经济目标导入
export const economicImport = (data) => {
  return post("api/web/defense/economic/import", data);
};

// 角色列表
export const rolelist = (data) => {
  return get("api/web/defense/role/list", data);
};
// 角色-新增
export const roleadd = (data) => {
  return post("api/web/defense/role/add", data);
};
// 角色编辑
export const roleupdate = (data) => {
  return post("api/web/defense/role/update", data);
};
// 角色-所有的权限
export const rolegetPermissions = (data) => {
  return get("api/web/defense/role/getPermissions", data);
};
// 角色-删除
export const roledelete = (data) => {
  return get("api/web/defense/role/delete", data);
};

// 账号列表
export const userlist = (data) => {
  return get("api/web/defense/user/list", data);
};
// 账号-新增
export const useradd = (data) => {
  return post("api/web/defense/user/add", data);
};
// 账号-编辑
export const userupdate = (data) => {
  return post("api/web/defense/user/update", data);
};
// 账号-详情
export const userdetail = (data) => {
  return get("api/web/defense/user/detail", data);
};
// 账号-删除
export const userdelete = (data) => {
  return get("api/web/defense/user/delete", data);
};

// 字典类型列表
export const dictionarytypeList = (data) => {
  return get("api/web/defense/dictionary/typeList", data);
};
// 字典列表
export const dictionarylist = (data) => {
  return get("api/web/defense/dictionary/list", data);
};
// 字典新增
export const dictionaryadd = (data) => {
  return post("api/web/defense/dictionary/add", data);
};
// 字典编辑
export const dictionaryupdate = (data) => {
  return post("api/web/defense/dictionary/update", data);
};
// 字典删除
export const dictionarydelete = (data) => {
  return get("api/web/defense/dictionary/delete", data);
};
// 字典详情
export const dictionarydetail = (data) => {
  return get("api/web/defense/dictionary/detail", data);
};

// 组织架构管理列表
export const organizationalStructurelist = (data) => {
  return get("api/web/defense/organizationalStructure/list", data);
};
// 组织架构新增
export const organizationalStructureadd = (data) => {
  return post("api/web/defense/organizationalStructure/add", data);
};
// 组织架构修改
export const organizationalStructureupdate = (data) => {
  return post("api/web/defense/organizationalStructure/update", data);
};
// 组织架构详情
export const organizationalStructuredetail = (data) => {
  return get("api/web/defense/organizationalStructure/detail", data);
};
// 组织架构删除
export const organizationalStructuredelete = (data) => {
  return get("api/web/defense/organizationalStructure/delete", data);
};

// 日志列表
export const loglist = (data) => {
  return get("api/web/defense/log/list", data);
};
// 日志详情
export const logdetail = (data) => {
  return get("api/web/defense/log/detail", data);
};

// 装备列表
export const equipmentequipmentList = (data) => {
  return get("api/web/defense/equipment/equipmentList", data);
};
// 装备详情
export const equipmentdetail = (data) => {
  return get("api/web/defense/equipment/detail", data);
};
// 新增装备
export const equipmentadd = (data) => {
  return post("api/web/defense/equipment/add", data);
};
// 编辑装备
export const equipmentedit = (data) => {
  return post("api/web/defense/equipment/edit", data);
};
// 删除装备
export const equipmentdelete = (data) => {
  return post("api/web/defense/equipment/delete", data);
};

// 考核管理
// 考核管理列表
export const inspectionRecordslist = (data) => {
  return post("api/web/defense/inspectionRecords/list", data);
};
// 考核管理编辑
export const inspectionRecordsupdate = (data) => {
  return post("api/web/defense/inspectionRecords/update", data);
};
// 考核管理详情
export const inspectionRecordsdetail = (data) => {
  return post("api/web/defense/inspectionRecords/detail", data);
};

// 获取accessToken
export const getAccessToken = (data) => {
  return get("api/web/defense/login/getAccessToken", data);
};
// 扫码登陆
export const getQRUserInformation = (data) => {
  return post("/api/web/defense/login/getQRUserInformation", data);
};

//获取用户信息
export const getUserInformation = (data) => {
  return post("api/web/defense/login/getUserInformation", data);
};
// 登录
export const login = (data) => {
  return post("api/web/defense/login/login", data);
};

// 获取ticket
export const getticket = (data) => {
  return post("api/web/defense/toMsg/getJsApiData", data);
};
// 获取直播间Token
export const qiniucreateRoomToken = (data) => {
  return get("api/web/qiniu/createRoomToken", data);
};
// 获取所有的联络员
export const userliaison = (data) => {
  return get("api/web/defense/user/liaison", data);
};
// 队伍训练年度计计划导出
export const trainingexportPlan = (data) => {
  return post("api/web/defense/training/exportPlan", data);
};
// 队伍训练年度计计划通知
export const traininginformTheLiaison = (data) => {
  return post("api/web/defense/training/informTheLiaison", data);
};
// 整组交叉审核通知
export const soldierauditinform = (data) => {
  return get("/api/web/defense/soldieraudit/inform", data);
};
// 数据目录
export const teamgetFourTypeData = (data) => {
  return get("/api/web/defense/team/getFourTypeData", data);
};
// 训练计划表通知
export const pullcheckInformTheLiaison = (data) => {
  return post("api/web/defense/pullcheck/informTheLiaison", data);
};
// 训练计划导出
export const trainingExportPlan = (data) => {
  return get("api/web/defense/training/exportPlan", data);
};
// 拉动点验
export const pullcheckExportPull = (data) => {
  return get("api/web/defense/pullcheck/exportPull", data);
};
// 所有训练计划
export const trainingSelectAllPlan = (data) => {
  return post("/api/web/defense/training/selectAllPlan", data);
};
// 队伍训练编辑人员
export const trainingUpdatePersonList = (data) => {
  return post("/api/web/defense/training/updatePersonList", data);
};
// 队伍新增表单预填
export const trainingTrainingPersonNum = (data) => {
  return get("api/web/defense/training/trainingPersonNum", data);
};
export const assessExport = (data) => {
  return post("api/web/defense/inspectionRecords/export", data)
}
// 获取区域下所有专业队
export const teamAllTeamList = (data) => {
  return get("/api/web/defense/team/allTeamList", data)
}
// 获取区域下所有主管单位
export const getAreaBuildUnit = (data) => {
  return get("/api/web/defense/players/getAreaBuildUnit", data)
}