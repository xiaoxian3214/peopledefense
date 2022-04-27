/*
 * @Author: your name
 * @Date: 2021-06-23 16:38:25
 * @LastEditTime: 2021-06-24 14:35:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\src\utils\uploadFile.js
 */
import { Notification } from 'element-ui'
let COS = require('cos-js-sdk-v5');

export default function uploadFile(selectedFile,name) {
    return new Promise((resolve,reject)=>{


        let cos = new COS({
            SecretId: 'AKIDGLAi02oJWT8WdU4NPBgtpUsynLccKlwp',
            SecretKey: 'dz3rOecKq53lBKCn7AwQdZEbiY7PRDiv'
        })

        cos.sliceUploadFile({
            Bucket: 'webox-1305910260', /* 必须 */
            Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
            Key: getFileName(name),              /* 必须 */
            StorageClass: 'STANDARD',
            Body: selectedFile, // 上传文件对象
            onProgress: function(progressData) {
                
            }
         }, function(err, data) {
            if(err) {
                Notification({
                    title: err,
                    type: "error",
                    showClose: false,
                    duration: 1000
                })                 
            }else {
                resolve(data)
            }
            
         });
    })

}
// 获取文件名
function getFileName(name) {
    let str = name || ""
    return dateFormat("yyMMdd") + "/" + dateFormat("yyMMddHHmmss") + getNumber() + "." + str.split(".")[str.split(".").length-1]
}
// 获取随机数
function getNumber() {
    return Math.floor(Math.random()*8888 + 1111).toString();//获取1111——9999随机数
}
// 格式化日期
function dateFormat(fmt, date) {
    let ret;
    let dateNow = date || new Date()
    const opt = {
        "y+": dateNow.getFullYear().toString(),        // 年
        "M+": (dateNow.getMonth() + 1).toString(),     // 月
        "d+": dateNow.getDate().toString(),            // 日
        "H+": dateNow.getHours().toString(),           // 时
        "m+": dateNow.getMinutes().toString(),         // 分
        "s+": dateNow.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}