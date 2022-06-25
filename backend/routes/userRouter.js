const koaRouter = require('koa-router');

const { register, login } = require('../api/userApi');

const userRouter = new koaRouter(({ prefix: '/user' }));

userRouter.post('/register', register);
userRouter.post('/login', login);

module.exports = userRouter;


