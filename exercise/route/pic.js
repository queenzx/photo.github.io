// 创建图片相关的路由
const express = require('express');
const router = express.Router();
const file = require('../model/file');
const { SUCCESS,FAILED } =require('../status.js');
const fd = require('formidable');

// router.use(express.static("./uploads"));
// 写了这句话,show.ejs页面里的图片src地址前不需要加/

// 处理 /pic/show 请求,展示某个相册里面的内容
router.get('/show',function(req,res){
    // 获取请求参数得到被点击的相册名称
    var dir = req.query.dirName.trim();
    if(!dir){
        res.render("error",{errMsg:"获取相册出错"});
    }
    // 调用file里面的getDirs方法获取文件夹中的内容
    dirName = "uploads/"+dir;
    file.getDirs(dirName,function(err,files){
        if(err){
            console.log(err);
            res.render("error",{errMsg:"获取图片出错"});
            return ;
        }
        res.render('show.ejs',{pics:files,dir:dir});
    })
});

// 处理get方式的/pic/upload请求,跳转到上传页面
router.get("/upload",function(req,res){
    // 在上传图片时需要知道将图片传到哪个相册中
    // 获取uploads下所有的相册名
    file.getDirs('./uploads',function(err,dirs){
        if(err){
            console.log(err);
            res.render("error",{errMsg:"获取相册出错"});
            return ;
        }
        // 获取到相册,将其传递给上传页面
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
        // 调用file处理图片
        file.rename(dirName,pic,function(err){
            if(err){
                console.log(err);
                res.render("error",{errMsg:"上传图片失败"});
                return ;
            }
            // 上传成功,跳转到上传图片的文件夹中
            res.redirect("/pic/show?dirName="+dirName);
        });
    });
});


// 暴露路由
module.exports = router;