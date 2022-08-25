let usuario;
function cadastro(){
    let carreg = document.querySelector('.carregando');
    let logini = document.querySelector('.login_ini');
    carreg.classList.toggle('esconder');
    logini.classList.toggle('esconder');
    envio_nome();
}
function envio_nome(){
    let name = document.querySelector('.login_ini input').value;
    usuario=name;
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',{
        name: name
    })
    promise.then(acesso);
    promise.catch(error);
}
function error(erro){
    let carreg = document.querySelector('.carregando');
    let logini = document.querySelector('.login_ini');
    carreg.classList.toggle('esconder');
    logini.classList.toggle('esconder');
    let name = document.querySelector('.login_ini input').value='';
    alert('Nome invalido');
}
function status(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status',{
        name: usuario
    });
}
function acesso(login){
    setInterval(status, 5000);
    let inicio = document.querySelector('.inicio');
    inicio.classList.toggle('esconder');
}
