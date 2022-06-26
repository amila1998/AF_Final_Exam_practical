const User = require('../model/userModel');
const bcrypt = require("bcryptjs");
const jwt = require  ('jsonwebtoken');
require('dotenv').config();

let message, status;

const register = async (ctx) => {
    try {
        const user = ctx.request.body;
        const { name, email, password,role } = user;

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
                    name, email, password: hashPassword,role
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
    try {
        const { email, password } = ctx.request.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            message = "User not fount";
            status = 400
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                message = "Password incorrect";
                status = 400
            } else {
                const accessToken = createAccessToken({id:user._id})
                message = {msg:"Login Success", token:accessToken};
                status = 200
            }
        }
    } catch (error) {
        message = error.message;
        status = 500
    }
    ctx.body = message;
    ctx.status = status;
}

const getMyDetails = async(ctx)=>{
    try {
        const uid = await ctx.request.user.id;

        const user = await User.findById(uid);
        status=200;
        message=user;
        
    } catch (error) {
        message = error.message;
        status = 500
    }
    ctx.body = message;
    ctx.status = status;
}

const getAllUserDetails = async(ctx)=>{
    try {
        const users = await User.find();
        message = users;
        status = 200


        
    } catch (error) {
        message = error.message;
        status = 500
    }
    ctx.body = message;
    ctx.status = status;

}

const deleteMyAccount = async(ctx)=>{
    try {
        await User.findByIdAndDelete(ctx.request.user.id)
        message = "Delete Successfull";
        status = 200
        
    } catch (error) {
        message = error.message;
        status = 500
    }
    ctx.body = message;
    ctx.status = status;

}

const deleteUserAccount =async(ctx)=>{
    try {
        const uid =ctx.request.params.uid
        await User.findByIdAndDelete(uid)
        message = "Delete Successfull";
        status = 200
        
    } catch (error) {
        message = error.message;
        status = 500
    }
    ctx.body = message;
    ctx.status = status;
 
}

const updateMyaAccount =async(ctx)=>{
try {
    const {name,password}=ctx.request.body;

        // hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);


    await User.findByIdAndUpdate(ctx.request.user.id,{'name':name,'password':hashPassword})
    message = "Update Successfull";
    status = 200
    
} catch (error) {
    message = error.message;
    status = 500
}
ctx.body = message;
ctx.status = status;
}

const updateUserAccount =async(ctx)=>{
    try {
        const uid = ctx.request.params.uid;
        const {role}=ctx.request.body;
        await User.findByIdAndUpdate(uid,{'role':role})
            message = "Update Successfull";
            status = 200
        
    } catch (error) {
        
        message = error.message;
        status = 500
    }
    ctx.body = message;
    ctx.status = status;
    }





const createAccessToken = (user)=>{
    return jwt.sign(user, process.env.ACCESS_TOKEN,{expiresIn:"1d"})
}

module.exports = { register, login, getMyDetails,getAllUserDetails, getAllUserDetails,deleteMyAccount,deleteUserAccount ,updateMyaAccount,updateUserAccount}


