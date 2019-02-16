module.exports = async (ctx, next) => {
  let _helper = {};
  if (ctx.helper) {
    for (let i in ctx.helper) {
      if (typeof ctx.helper[i] == 'function') {
        _helper[i] = ctx.helper[i].bind(ctx);
      }
    }
  }
  ctx.helper = _helper;
  _helper = null;
  await next();
};