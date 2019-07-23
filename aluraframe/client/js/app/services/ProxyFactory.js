

export class ProxyFactory{
    //props é uma array de propriedades que eu quero manipular
    //acao -> ex: self._negociacoesView.update(target);
    static createProxy(objeto, props, acao){
        return new Proxy(objeto, {
            get(target, prop, receiver){
                if(props.includes(prop) && ProxyFactory._isFunction(target[prop])){
                    return function(){
                        console.log(`Interceptando o método ${prop}`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){
                if(props.includes(prop)){
                    acao(target);
                }
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _isFunction(func){
        return typeof(func) == typeof(Function);
    }
}