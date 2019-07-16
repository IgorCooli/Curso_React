class NegociacaoService{
    constructor(lista, msg){
        this.msg = msg;
        this.lista = lista;
    }

    obterNegociacoesDaSemana(){

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
                        console.log("Obtendo as negociações do servidor.");
                        console.log(JSON.parse(xhr.responseText));
                        resolve(JSON.parse(xhr.responseText).forEach((item) => {
                            let n = new Negociacao(item.data, item.quantidade, item.valor);
                            this.lista.adiciona(n);
                        }));
                    }
                    else{
                        reject(this.msg.texto = "Não foi possível obter as negociações do servidor!");
                    }
                }
            };
        
        xhr.send();
        });
    }
    obterNegociacoesDaAnterior(){
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
                        console.log(JSON.parse(xhr.responseText));
                        resolve(JSON.parse(xhr.responseText).forEach((item) => {
                            let n = new Negociacao(item.data, item.quantidade, item.valor);
                            this.lista.adiciona(n);
                        }));
                    }
                    else{
                        reject(this.msg.texto = "Não foi possível obter as negociações do servidor!");
                    }
                }
            };
            
            xhr.send();
        });
    }

    obterNegociacoesDaRetrasada(){
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
                        console.log(JSON.parse(xhr.responseText));
                        resolve(JSON.parse(xhr.responseText).forEach((item) => {
                            let n = new Negociacao(item.data, item.quantidade, item.valor);
                            this.lista.adiciona(n);
                        }));
                    }
                    else{
                        reject(this.msg.texto = "Não foi possível obter as negociações do servidor!");
                    }
                }
            };
            
            xhr.send();
        });
    }
}