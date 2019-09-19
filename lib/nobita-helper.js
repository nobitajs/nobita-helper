const requireJS = require('nobita-require');
const helper = requireJS('./app/extend/helper.js');

module.exports = app => {
  if (helper) {
    for (let i in helper) {
      if (typeof helper[i] == 'function') {
        helper[i] = helper[i].bind(app.context);
      } else {
        helper[i] = helper[i];
      }
    }
  }
  app.helper = helper;
  return async (ctx, next) => {
    app.context.helper = helper
    await next();
  };

};