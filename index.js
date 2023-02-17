import config from 'dotenv';
import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import capacityRoutes from './routes/capacities.js';
import loginRoutes from './routes/loginRoutes.js';


import User from './models/user.js';
import capacityMessage from './models/capacityMessage.js';


const app = express();

let corsOrigins=[];

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  });
//app.use(cors(corsOptions));
app.use(bodyparser.json({limit: "3mb", extended:"true"}));
app.use(bodyparser.urlencoded({limit: "3mb", extended:"true"}));
app.use(express.json());

const CONNECTION_URL = 'mongodb+srv://naodbadmin:naodbadmin123@cluster0.fgokoxi.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

//ROUTES
app.use('/capacities', capacityRoutes);
app.use('/login', loginRoutes);


app.post('/userLogin', (req, res)  => {
    
        const {email,password} =req.body;
         User.findOne({email:email},(err,user)=>{
            if(user){
               if(password === user.password){
                   res.send({message:"login sucess",user:user})
               }else{
                   res.send({message:"wrong credentials"})
               }
            }else{
                res.send("not register")
            }
        });
});


app.get('/getCapacities',  async (req, res)  => {
    try {
        var query = {rownum: 1};
        capacityMessage.findOne(query, (error, result) =>  {
            if(error){
                res.send(error);
            }else{
                res.send(result);
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/uploadCapacities', async (req, res)  => {
    try {
        //console.log(req.body);
        var query = {rownum: 1},
            update = { capacities: req.body },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        capacityMessage.findOneAndUpdate(query, update, options, (error, result) =>  {
            if(error){
                res.send(error)
            }else{
                res.send({message:"sucessfull"})
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
