const pkg = require('jsonwebtoken');
const { verify } = pkg;
require('dotenv').config();

const auth = async (ctx, next) => {
    try {
        const token = await ctx.get('Authorization');
        if (!token) {
            ctx.status = 400;
            ctx.body = "Token Not Found";
        } else {
            await verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
                if (err) {
                    ctx.status = 400;
                    ctx.body = "Invalid Authentication";
                } else {
                    ctx.request.user = user;
                    await next();
                }
            })
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = error.message;
    }

}

module.exports = auth;
