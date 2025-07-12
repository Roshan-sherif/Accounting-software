const express =require('express');
const { CheckUser } = require('../controllers/userControllers');
const router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body)
    CheckUser(req.body).then((user)=>{
        const users= {
            name:user.name,
            email:user.email,
            role:user.role
        } 
            
res.json(users)
    }).catch((err)=>{
        console.log(err)
    })
})
module.exports=router