module.exports = async (ctx, next) => {
  let _helper = {};
  if (ctx.helper) {
    for (let i in ctx.helper) {
      if (Object.prototype.toString.call(ctx.helper[i]) == '[object Function]') {
        _helper[i] = ctx.helper[i].bind(ctx);
      } else {
        _helper[i] = ctx.helper[i];
      }
    }
  }
  ctx.app.context.helper = _helper;
  _helper = null;
  await next();
};