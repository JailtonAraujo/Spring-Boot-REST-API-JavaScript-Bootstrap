const idComp = document.querySelector('#id');
const nomeComp = document.querySelector('#nome');
const idadeComp = document.querySelector('#idade');
const emailComp = document.querySelector('#email');

  function salvar(){

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
  alert("Salvo com Sucesso!")
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
.then(response => {response.json()
  .then(function(json){

    let tbody = document.querySelector('#tableBody');
    tbody.textContent = '';
   
    for(var i=0;i<json.length;i++){
      
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
      btnEditar.setAttribute("onclick", "editar(\""+json[i].id+"\");");

      let btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'EXCLUIR';
      btnExcluir.classList.add('btn');
      btnExcluir.classList.add('btn-danger');
      btnExcluir.type = 'button';
      btnExcluir.setAttribute("onclick", "excluir(\""+json[i].id+"\");");

      td_id.textContent = json[i].id;
      td_nome.textContent = json[i].nome;
      td_editar.appendChild(btnEditar);
      td_excluir.appendChild(btnExcluir);
    
    }
	
    document.querySelector('#cont').textContent = `Resultados: ${json.length}`;
  })
})

}

function editar (id){

const options = {
    method:'GET',
    headers: {"Content-type": "application/json; charset=UTF-8"},
    mode:'cors',
    cache:'default',
}

fetch(`burscarPorId?userId=${id}`,options)
.then(response => response.json())
.then(function(json){

idComp.value = json.id;
nomeComp.value = json.nome;
idadeComp.value = json.idade;
emailComp.value = json.email;

document.querySelector('#btnCloseModal').click();

}).catch(err => alert(err));

}

function excluir(id){

  if(confirm("Tem certeza que deseja excluir o registro selecionado?")){

  let options = {
    method:'DELETE',
    headers: {"Content-type": "application/json; charset=UTF-8"},
    mode:'cors',
    cache:'default',
  }

  fetch(`deletar?userId=${id}`,options)
  .then(e =>{
    alert("Excluido com sucesso!");
    buscar();
  } ) 
}
}