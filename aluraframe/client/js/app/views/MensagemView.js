class MensagemView extends View{
    constructor(element){
        super(element);
    }

    _template(model){
        return `<p class="alert alert-success">${model.texto}</p>`
    }


    update(model){
        this._element.innerHTML = this._template(model);
        setTimeout(()=>{
            this._element.innerHTML = '';
        }, 4000);
    }
}