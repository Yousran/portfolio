import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    res.status(200).json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
}