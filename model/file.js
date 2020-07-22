// 用于直接操作相册和图片的模块
const fs = require('fs');
/**
 * @method: 读取某个文件夹的内容
 * @param {String} dirName 被读取的文件夹名称或路径 
 * @param { Function } callback 回调函数
 */
// 读取某个文件夹的内容
exports.getDirs = function(dirName,callback){
    fs.readdir(dirName,function(err,files){
        /* // 写法1:
        if(err){
            callback(err,null);
            return ;
        }
        callback(null,files); */
        // 写法2:
        callback(err,files);
    });
}