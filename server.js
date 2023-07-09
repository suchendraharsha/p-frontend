const express = require("express");
const userModel = require("./model/UserModel");
const mongoose = require("mongoose");

const dotenv = require("dotenv");

/* const mysql = require('mysql'); */

const cors = require('cors');

/* const { check, validationResult } = require('express-validator'); */

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name,email,password) VALUES (?)";
    const values = [        
        req.body.name,        
        req.body.email,        
        req.body.password    
    ]    
    db.query(sql, [values], (err, data) => {        
        if(err) {            
            return res.json("Error");        
        }        
        return res.json(data);    
    })
}) */

app.post('/signup', async(req, res) => {
    try{
    const {name,email,password}=req.body  
    const data = await userModel.create({name,email,password});
      
    return res.json(data);
    } catch(error){
        return res.json("Error")
    }
})
app.post('/login',async(req, res) => {
    try{
    const {email,password}=req.body  
    const data = await userModel.findOne({email,password});
      
    return res.json("Success");
    } catch(error){
        return res.json("Error")
    }
}
)
/* app.post('/login',[    
    check('email', "Emaill length error").isEmail().isLength({min: 10, max:30}),    
    check('password', "password length 8-10").isLength({min: 8, max: 20})], (req, res) => {    
        const sql = "SELECT * FROM login WHERE email = ? AND password = ?";    
        db.query(sql, [req.body.email,req.body.password ], (err, data) => {
        const errors = validationResult(req);        
        if(!errors.isEmpty()) {            
            return res.json(errors);        
        } 
        else {            
            if(err) {                
                return res.json("Error");            
            }            
            if(data.length > 0) {                
                return res.json("Success");            
            } 
            else {                
                return res.json("Failed");            
            }        
        }            
    })
}) */

/* app.listen(8081, ()=> {    
    console.log("listening");
}) */

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8081;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));