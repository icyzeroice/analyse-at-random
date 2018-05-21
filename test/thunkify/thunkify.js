/**
 * Module dependencies.
 * https://github.com/tj/node-thunkify
 */

var assert = require('assert');

/**
 * Expose `thunkify()`.
 */

module.exports = thunkify;

/**
 * Wrap a regular callback `fn` as a thunk.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

function thunkify(fn){
  assert('function' == typeof fn, 'function required');

  // 这里 arguments 为参数
  return function(){
    var args = new Array(arguments.length);
    var ctx = this;

    for(var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    // 这里 done 为回调函数
    return function(done){
      var called;

      args.push(function(){
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};