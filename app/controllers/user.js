var User = require('../models/user.js');
//singup
exports.showSignup = function (req, res) {
        res.render('signup', {title:'注册页面'});
};
exports.showSignin = function (req, res) {
        res.render('signin', {title:'登陆界面'});
};

exports.signup = function(req, res){
    var _user = req.body.user;//req.param('user')同样可以取到
    //用schemas中User的findOne方法，如果有已经存在的用户名，则跳转到登陆页面
    User.findOne({name: _user.name}, function(err, user){
        if(err) {console.log(err);}
        if(user){
            return res.redirect('/signin');
        }
        else{
            var user = new User(_user);
            user.save(function(err, user){
            if(err){
                console.log(err);
            }
            res.redirect('/');
            })
        }
    })
    
};

//signin
exports.signin = function(req, res){
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name:name}, function(err ,user){
        if(err){
            console.log(err);
        }
        if(!user){
            return res.redirect('/signup');//如果账号不存在，返回注册页
        }
        //调用User中的comparePassword方法
        user.comparePassword(password, function(err, isMatch){
            if (err){
                console.log(err);
            }
            if(isMatch){
                req.session.user = user;//如果密码匹配把user存入内存
                return res.redirect('/');
            }
            else{
                return res.redirect('/signin');
                res.end('<h1>密码错误</h1>')
                console.log('Password is not matched');
            }
        })
    })
}

//logout
exports.logout = function(req, res){
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
}

//userlist
exports.userlist = function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }
        res.render('userlist', {title:'电影-用户列表', users: users});
    });
};
//midware for user
exports.signinRequired = function (req, res, next) {
    var user = req.session.user;
    if(!user){
        return res.redirect('/signin');
    }
    next()
};
exports.adminRequired = function (req, res, next) {
    var user = req.session.user;
    if(user.role<=10){
        return res.redirect('/signin');
    }
    next();
};