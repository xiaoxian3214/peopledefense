/*
 * @Author: your name
 * @Date: 2021-06-03 18:49:20
 * @LastEditTime: 2021-06-18 15:12:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web\src\utils\loading.js
 */
//在页面未加载完毕之前显示的loading Html自定义内容
var _LoadingHtml =
    `<div id="loadingDiv" style="display: none; width: 100%;height: 100%;">
    <div id="over" style=" position: fixed;top: 0;left: 0; width: 100%;height: 100%; background-color: #000000;opacity:0.5;z-index: 99998;">
    </div>
    <div id="layout" style="font-size: 50px;color: #95C7F4; position: fixed;top: 40%; left: 40%;width: 20%; height: 20%;  z-index: 99999;text-align:center;">
        <i class="el-icon-loading"></i>
    </div>
</div>`;
//呈现loading效果
document.body.innerHTML += _LoadingHtml;
let timer = null

//移除loading效果
function completeLoading() {
    clearTimeout(timer)
    document.getElementById("loadingDiv").style.display = "none";
}
//展示loading效果
function showLoading() {
    document.getElementById("loadingDiv").style.display = "block";
    timer = setTimeout(() => {
        completeLoading()
    }, 60000)
}
export default {
    completeLoading,
    showLoading
}