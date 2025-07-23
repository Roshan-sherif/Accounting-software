const express = require('express');
const { CheckUser } = require('../controllers/userControllers');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/', (req, res) => {
    console.log(req.body)
    CheckUser(req.body)
        .then((user) => {
            const result = {
                name: user.name,
                email: user.email,
                role: user.role
            };

            const token = jwt.sign(
                { id: user.id, name: user.name, role: user.role },
                process.env.JWT_TOKEN,
                { expiresIn: "7d" }
            );
            console.log(token)

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            const decode= jwt.verify(token, process.env.JWT_TOKEN)
                console.log(decode)

            res.json({ status: true, user: result });
        })
        .catch((err) => {
            console.error(err);
            res.json({ status: false, error: err });
        });
})
module.exports = router