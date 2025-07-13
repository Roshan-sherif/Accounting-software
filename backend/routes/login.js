const express = require('express');
const { CheckUser } = require('../controllers/userControllers');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body)
CheckUser(req.body)
  .then((user) => {
    const result = {
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.json({ status: true, user: result });
  })
  .catch((err) => {
    console.error(err);
    res.json({ status: false, error:  err });
  });
})
module.exports = router