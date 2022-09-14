import jwt from 'jsonwebtoken';
import User from '../database/models/UserModel';

class UserController {
  async login(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.status(401).json({ errors: ['Preencha usuário e senha'] });

    try {
      const user = new User(req.body);
      await user.login();
      if (!user) return res.status(401).json({ errors: 'Email ou senha inválido.' });

      const { id, name_user } = user.user;
      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      return res.json({ token, name: name_user, email });
    } catch (error) {
      return res.status(400).json({ errors: 'Email ou senha inválido.' });
    }
  }

  async token(req, res) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ errors: 'Login necessário.', login: false });

    const [, token] = authorization.split(' ');
    try {
      const dados = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id, email } = dados;

      const user = new User({ id, email });
      await user.validateToken();
      if (!user) return res.status(401).json({ errors: ['Usuário inválido.'], login: false });
      const { name_user } = user.user;
      return res.status(200).json({ name: name_user, email });
    } catch (error) {
      return res.status(401).json({ errors: ['Token expirado ou inválido.'], login: false });
    }
  }

  async register(req, res) {
    try {
      const user = new User(req.body);
      await user.register();

      if (user.errors.length > 0) return res.status(400).json({ errors: user.errors });

      return res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
      return res.status(404).json({ errors: 'Error ao cadastrar!' });
    }
  }
}

export default new UserController();
