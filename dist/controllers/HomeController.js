"use strict";Object.defineProperty(exports, "__esModule", {value: true});// import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    res.json('Index');
  }
}

exports. default = new HomeController();
