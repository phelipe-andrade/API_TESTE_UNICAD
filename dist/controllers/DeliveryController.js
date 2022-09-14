"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _DeliveryModel = require('../database/models/DeliveryModel'); var _DeliveryModel2 = _interopRequireDefault(_DeliveryModel);

class Delivery {
  async index(req, res) {
    const { id } = req.userInfo;
    if (!id && typeof id !== 'string') return res.status(404).json({ errors: 'Numero do ID inválido.' });
    try {
      const list = await _DeliveryModel2.default.find({ id_user: id });
      if (!list) return res.status(400).json({ errors: 'Usuario não possui entregas cadastradas.' });
      const result = [];
      // eslint-disable-next-line
      list.map((item) => result.push({ id: item._id, delivery: item.delivery }));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(200).json({ errors: 'Erro ao pegar entregas.' });
    }
  }

  async register(req, res) {
    const { id } = req.userInfo;
    if (!id && typeof id !== 'string') return res.status(404).json({ errors: 'Numero do ID inválido.' });

    try {
      await _DeliveryModel2.default.create({ id_user: id, delivery: req.body });
      return res.status(200).json({ message: 'Entrega salva com sucesso.' });
    } catch (error) {
      return res.status(400).json({ errors: 'Erro ao salvar entrega.' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id && typeof id !== 'string') return res.status(404).json({ errors: 'Numero do ID inválido.' });
    try {
      await _DeliveryModel2.default.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Entrega deletada com sucesso.' });
    } catch (error) {
      return res.status(200).json({ errors: 'Erro ao deletar entrega.' });
    }
  }

  async edit(req, res) {
    const { id } = req.params;
    if (!id && typeof id !== 'string') return res.status(404).json({ errors: 'Numero do ID inválido.' });
    try {
      await _DeliveryModel2.default.findByIdAndUpdate(id, { delivery: req.body });
      return res.status(200).json({ message: 'Entrega atualizada com sucesso.' });
    } catch (error) {
      return res.status(400).json({ errors: 'Erro ao atualizar a entrega.' });
    }
  }
}

exports. default = new Delivery();
