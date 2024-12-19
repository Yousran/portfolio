import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { username, password } = req.body;
  const jwtsecret = process.env.JWT_SECRET || 'your_jwt_secret';

  //TODO: Remove this console.log
  console.log('LOGIN USING JWT SECRET: ', jwtsecret);

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, jwtsecret, { expiresIn: '1h' });

  res.status(200).json({ token });
}