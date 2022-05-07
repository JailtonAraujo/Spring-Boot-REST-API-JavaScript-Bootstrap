function salvar(){
    const idComp = document.querySelector('#id');
    const nomeComp = document.querySelector('#nome');
    const idadeComp = document.querySelector('#idade');
    const emailComp = document.querySelector('#email');

    let usuario={
        id:idComp.value, nome:nomeComp.value, idade:idadeComp.value, email:emailComp.value
    }

    const options = {
        method:'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        mode:'cors',
        cache:'default',
        body:JSON.stringify(usuario)
    }

    fetch('salvarUsuario', options)
    .then(response => response.json())
    .then(function(json){
      idComp.value = json.id;
      nomeComp.value = json.nome;
      idadeComp.value = json.idade;
      emailComp.value = json.email;
    })
    .catch(err => alert(err))

}

function buscar (){

  const inputBusca = document.querySelector('#nomeModal');

  const options = {
        method:'GET',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        mode:'cors',
        cache:'default',
  }

  fetch(`buscarPorNome?name=${inputBusca.value}`, options)
  .then(response => response.json())
  .then(function(json){
   
    let tbody = document.querySelector('#tableBody');
	tbody.textContent = '';

    for(let i=0;i<json.length;i++){

      let tr = tbody.insertRow();

      let td_id = tr.insertCell();
      let td_nome = tr.insertCell();
      let td_editar = tr.insertCell();
      let td_excluir = tr.insertCell();

      let btnEditar = document.createElement('button');
      btnEditar.textContent = 'EDITAR';
      btnEditar.classList.add('btn');
      btnEditar.classList.add('btn-info')
      btnEditar.type = 'button';
      btnEditar.setAttribute("onclick", "editar(\""+json.id+"\");");

      let btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'EXCLUIR';
      btnExcluir.classList.add('btn');
      btnExcluir.classList.add('btn-danger');
      btnExcluir.type = 'button';

      td_id.textContent = json[i].id;
      td_nome.textContent = json[i].nome;
      td_editar.appendChild(btnEditar);
      td_excluir.appendChild(btnExcluir);
    }

    document.querySelector('#tableBody').textContent = `Resultados: ${json.length}`;

  })
}

function editar (id){
  alert (id);
}