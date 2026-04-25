const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../middleware/authMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

router.get('/me', verifyToken, async (req, res) => {
  console.log('hello')
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log('hello')
    console.log(req.user)

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
