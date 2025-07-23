const jwt=require('jsonwebtoken')

const authMiddleware =(req,res,next)=>{
const token = req.cookies
if(!token){
    return res.status(401).json({error:'Authentication token missing'});

}
    try {
        const decode=jwt.verify(token,process.env.JWT_TOKEN)
        req.user=decode
        next()

    } catch (error) {
        return res.status(403).json({error:'Invalide or expired or toke'})
        
    }

}
module.exports=authMiddleware