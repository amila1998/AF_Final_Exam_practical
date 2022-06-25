const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:String,
    role:{
        default:0
    }
  
},
{ timestamps: true }
);

const User = mongoose.model('users',userSchema);
module.exports =User;
