const koaRouter = require('koa-router');

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const { register, login , getMyDetails,getAllUserDetails,deleteMyAccount,deleteUserAccount,updateMyaAccount,updateUserAccount} = require('../api/userApi');

const userRouter = new koaRouter(({ prefix: '/user' }));

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/getUserDetails',auth, getMyDetails);
userRouter.get('/getAllUserDetails',auth,admin, getAllUserDetails);
userRouter.delete('/deleteMyAccount', auth, deleteMyAccount)
userRouter.delete('/deleteAccount/:uid',auth,admin,deleteUserAccount)
userRouter.patch('/updateMyaAccount',auth,updateMyaAccount)
userRouter.patch('/updateUserAccount/:uid',auth,admin,updateUserAccount)


module.exports = userRouter;


