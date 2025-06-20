const { Client } = require('pg');
const connect =()=>{

    const client = new Client({
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD ,
});

client.connect().then(()=>{
    console.log('db connected')
})

}
module.exports=connect