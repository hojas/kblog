'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var md5 = require('../common/md5');

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    create_time: { type: Date, default: Date.now }
});

UserSchema.methods.add = function() {
    let p = new Promise();

    this.password = md5(this.password);

    this.save(function(err, data) {
        if (err) {
            p.reject(err);
        } else {
            p.resolve(null, data);
        }
    });

    return p;
};

module.exports = mongoose.model('User', UserSchema);

