class DateHelper{


    constructor(){
        throw new Error('Esta classe não pode ser instanciada!');
    }
    //Métodos static podem ser acessados dentro de outras classes sem 
    //precisar instaciar a classe
    static textoParaData(data){
        return new Date(data.split('-'));
    }

    static dataParaTexto(data){
        let day = data.getDate();
        let month = data.getMonth();
        if(data.getDate()<10){
            day = ('0'+data.getDate());
        }
        if((data.getMonth()+1)<10){
            month = ('0'+(data.getMonth()+1));
        }
        return day + '/' + month + '/' + data.getFullYear();
    }

}