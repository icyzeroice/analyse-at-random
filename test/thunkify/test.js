const thunkify = require('./thunkify')

function demo(arg1, arg2, call1) {
  call1(arg1, arg2);
}

const thunkify_demo = thunkify(demo)

thunkify_demo(1, 2)(console.log)