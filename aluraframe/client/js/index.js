//Retorna todos os campos do formulário em uma lista
var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];
//Retorna a table
var tbody = document.querySelector('table tbody');

//Criando evento para o submit do formulário
document.querySelector('.form').addEventListener('submit', function(event){
    
    //Esse comando impede que o 'submit' atualize a página
    event.preventDefault();
    var tr = document.createElement('tr');

    campos.forEach(function(campo){
        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
    });

    var tdVolume = document.createElement('td');
    tdVolume.textContent = campos[1].value * campos[2].value;

    tr.appendChild(tdVolume);
    tbody.appendChild(tr);

})