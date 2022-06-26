const User = require('../model/userModel');

const admin =async(ctx,next)=>{
    try {
        const user = await User.findById(ctx.request.user.id);
        if (!user) {
            ctx.status=400;
            ctx.body="Cannot find User";
        } else {
            if (user.role!=2) {
                ctx.status=400;
                ctx.body="Invalid Admin Authentication";
            } else {
                await next();
            }
        }
    } catch (error) {
        ctx.status=500;
        ctx.body=error.message;
    }
}

module.exports = admin;