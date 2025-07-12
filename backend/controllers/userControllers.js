const { PrismaClient } = require('@prisma/client')
const bcrypt=require('bcrypt')

const prisma = new PrismaClient();

module.exports={
    CheckUser:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            const email=userData.email
            const password=userData.password

            console.log(userData)
            try{
                const user=await prisma.user.findUnique({
                    where:{email}
                })
                console.log(user)
                if(!user){
                    reject()
                }
                const isMatch=await  bcrypt.compare(password,user.password)
                if(!isMatch){
                    reject()
                }
                console.log(user)
                resolve(user)
            }catch(err){
                console.log(err)
            }
            
        })
    }
}