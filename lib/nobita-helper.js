module.exports = async (ctx, next) => {
  if (ctx.helper) {
    for (let i in ctx.helper) {
      if (typeof ctx.helper[i] == 'function') {
        ctx.helper[i] = ctx.helper[i].bind(ctx);
      }
    }
  }
  await next();
};