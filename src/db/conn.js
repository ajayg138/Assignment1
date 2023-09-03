const mongoose = require("mongoose");
//const { countDocuments } = require("moongose/models/user_model");

mongoose.connect("mongodb://localhost:27017/StudentRegistration", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log('no connection',e);
})