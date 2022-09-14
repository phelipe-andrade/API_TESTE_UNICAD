"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _UserModel = require('../database/models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class UserController {
  async login(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.status(401).json({ errors: ['Preencha usuário e senha'] });

    try {
      const user = new (0, _UserModel2.default)(req.body);
      await user.login();
      if (!user) return res.status(401).json({ errors: 'Email ou senha inválido.' });

      const { id, name_user } = user.user;
      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
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
      const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
      const { id, email } = dados;

      const user = new (0, _UserModel2.default)({ id, email });
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
      const user = new (0, _UserModel2.default)(req.body);
      await user.register();

      if (user.errors.length > 0) return res.status(400).json({ errors: user.errors });

      return res.status(200).json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (error) {
      return res.status(404).json({ errors: 'Error ao cadastrar!' });
    }
  }
}

exports. default = new UserController();
