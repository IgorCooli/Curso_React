class NegociacaoController{

    constructor(){
        //Como não estamos utilizando jQuery, o comando abaixo serve
        //para simular o '$' do jQuery, que é a mesma coisa que 
        //documento.querySelector!
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        let self = this;
        this._listaNegociacoes = ProxyFactory.createProxy(new ListaNegociacoes(), ['adiciona', 'esvazia', 'negociacoes'], (model)=>{
            this._negociacoesView.update(model);
        })

        //this._listaNegociacoes = new ListaNegociacoes();
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));

        this._mensagem = ProxyFactory.createProxy(new Mensagem(), ['texto'], (model)=>{
            this._mensagemView.update(model);
        })
        //this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));


        ConnectionFactory.getConnection()
            .then(connection=>{
                new NegociacaoDao(connection)
                    .listaTodos()
                        .then(negociacoes=>{
                            negociacoes.forEach(negociacao => {
                                this._listaNegociacoes.adiciona(negociacao);
                            });
                        })
            })
            .catch(erro=>this._mensagem = 'Não foi possível obter as negociações. Erro: ' + erro.name)
    }

    adiciona(event){
        event.preventDefault();
        ConnectionFactory
            .getConnection()
            .then(connection=>{
                let negociacao = this._criaNegociacao();
                new NegociacaoDao(connection)
                .adiciona(negociacao)
                .then(()=>{
                    //this._listaNegociacoes.negociacoes.push(this._criaNegociacao());     Não se pode usar usada pois o método está blindado na classe ListaNegociacoes
                    this._listaNegociacoes.adiciona(this._criaNegociacao());
                    this._mensagem.texto = "Negociação adicionada com sucesso!";
                    this._limpaFormulario();
                    console.log(this._listaNegociacoes.negociacoes);
                    this._negociacoesView.update(this._listaNegociacoes);
                    this._mensagemView.update(this._mensagem);
                })
            })
            .catch(erro => {
                this._mensagem.texto = erro;
                this._mensagemView.update(this._mensagem);
            })
    }

    //Importando dados do serviço!!!
    importaNegociacoes(){
        let service = new NegociacaoService(this._listaNegociacoes, this._mensagem);
        
        service
            .obterNegociacoesDaSemana()
            .then(service.obterNegociacoesDaAnterior())
            .then(service.obterNegociacoesDaRetrasada());
    }

    apaga(){
        ConnectionFactory.getConnection()
            .then(connection=> new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
        if(!ListaNegociacoes){
            throw new Error('Nenhuma negociação à ser apagada!')
        }
        this._listaNegociacoes.esvazia();
        this._negociacoesView.update(this._listaNegociacoes);
        this._mensagem.texto = "Negociações apagadas com sucesso!";
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao(){
        return new Negociacao(DateHelper.textoParaData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
    }

    _limpaFormulario(){
        this._inputData.value = "";
        this._inputQuantidade.value = 0;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }


}