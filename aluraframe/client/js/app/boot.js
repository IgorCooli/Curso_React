import {NegociacaoController} from './controllers/NegociacaoController';

let negociacaoController = new NegociacaoController();

document.querySelector('.from').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
document.querySelector('.btn-primary').onclick = negociacaoController.importaNegociacoes.bind(negociacaoController);