var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var CommentSchema = new Schema({
    movie: {type:ObjectId,ref: 'Movie'},//ObjectId是默认生成的，主键，可以做到关联查询，推荐使用ObjectId，它不易重复，也没有业务含义
    from:{type: ObjectId, ref: 'User'},
    reply:[{
        from:{type: ObjectId, ref: 'User'},
        to: {type: ObjectId, ref: 'User'},
        content: String
    }],
    content: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

CommentSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

CommentSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

module.exports = CommentSchema;