// 创建图片相关的路由
const express = require('express');
const router = express.Router();

const { SUCCESS,FAILED } =require('../status.js');
const fd = require('formidable');
const fs = require('fs');
const {Pic, Dir} = require('../model/db');
const { dir } = require('console');

// router.use(express.static("./uploads"));
// 写了这句话,show.ejs页面里的图片src地址前不需要加/

// 处理 /pic/show 请求,展示某个相册里面的内容
router.get('/show',function(req,res){
    // 获取请求参数得到被点击的相册名称
    var dir = req.query.dirName.trim();
    //  /a/xxx.jpg
    // 方法1:
    /* var reg = new RegExp("/"+dir+"/");
    Pic.find({name:{$regex:reg}},function(err,pics){

    }); */
    // 方法2:
    Pic.find({dir:dir},function(err,pics){
        console.log(err);
        res.render('show',{pics:pics});
    });
});

// 处理get方式的/pic/upload请求,跳转到上传页面
router.get("/upload",function(req,res){
    // 在上传图片时需要知道将图片传到哪个相册中
    // 获取uploads下所有的相册名
    Dir.find({},function(err,dirs){
        console.log(err);
        res.render('upload',{dirs:dirs});
    });
});

// 处理post方式的/pic/upload请求,上传图片
router.post("/upload",function(req,res){
    // 处理图片的上传
    // 创建表单对象
    var form = new fd.IncomingForm();
    // 设置上传临时保存路径
    form.uploadDir = "./temp";
    // 解析请求
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err);
            res.render("error",{errMsg:"上传图片失败"});
            return ;
        }
        // 获取表单中的数据
        // 文本域数据: 选择的文件夹名称
        var dirName = fields.dirName;
        // 获取图片文件
        var pic = files.pic;
        // 获取图片名称
        var name = pic.name;
        // 旧路径
        var oldPath = pic.path;
        // 新路径: ./uploads/dir/xxx.jpg
        var newPath = './uploads/'+dirName+'/'+name;
        fs.rename(oldPath,newPath,function(err){
            console.log(err);
            // 保存进数据库
            var o = new Pic({
                name:name,
                dir:dirName
            });
            o.save(function(err,product){
                console.log(err);
                console.log(product);
                res.redirect("/pic/show?dirName="+dirName);
            });
        });
    });
});


// 暴露路由
module.exports = router;