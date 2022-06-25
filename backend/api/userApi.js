const User = require('../model/userModel');
const bcrypt = require("bcryptjs");

let message, status;

const register = async (ctx) => {
    try {
        const user = ctx.request.body;
        const { name, email, password } = user;

        if (!name || !email || !password) {
            message = "Fill All Fields !!";
            status = 400
        } else {
            const exitUser = await User.findOne({ 'email': email });
            if (exitUser) {
                message = "Already have an account";
                status = 400
            } else {
                
                // hash password
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(password, salt);

                const newUser = new User({
                    name, email, password:hashPassword
                });
                await newUser.save();
                message = "Registartion Success!";
                status = 200
            }
        }
    } catch (error) {
        console.log("🚀 ~ file: userApi.js ~ line 9 ~ register ~ error", error);
        message = error;
        status = 500
    }
    ctx.body = message;
    ctx.status = status;
}

const login = async (ctx) => {

}

module.exports = { register, login }


