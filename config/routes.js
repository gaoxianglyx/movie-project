var Index = require('../app/controllers/index.js');
var User = require('../app/controllers/user.js');
var Movie = require('../app/controllers/movie.js');
var Comment = require('../app/controllers/comment.js');
module.exports = function(app){
    // 路由
    //预处理
    app.use(function(req, res,next){
         var _user = req.session.user;
        app.locals.user = _user;//挂到locals上面，就是程序的本地变量，可以在页面访问到 
        next();
    })
    // 用户界面_首页
    app.get('/', Index.index);
     //User
    app.post('/user/signup', User.signup);
    app.post('/user/signin', User.signin);
    app.get('/signin', User.showSignin);
    app.get('/signup', User.showSignup);
    app.get('/logout', User.logout);
    app.get('/userlist', User.signinRequired, User.adminRequired, User.userlist);
    //Movie
    app.get('/list', Movie.list);
    app.get('/detail/:id', Movie.detail);
    app.get('/admin/new',User.signinRequired, User.adminRequired, Movie.new);
    app.post('/admin/control/new', User.signinRequired, User.adminRequired, Movie.save);
    app.get('/admin/control/update/:id', User.signinRequired, User.adminRequired, Movie.update);
    app.delete('/admin/control/delete',User.signinRequired, User.adminRequired,  Movie.del);
    //comment
    app.post('/user/comment', User.signinRequired, Comment.save);
}