const express = require("express");
const cors= require('cors')
const app = express();

app.use(cors());
app.use(express.json());

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});
app.post('/',async(req,res)=>{
    res.send(`<h1>Hello World</h1>`)
    console.log(req.body)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,
    console.log(`Server started on port ${PORT}`)
);
