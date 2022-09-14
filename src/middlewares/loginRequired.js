import jwt from 'jsonwebtoken';
import User from '../database/models/UserModel';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ errors: ['Login required'], login: false });

  const [, token] = authorization.split(' ');
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = new User({ id, email });
    await user.validateToken();

    if (!user) return res.status(401).json({ errors: ['Usuário inválido.'], login: false });

    req.userInfo = user.user;
    return next();
  } catch (error) {
    return res.status(401).json({ errors: ['Token expirado ou inválido.'], login: false });
  }
};
