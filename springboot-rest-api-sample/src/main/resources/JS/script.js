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
    .then(json => alert(json))
    .catch(err => alert(err))

}