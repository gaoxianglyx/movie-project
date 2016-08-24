var _ = require('underscore');//一个体积很小的工具库，本js中的_extend就是其中的对象方法
var Movie = require('../models/movie');
var Comment = require(('../models/comment'));
//var fs = require('fs');
//var path = require('path')
    //查看电影列表
    exports.list = function (req, res) {
        Movie.fetch(function (err, movies) {
            if (err) {
                console.log(err);
            }
            res.render('list', {title:'电影-列表', movies: movies});
        });
    };
//详情页
    exports.detail = function (req, res) {
        var id = req.params.id;
        //后台记录访客，每访问一次，pv增加1
        Movie.update({_id: id}, {$inc:{pv: 1}},function(err){
            if(err){
                console.log(err);
            }
        })
        Movie.findById(id, function (err, movie) {
            Comment
            .find({movie: id})
            .populate('from', 'name')//mongodb没有join方法，用populate来,直接调用Comment里面from引用的name属性
            .populate('reply.from reply.to', 'name')//回复的数据，因为是关联到其他数据库的，所以需要populate来引入
            .exec(function(err, comments){
                res.render('detail', {
                    title: '电影-详情', 
                    movie: movie,
                    comments: comments
                });
            })
        }) 
    };
    // 管理员界面
    exports.new = function (req, res) {
        res.render('new', {title: '电影-后台录入页', movie: {
        title: "",
        doctor: "",
        country: "",
        language: "",
        year: "",
        poster: "",
        summary: ""
        }
    });
    };
    //admin poster
   /* exports.savePoster = function(req, res, next){
        var posterData = req.files.uploadPoster
        var filePath = posterData.path
        var originalFilename = posterData.originalFilename
        if(originalFilename){
            fs.readFile(filePath, function(err, data){
                var timestamp = Data.now();
                var type = posterData.type.split('/')[1];
                var poster = timestamp  + '.' + type;
                var newPath = path.jion(_dirname,'../../', '/public/upload' + poster);
                fs.writeFile(newPath, data, function(err){
                    req.poster = poster;
                    next();
                })
            })
        }
        else{
            next();
        }
    }*/
    // 逻辑控制:提交上传电影数据后的操作
    exports.save = function (req, res) {
        var movieObj = req.body.movie;
        var id = movieObj._id;
        var _movie;
        if(req.poster){
             movieObj.poster = req.poster;
        }
        if (id != 'undefined') {
            //如果电影已经存在，则是更新数据，否则就生成一个新的movie对象
            Movie.findById(id, function (err, movie) {
                if (err) {
                    console.log(err);
                }
                _movie = _.extend(movie, movieObj);//_.extend方法，吧movieObj中所有属性覆盖到movie上面，并返回movie对象
                _movie.save(function (err, movie) {
                    if (err) {
                        console.log(err);
                    }

                    res.redirect('/detail/' + movie._id);
                });
            });
        } else {
            _movie = new Movie({
                doctor: movieObj.doctor,
                title: movieObj.title,
                country: movieObj.country,
                language: movieObj.language,
                year: movieObj.year,
                poster: movieObj.poster,
                summary: movieObj.summary,
                flash: movieObj.flash
            });
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/detail/' + movie._id);
            });
        }
    };
    // 逻辑控制:更新
    exports.update = function (req, res) {
        var id = req.params.id;

        if (id) {
            Movie.findById(id, function (err, movie) {
                res.render('new', {
                    title: '后台更新页',
                    movie: movie
                })
            })
        }
    };
    // 逻辑控制:删除
    exports.del = function (req, res) {
        var id = req.query.id;

        if (id) {
            Movie.remove({_id: id}, function (err, movie) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({success: true});
                }
            });
        }
    };