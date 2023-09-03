const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const async = require("hbs/lib/async");
const port = process.env.PORT || 3000;


const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path)

app.get("/",(req,res) => {
    res.render("index")
});

app.get("/register",(req,res) => {
    res.render("register")
});

app.post("/register",async(req,res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
            const registerStudent = new Register({
               fname: req.body.fname,
                lname: req.body.lname,
                dob: req.body.dob,
                gender: req.body.gender,
                city: req.body.city,
                email: req.body.email,

                password: password,
                confirmpassword: cpassword
            })
        const registered = await registerStudent.save();
        res.status(201).render("index");
           
        }
        else{
            res.send("Password are not matching")
        }
    


    } catch (error){
        console.log('Data not sent')
        res.status(400).send(error);
    }
})

app.get("/login",(req,res) => {
    res.render("login")
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);

})

app.post("/login",async(req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        
        if(useremail.password ===password){
            res.status(201).render("profile");
        }else{
            res.send("password are not matching");
        }
       
    }catch(error){
        res.status(400).send("invalid Email")
    }
});

