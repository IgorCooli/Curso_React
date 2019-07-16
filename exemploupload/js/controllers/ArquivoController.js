class ArquivoController {

    constructor() {
        this._inputDados = document.querySelector('.dados-arquivo');
    }

    envia() {
        let a = this._criaArquivo();
        this._limpaFormulario();
        console.log(`Nome: ${a.nome} / Tamanho: ${a.tamanho} / Tipo: ${a.tipo}`);
    }

    _limpaFormulario() {
        this._inputDados.value = '';
        this._inputDados.focus();
    }

    _criaArquivo(){
        let separado = this._separaDados();
        return new Arquivo(separado[0].toUpperCase(), separado[1].toUpperCase(), separado[2].toUpperCase());
    }

    _separaDados(){
        return this._inputDados.value.split('/');
    }
    
    
}