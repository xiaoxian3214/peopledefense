/*
 * @Author: your name
 * @Date: 2020-11-26 19:12:11
 * @LastEditTime: 2021-08-05 15:35:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shop-manage\src\utils\tools.js
 */




//千位分隔符
export const objValuefilter = (searchfrom) => {
	let obj = {};
	for (const key in searchfrom) {
		// if (searchfrom[key]) {
		obj[key] = searchfrom[key];
		// }
	}
	return obj;
}
// export const clearObjvlues = (clearObjvlues) => {
// 	for (const key in clearObjvlues) {
// 		clearObjvlues[key] = "";
// 	}
// }
export const splitK = number => {

	var decimal = String(number).split('.')[1] || ''; //小数部分
	var tempArr = [];
	var revNumArr = String(number).split('.')[0].split("").reverse(); //倒序
	for (let i in revNumArr) {
		tempArr.push(revNumArr[i]);
		if ((i + 1) % 3 === 0 && i != revNumArr.length - 1) {
			tempArr.push(',');
		}
	}
	var zs = tempArr.reverse().join(''); //整数部分
	return decimal ? zs + '.' + decimal : zs;
}
/*只能输入整数验证*/
// value 需要验证的值
// maxNum 最大值
// minNum 最小值
export const integer = (value, maxNum, minNum) => {
	let num = value.replace(/^00+/g, "0")
		.replace(/^0(\d+)/, '$1')
		.replace(/[^\d]/g, '')

	if (isNaN(num)) {
		return ''
	} else {
		if ((maxNum || maxNum === 0) && !isNaN(maxNum)) {
			if (num >= maxNum) {
				return maxNum
			} else {
				return num
			}
		}
		if ((minNum || minNum === 0) && !isNaN(minNum)) {
			if (num <= minNum) {

				return minNum
			} else {
				return num

			}
		}
		return num

	}
}
/*只能输入两位小数验证*/
// value 值
// maxNum 最大值
// minNum 最小值
export const twoDecimals = (value, maxNum, minNum) => {
	let num = value.replace(/^00+/g, "0")
		.replace(/^0(\d+)/, '$1')
		.replace(/[^\d.]/g, '')
		.replace(/^\./g, '')
		.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
		.replace(/\./, '#').replace(/\./g, '')
		.replace('#', '.')
	if (isNaN(num)) {
		return ''
	} else {
		if ((maxNum || maxNum === 0) && !isNaN(maxNum)) {
			if (num >= maxNum) {
				return maxNum
			} else {
				return num
			}
		} else if ((minNum || minNum === 0) && !isNaN(minNum)) {
			if (num <= minNum) {
				return minNum
			} else {
				return num
			}
		} else {
			return num
		}
	}
}
/*只能输入两位小数验证*/
// value 值
// maxNum 最大值
// minNum 最小值
// export const  oneDecimals = (value,maxNum,minNum)=> {
// 	let num = value.replace(/^00+/g,"0")
// 	               .replace(/^0(\d+)/,'$1')
// 				   .replace(/[^\d.]/g, '')
// 				   .replace(/^\./g, '')
// 				   .replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3')
// 				   .replace(/\./, '#').replace(/\./g, '')
// 				   .replace('#', '.')
// 	if(isNaN(num)) {
// 		return ''
// 	}else {
// 		if((maxNum||maxNum===0)&&!isNaN(maxNum)) {
// 			if(num>=maxNum) {
// 				return maxNum
// 			}else {
// 				return num
// 			}
// 		}else if((minNum||minNum===0)&&!isNaN(minNum)){
// 			if(num<=minNum) {
// 				return minNum
// 			}else {
// 				return num
// 			}
// 		}else {
// 			return num
// 		}
// 	}
// }

/*函数节流*/
export const throttle = (fn, interval) => {
	var enterTime = 0; //触发的时间
	var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
	return function () {
		var context = this;
		var backTime = new Date(); //第一次函数return即触发的时间
		if (backTime - enterTime > gapTime) {
			fn.call(context, arguments);
			enterTime = backTime; //赋值给第一次触发的时间，这样就保存了第二次触发的时间
		}
	};
}
/*函数防抖*/
export const debounce = (fn, interval) => {
	var timer;
	var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
	return function () {
		clearTimeout(timer);
		var context = this;
		var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
		timer = setTimeout(function () {
			fn.call(context, args);
		}, gapTime);
	};
}


// 标准日期转化
// 到分
export const editTimeMinutes = (time) => {
	if (!time) {
		return ''
	}
	var d = new Date(time);
	// return d.getFullYear() + '-' + ((d.getMonth() + 1)>=10?(d.getMonth() + 1):'0'+(d.getMonth() + 1)) + '-' + (d.getDate()>=10?d.getDate():'0'+d.getDate()) + ' ' + (d.getHours()>=10?d.getHours():'0'+d.getHours()) + ':' + (d.getMinutes()>=10?d.getMinutes():'0'+d.getMinutes()) + ':' + (d.getSeconds()>=10?d.getSeconds():'0'+d.getSeconds());
	return d.getFullYear() + '-' + ((d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()) + ' ' + (d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()) + ':' + (d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes());
}
// 到天
export const editTimeDay = (time) => {
	if (!time) {
		return ''
	}
	var d = new Date(time);
	return d.getFullYear() + '-' + ((d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() >= 10 ? d.getDate() : '0' + d.getDate());
}
// 到月
export const editTimeMonth = (time) => {
	if (!time) {
		return ''
	}
	var d = new Date(time);
	return d.getFullYear() + '-' + ((d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1));
}
// 导出至Excel
import XLSX from "xlsx";
/**
 * @param {表头数组} nameArray
 * @param {表格数据对象数组} dataArray
 * @param {导出文件名} filename
 */
export function exportToExcel(nameArray, dataArray, filename = "导出") {
	// 二维数组
	let towList = [];
	towList.push(nameArray);
	dataArray.forEach(item => {
		towList.push(Object.values(item));
	});

	// 表格样式
	let wsData = nameArray.map(item => {
		return {
			wpx: 100
		};
	});

	let wb = XLSX.utils.book_new();
	let ws = XLSX.utils.aoa_to_sheet(towList);
	ws["!cols"] = wsData;
	XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
	XLSX.writeFile(wb, `${filename}.xlsx`); //导出Excel
}

export const GetRequestParameters = (label) => { //label 参数名
	let url = window.location.search;
	let theRequest = new Object();
	if (url.indexOf("?") != -1) {
		let str = url.substr(1);
		let strs = str.split("&");
		for (let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
		}
	}
	return theRequest[label];
}