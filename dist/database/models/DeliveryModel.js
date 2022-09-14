"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

const DeliverySchema = new _mongoose2.default.Schema({
  id_user: { type: String, required: true },
  delivery: {
    client_name: { type: String, required: true },
    delivery_date: { type: String, required: true },
    point_start: { type: String, required: true },
    point_end: { type: String, required: true },
  },

});

const DeliveryModel = _mongoose2.default.model('DELIVERY', DeliverySchema);

exports. default = DeliveryModel;
