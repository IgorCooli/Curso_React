class NegociacaoDao{
    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao){
        return new Promise((resolve,reject)=>{
            //primeiro criamos uma transação para um object store(objeto, tipo de acesso)
            let transaction = this._connection.transaction([this._store], 'readwrite');
            //atraves da transação criada, obtemos o acesso a operações de persistência
            let store = transaction.objectStore(this._store);
            let request = store.add(negociacao);

            request.onsuccess = e =>{
                resolve();
            }
            request.onerror = e =>{
                console.log(e.target.error);
                reject('Não foi possível salvar a negociação!');
            }
        })
    }

    listaTodos(){
        return new Promise((resolve, reject)=>{
            let transaction = connection.transaction([this._store], 'readwrite');
            let store = transaction.objectStore(this._store);
            let negociacoes = [];
            let cursor = store.openCursor();
            cursor.onsuccess = e =>{
                let atual = e.target.result;
                if(atual){
                    let dado = atual.value;
                    negociacoes.push(new Negociacao(dado.data, dado.quantidade, dado.valor));
                    atual.continue();
                }
                else{
                    resolve(negociacoes);
                }
            }
            cursor.onerror = e =>{
                reject(e.targe.error.name);
                console.log(e.targe.error.name);
            }
        })
    }

    apagaTodos(){
        return new Promise((resolve, reject)=>{
            let transaction = connection.transaction([this._store], 'readwrite');
            let store = transaction.objectStore(this._store);
            let request = store.clear();
            request.onsuccess = e=> resolve('Negociações excluídas com sucesso!');
            request.onerror = e=> reject('Não foi possível excluir as negociações!');
        })
    }
}