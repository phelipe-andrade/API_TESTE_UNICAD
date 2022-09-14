"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _UserModel = require('../database/models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ errors: ['Login required'], login: false });

  const [, token] = authorization.split(' ');
  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = new (0, _UserModel2.default)({ id, email });
    await user.validateToken();

    if (!user) return res.status(401).json({ errors: ['Usuário inválido.'], login: false });

    req.userInfo = user.user;
    return next();
  } catch (error) {
    return res.status(401).json({ errors: ['Token expirado ou inválido.'], login: false });
  }
};
