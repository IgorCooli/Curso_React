class NegociacaoService{
    constructor(lista, msg){
        this.msg = msg;
        this.lista = lista;
        this._mensagemView = new MensagemView(document.querySelector('#mensagemView'));
    }

    obterNegociacoesDaSemana(){
        let listaExistente = [];
        let listaNova = [];

        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/semana');
            
            xhr.onreadystatechange = ()=>{

                /**
                 * 0: requisição ainda não iniciada
                 * 1: conexão com o servidor estabelecida
                 * 2: requeisição recebida
                 * 3: processando requisição
                 * 4: requisição concluída e a resposta está pronta
                 */
                
                if(xhr.readyState == 4){
                    //Ainda não podemos confiar no resultado dessa requisição, pois o servidor pode me devolver uma mensagem de erro que seja aceita
                    //mais uma condição para saber se a resposta é "BOA":
                    if(xhr.status == 200){
                        /**
                         * 
                         * console.log("Obtendo as negociações do servidor.");
                            this._salvaBanco(JSON.parse(xhr.responseText));
                            listaExistente = this._geraString()
                            resolve(JSON.parse(xhr.responseText).forEach((item) => {
                            let n = new Negociacao(item.data, item.quantidade, item.valor);
                            this.lista.adiciona(n);
                            }));
                         * 
                         */
                        console.log("Obtendo as negociações do servidor.");
                        this.lista.negociacoes.forEach(e=>{
                            listaExistente.push(this._geraString(e));
                        })
                        JSON.parse(xhr.responseText).forEach(e=>{
                            if(listaExistente.indexOf(this._geraString(e)) == -1){
                                listaNova.push(e);
                            }
                            else{
                                console.log("Negociação existente!!!")
                            }
                        })
                        resolve(listaNova.forEach((item) => {
                            let n = new Negociacao(item.data, item.quantidade, item.valor);
                            this.lista.adiciona(n);
                        }));
                        this._salvaBanco(listaNova);
                    }
                    else{
                        reject(this.msg.texto = "Não foi possível obter as negociações da semana!");
                        this._mensagemView.update(this.msg);
                    }
                }
            };
        
        xhr.send();
        });
    }
    obterNegociacoesDaAnterior(){
        let listaExistente = [];
        let listaNova = [];

        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/anterior');
            
            xhr.onreadystatechange = ()=>{

                /**
                 * 0: requisição ainda não iniciada
                 * 1: conexão com o servidor estabelecida
                 * 2: requeisição recebida
                 * 3: processando requisição
                 * 4: requisição concluída e a resposta está pronta
                 */
                
                if(xhr.readyState == 4){
                    //Ainda não podemos confiar no resultado dessa requisição, pois o servidor pode me devolver uma mensagem de erro que seja aceita
                    //mais uma condição para saber se a resposta é "BOA":
                    if(xhr.status == 200){
                        console.log("Obtendo as negociações do servidor.");
                        this.lista.negociacoes.forEach(e=>{
                            listaExistente.push(this._geraString(e));
                        })
                        JSON.parse(xhr.responseText).forEach(e=>{
                            if(listaExistente.indexOf(this._geraString(e)) == -1){
                                listaNova.push(e);
                            }
                            else{
                                console.log("Negociação existente!!!")
                            }
                        })
                        resolve(listaNova.forEach((item) => {
                            let n = new Negociacao(item.data, item.quantidade, item.valor);
                            this.lista.adiciona(n);
                        }));
                        this._salvaBanco(listaNova);
                    }
                    else{
                        reject(this.msg.texto = "Não foi possível obter as negociações da semana anterior!");
                        this._mensagemView.update(this.msg);
                    }
                }
            };
            
            xhr.send();
        });
    }

    obterNegociacoesDaRetrasada(){
        let listaExistente = [];
        let listaNova = [];
        
        return new Promise((resolve, reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'negociacoes/retrasada');
            
            xhr.onreadystatechange = ()=>{

                /**
                 * 0: requisição ainda não iniciada
                 * 1: conexão com o servidor estabelecida
                 * 2: requeisição recebida
                 * 3: processando requisição
                 * 4: requisição concluída e a resposta está pronta
                 */
                
                if(xhr.readyState == 4){
                    //Ainda não podemos confiar no resultado dessa requisição, pois o servidor pode me devolver uma mensagem de erro que seja aceita
                    //mais uma condição para saber se a resposta é "BOA":
                    if(xhr.status == 200){
                        console.log("Obtendo as negociações do servidor.");
                        this.lista.negociacoes.forEach(e=>{
                            listaExistente.push(this._geraString(e));
                        })
                        JSON.parse(xhr.responseText).forEach(e=>{
                            if(listaExistente.indexOf(this._geraString(e)) == -1){
                                listaNova.push(e);
                            }
                            else{
                                console.log("Negociação existente!!!")
                            }
                        })
                        resolve(listaNova.forEach((item) => {
                            let n = new Negociacao(item.data, item.quantidade, item.valor);
                            this.lista.adiciona(n);
                        }));
                        this._salvaBanco(listaNova);
                    }
                    else{
                        reject(this.msg.texto = "Não foi possível obter as negociações da semana retrasada!");
                        this._mensagemView.update(this.msg);
                    }
                }
            };
            
            xhr.send();
        });
    }

    _salvaBanco(json){
        ConnectionFactory.getConnection()
            .then(connection=>{
                json.forEach(e=>{
                    new NegociacaoDao(connection).adiciona(e);
                })
            })
    }

    _geraString(obj){
        let data = new Date(obj.data);
        return (data.getDate() + '/0' + (data.getMonth()+1) + '/' + data.getFullYear() + ', ' + obj.quantidade + ', ' + obj.valor);
    }
}