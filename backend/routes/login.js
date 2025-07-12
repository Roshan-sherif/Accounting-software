const express =require('express');
const router = express.Router();

router.post('/',(req,res)=>{
    console.log('hello')
})
module.exports=router