const express = require('express');
const { CheckUser } = require('../controllers/userControllers');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', (req, res) => {
    console.log(req.body)
    CheckUser(req.body)
        .then((user) => {
            const result = {
                name: user.name,
                email: user.email,
                role: user.role
            };
            const accessToken = jwt.sign(
                { id: user.id, name: user.name, role: user.role },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );


            const refreshToken = jwt.sign(
                { id: user.id, name: user.name, role: user.role },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "7d" }
            );

            res.cookie("token", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false, 
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            console.log(accessToken)
            res.status(200).json({ status: true, user: result, accessToken });
        })
        .catch((err) => {
            console.error(err);
            res.status(401).json({ status: false, error: err });
        });
})
module.exports = router