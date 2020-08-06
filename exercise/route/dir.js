// 创建相册相关的路由
const express = require('express');
const router = express.Router();
const fs = require('fs');
const rf = require('rimraf');
const {Dir} = require('../model/db.js');
const { SUCCESS,FAILED } = require('../status.js');
const { dir } = require('console');

// 处理 /dir 请求,显示服务器上所有的相册
router.get('/',function(req,res){
    // 从数据库获取当前服务器上有哪些文件夹
    Dir.find({},null,{sort:{name:1}},function(err,dirs){
        if(err){
            res.render("error",{errMsg:"获取文件失败"});
            return ;
        }
        // dirs是一个对象数组
        res.render("index",{dirs:dirs});
    });
});
  

// 处理 get方式的 /dir/mkdir 请求,跳转到新建相册页面

    // 跳转到创建页面
    // 该页面不需要渲染数据,所以不需要传递数据过去
    

// 处理 post方式的 /dir/mkdir,创建相册

    // 获取请求参数dirName
    
    // 检查dirName的合法性
    
    // fs模块创建文件夹,保存进数据库
    
        // 创建成功,保存数据库
        

// 处理 /dir/check 请求,获取传递过来的参数并检查文件夹名称是否已经存在

    // 获取参数
    
        // 如果没有数据,则返回状态1
        
    // 判断dirName是否已经存在
    //找到了数据
            

// 处理 /dir/delete 请求,删除相册

    // 获取参数
    
        // 参数不合法
        
        // 删除文件夹成功,去删除数据库中的记录
        


// 暴露路由
