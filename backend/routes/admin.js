const express =require('express');
const adminControllers = require('../controllers/adminControllers');
const authMiddleware = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/authoriseRoles');
const router = express.Router();

router.post('/create-company',authMiddleware,authorizeRoles("admin"),(req,res)=>{
    console.log(req.body)
    adminControllers.CreateCompany(req.body).then((data)=>{
        res.json({status: true})
    })
    
})
module.exports=router