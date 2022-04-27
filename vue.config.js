/*
 * @Author: your name
 * @Date: 2022-01-13 09:20:50
 * @LastEditTime: 2022-04-27 11:41:27
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /peopledefense/vue.config.js
 */
"use strict";
const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
// const defaultSettings = require("./src/settings.js");
const { config } = require("process");
// const name = defaultSettings.title || "Admin"; // page title
module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "./assets",
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true, //穿透
        // https:true,
        // open: true,
        host: "0.0.0.0",
        port: 10001,
        // disableHostCheck: true,
        // proxy: {22
        //     "/api": {
        //         target: "http://192.168.1.56:8011/api/",
        //         // target: "http://192.168.1.133:8011/",   
        //         // target:"http://221.213.114.155:1215/api/",
        //         // target:"http://221.213.114.155:1217/api/",
        //         changeOrigin: true,
        //         pathRewrite: {
        //             "^/api": ""
        //         }
        //     },
        // }
    },
    configureWebpack: {
        // name: name,
        resolve: {
            alias: {
                "@": resolve("src"),
                "@components": resolve("src/components")
            }
        }
    },
    chainWebpack: config => {
        config.resolve.symlinks(true);
    }
};