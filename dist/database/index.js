"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

_mongoose2.default.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true });

var _UserModel = require('./models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

/* eslint-disable */
class DB {


}

exports. default = DB;
