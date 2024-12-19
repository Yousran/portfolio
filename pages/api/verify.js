import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { token } = req.body;
  const jwtsecret = process.env.JWT_SECRET || 'your_jwt_secret';
  //TODO: Remove this console.log
  console.log('VERIFY USING JWT SECRET: ', jwtsecret);

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  try {
    const decoded = jwt.verify(token, jwtsecret);
    res.status(200).json({ valid: true, decoded });
  } catch (error) {
    console.error(error);
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
}