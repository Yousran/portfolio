import jwt from 'jsonwebtoken';
import User from '../../models/user.js';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const jwtsecret = process.env.JWT_SECRET || 'your_jwt_secret';

  //TODO: Remove this console.log
  console.log('AUTH MIDDLEWARE USING JWT SECRET: ', jwtsecret);

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  console.log('Token : ',token);
  jwt.verify(token, jwtsecret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    if (decoded.id) {
      User.findByPk(decoded.id, (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;
      });
    }
    next();
  });
};

export default authMiddleware;