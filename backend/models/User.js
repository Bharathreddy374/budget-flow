const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const  UserSchema = new mongoose.Schema({
    fullname:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    pass:{type:String,default:null},
    profileImageUrl:{type:String,default:null},
},{
    timestamps:true
}
);

UserSchema.pre('save',async function (next) {
    if(!this.isModified("pass"))return next();
    this.pass=await bcrypt.hash(this.pass,10);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword,this.pass);
};
module.exports= mongoose.model("User",UserSchema);
