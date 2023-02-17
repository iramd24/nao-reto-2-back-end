import User from '../models/user.js'

export const userLogin = async (req, res)  => {
    try {
        const {email,password} =req.body;
        await User.findOne({email:email},(err,user)=>{
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
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const userRegister = async (req, res)  => {
    try {
        console.log(req.body) 
        const {email,password} =req.body;
        await User.findOne({email:email},(err,user)=>{
            if(user){
                res.send({message:"user already exist"})
            }else {
                const user = new User({email,password})
                user.save(err=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send({message:"sucessfull"})
                    }
                })
            }
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};