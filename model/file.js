// 用于直接操作相册和图片的模块
const fs = require('fs');
// 专门用于删除非空文件夹的模块
const rf = require('rimraf');
// 获取时间
const sd = require('silly-datetime');
// 
const path = require('path');
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
/**
 * @method 根据传递进来的路径创建对应的文件夹
 * @param {String} dirName 文件夹路径
 * @param {Function} callback 回调函数
 */
exports.create = function(dirName,callback){
    fs.mkdir(dirName,function(err){
        callback(err);
    });
}

/**
 * 
 * @param {String} dirName  被删除文件夹的路径
 * @param {Function} callback 回调函数
 */
exports.delete = function(dirName,callback){
    rf(dirName,function(err){
        callback(err);
    });
}

/**
 * @method 根据传递进来的文件夹名称和文件对象,修改其保存路径及文件名称
 * @param {String} dirName  保存的路径
 * @param {File} pic    被操作的文件对象
 * @param {Function} callback 回调函数
 */
exports.rename = function(dirName,pic,callback){
    // 获取文件的旧路径
    var oldPath = pic.path;
    // 获取文件的旧名称
    var name = pic.name;
    // 获取文件的后缀名
    // 方法1:
    // ext = name.substring(name.lastIndexOf('.'));// .xxx
    // 方法2:
    /* var arr = name.split('.');
    ext = arr[arr.length-1];// xxx */
    // 方法3:
    var ext = path.extname(name);// .xxx
    // 设置新的文件名
    // var n = new Date().getTime();
    var str = sd.format(new Date(),"YYYYMMDDHHmmss")+ext;// 20201023185546.jpg
    // 改名(修改路径)
    // 新的路径
    var newPath = "./uploads/"+dirName+"/"+str;
    fs.rename(oldPath,newPath,function(err){
        callback(err);
    });

}
