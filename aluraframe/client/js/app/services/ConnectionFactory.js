var stores = ['negociacoes'];
var version = 1;
var dbName = 'aluraframe';
var connection = null;

class ConnectionFactory{
    constructor(){
        throw new Error('Não é possível criar instâncias de ConnectionFactory!');
    }
    
    static getConnection(){
        return new Promise((resolve, reject)=>{
            let openRequest = window.indexedDB.open(dbName, version);
            openRequest.onupgradeneeded = e =>{
                ConnectionFactory._createStores(e.target.result);
            };
            openRequest.onsuccess = e =>{
                //verificando se já existe uma connection. Caso exista, ele utiliza ela mesma, e não cria uma nova.
                if(!connection) {
                    connection = e.target.result;
                }
                resolve(connection);
            };
            openRequest.onerror = e =>{
                console.log(e.target.error);
                reject(e.target.error);
            };
        });
    }
    static _createStores(connection){
        stores.forEach(store=>{
            if(connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
            connection.createObjectStore(store, { autoIncrement : true })
        })
    }
    static closeConnection(){
        if(connection){
            connection.close();
        }
    }
}