"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

const UserSchema = new _mongoose2.default.Schema({
  name_user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = _mongoose2.default.model('USERS', UserSchema);

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validate();
    if (this.errors.length > 0) return;
    this.user = await UserModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push('Usuário ou senha inválidos.');
      return;
    }

    if (!_bcryptjs2.default.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Usuário ou senha inválidos.');
      this.user = null;
    }
  }

  async validateToken() {
    this.user = await UserModel.findOne({ email: this.body.email });
    if (!this.user) this.errors.push('Token inválido.');
  }

  async register() {
    this.validate();
    if (this.body.name_user.length <= 0) this.errors.push('Insira um nome válido!');

    if (this.errors.length > 0) return;

    await this.userExists();

    if (this.errors.length > 0) return;

    const salt = _bcryptjs2.default.genSaltSync();
    this.body.password = _bcryptjs2.default.hashSync(this.body.password, salt);

    this.user = await UserModel.create(this.body);
  }

  async userExists() {
    this.user = await UserModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já existe!');
  }

  validate() {
    this.cleanUp();

    if (!_validator2.default.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
    if (this.body.password.length < 8 || this.body.password.length > 20) this.errors.push('A senha precisa ter entre 8 e 20 caracteres.');
  }

  /* eslint-disable */
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
    this.body = {
      name_user: this.body.name_user,
      email: this.body.email,
      password: this.body.password,
    }
  }
}

exports. default = User;
