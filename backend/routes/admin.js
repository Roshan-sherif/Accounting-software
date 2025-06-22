const express =require('express');
const adminControllers = require('../controllers/adminControllers');
const router = express.Router();

router.post('/create-company',(req,res)=>{
    console.log(req.body)
    adminControllers.CreateCompany(req.body).then((data)=>{
        res.json({status: true})
    })
    
})
module.exports=router