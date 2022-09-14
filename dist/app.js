"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config();

require('./database');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);

var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _deliveryRoutes = require('./routes/deliveryRoutes'); var _deliveryRoutes2 = _interopRequireDefault(_deliveryRoutes);

const whiteList = [
  process.env.URL_APP,
];

const corsOptions = {
  origin(origin, callBack) {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callBack(null, true);
    } else {
      callBack(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
  }

  routes() {
    this.app.use('/login/', _userRoutes2.default);
    this.app.use('/delivery/', _deliveryRoutes2.default);
  }
}

exports. default = new App().app;
