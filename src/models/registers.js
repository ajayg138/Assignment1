const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({

    fname:{
        type:String,
        require:true,
    },

    lname:{
        type:String,
        require:true,
    },

    dob:{
        type:Date,
        require:true
    },

  city:{
        type:String,
        require:true,
    },

    gender:{
        type:String,
        require:true,
    },

    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true,
    },
    confirmPassword:{
        type:String,
        require:true,
    }
});



const Register = new mongoose.model("Register", studentSchema);

module.exports =Register;