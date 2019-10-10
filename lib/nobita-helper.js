const requireJS = require('nobita-require');
const helper = requireJS('./app/extend/helper.js');

const bindFunc = (func, ctx) => {
  const data = {};
  if (typeof func == 'function') {
    return func.bind(ctx);
  } else if (typeof func == 'object') {
    for (const i in func) {
      data[i] = bindFunc(func[i], ctx);
    }
  }
  return data;
}

module.exports = app => {
  return async (ctx, next) => {
    app.context.helper = bindFunc(helper, ctx);
    await next();
  };
};