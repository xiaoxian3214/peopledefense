/*函数节流*/
function throttle(fn, interval) {
  var enterTime = 0; //触发的时间
  var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date(); //第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
function debounce(fn, interval) {
  var timer;
  var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
  return function() {
    clearTimeout(timer);
    var context = this;
    var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context, args);
    }, gapTime);
  };
}

//根据数组中对象的每一个值排序
function compare(property) {
  return function(a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  };
}

//根据身份证号获取生日
function getBirth(idCard) {
  var birthday = "";
  if (idCard != null && idCard != "") {
    if (idCard.length == 15) {
      birthday = "19" + idCard.slice(6, 12);
    } else if (idCard.length == 18) {
      birthday = idCard.slice(6, 14);
    }
    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    //通过正则表达式来指定输出格式为:1990-01-01
  }
  return birthday;
}

//获取年龄
function getage(idCard) {
  var myDate = new Date();
  var month = myDate.getMonth() + 1;
  var day = myDate.getDate();
  var age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
  if (
    idCard.substring(10, 12) < month ||
    (idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day)
  ) {
    age++;
  }
  return age;
}

// 导出至Excel
import XLSX from "xlsx";
/**
 * @param {表头数组} nameArray
 * @param {表格数据对象数组} dataArray
 * @param {导出文件名} filename
 */
function exportToExcel(nameArray, dataArray, filename = "导出") {
  // 二维数组
  let towList = [];
  towList.push(nameArray);
  dataArray.forEach(item => {
    towList.push(Object.values(item));
  });

  // 表格样式
  let wsData = nameArray.map(item => {
    return { wpx: 100 };
  });

  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.aoa_to_sheet(towList);
  ws["!cols"] = wsData;
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${filename}.xlsx`); //导出Excel
}

export { throttle, debounce, compare, getBirth, getage, exportToExcel };
