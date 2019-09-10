const requireJS = require('nobita-require');
const helper = requireJS('./app/extend/helper.js');
let _helper = {};

module.exports = app => {
  app.helper = app.context.helper = _helper;
  if (helper) {
    for (let i in helper) {
      if (Object.prototype.toString.call(helper[i]) == '[object Function]') {
        _helper[i] = helper[i].bind(app.context);
      } else {
        _helper[i] = helper[i];
      }
    }
  }
  

  return async (ctx, next) => {
    for (let i in helper) {
      if (Object.prototype.toString.call(helper[i]) == '[object Function]') {
        _helper[i] = helper[i].bind(ctx);
      } else {
        _helper[i] = helper[i];
      }
    }
    // _helper = null;
    await next();
  };

};