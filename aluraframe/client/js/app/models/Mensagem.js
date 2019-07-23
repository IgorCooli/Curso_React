export class Mensagem{
    //ES6 permite que voce passe um parâmetro já com um valor, ou seja,
    //Caso eu não passe uma string para o construtor, ele inicializa como 'vazio'
    constructor(texto = ''){
        this._texto = texto;
    }

    get texto(){
        return this._texto;
    }

    set texto(texto){
        this._texto = texto;
    }
}