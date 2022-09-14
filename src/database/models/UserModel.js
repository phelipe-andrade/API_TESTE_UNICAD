import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name_user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('USERS', UserSchema);

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

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
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

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await UserModel.create(this.body);
  }

  async userExists() {
    this.user = await UserModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já existe!');
  }

  validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
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

export default User;
