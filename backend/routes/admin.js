const express =require('express');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-company', verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    await adminControllers.CreateCompany(req.body);
    res.json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});
module.exports=router