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
}