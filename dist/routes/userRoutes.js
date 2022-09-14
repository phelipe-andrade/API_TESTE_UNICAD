"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

const router = new (0, _express.Router)();

router.post('/', _UserController2.default.login);
router.post('/token', _UserController2.default.token);
router.post('/register', _UserController2.default.register);

exports. default = router;
