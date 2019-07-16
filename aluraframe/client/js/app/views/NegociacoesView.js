class NegociacoesView extends View{
    constructor(element){
        super(element);
    }
//a função map retorna uma lista de strings modificada à partir da anterior
//por isso usamos o "join()" para que concatene os valores da array sem
//espaço entre elas
    _template(model){
        return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            
            <tbody>
                ${model.negociacoes.map((a)=>{
                    return `
                        <tr>
                            <td>${DateHelper.dataParaTexto(a.data)}</td>
                            <td>${a.quantidade}</td>
                            <td>${a.valor}</td>
                            <td>${a.volume}</td>
                        </tr>
                    `
                }).join('')}
            </tbody>
            
            <tfoot>
                <tr>
                    <th colspan="3">VOLUME TOTAL</th>
                    <td>${model.volumeTotal()}</td>
                </tr>
            </tfoot>
        </table>
        `;
    }
}