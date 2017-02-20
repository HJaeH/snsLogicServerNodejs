/**
 * Created by a on 2/12/17.
 */
var Promise = require('bluebird');


exports.userModel = Promise.promisifyAll(require('./user'));
exports.articleModel = Promise.promisifyAll(require('./article'));
exports.artureModel = Promise.promisifyAll(require('./arture'));
/*

exports.userModel = require('./user');
exports.articleModel = require('./article');
exports.artureModel = require('./arture');*/
