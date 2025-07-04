


const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(' Incoming Authorization header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No or invalid Authorization header');
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(' Token verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
