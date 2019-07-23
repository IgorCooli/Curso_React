export class ListaNegociacoes{
    constructor(){
        this._negociacoes = [];
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
        //this._negociacoes = [].concat(this._negociacoes, negociacao);
        this._negociacoes.sort((a, b)=>{
            return b.data - a.data;
        })
    }

    get negociacoes(){
        /*Dessa forma, não é possível adicionar negociações com o .push, 
        pois este método retorna uma cópia da lista de negociações que está salva*/
        return [].concat(this._negociacoes);
    }

    volumeTotal(){
        let total = 0;
        this._negociacoes.forEach(element => {
            total += element.volume;
        })
        return total;
    }

    esvazia(){
        this._negociacoes = [];
    }

}