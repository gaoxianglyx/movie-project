var Comment = require('../models/comment');

// commet
exports.save = function (req, res) {
    var _comment = req.body.comment;
    var movieId = _comment.movie;
    //判断，如果是回复给回复
    if(_comment.cid){
        Comment.findById(_comment.cid, function(err, comment){
            console.log('有回复');
            console.log('评论给：'+comment.reply);
            var reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }//将input里面的数据读出来，加入replay数组
            comment.reply.push(reply);
            comment.save(function(err, comment){
                if (err) {
                    console.log(err);
                }

                res.redirect('/detail/' + movieId);
            })
        })
    }
    else{
        var comment = new Comment(_comment);
        comment.save(function (err, comment) {
            console.log('评论来自：'+comment.from);
            if (err) {
                console.log(err);
            }

            res.redirect('/detail/' + movieId);
        })
    }
}