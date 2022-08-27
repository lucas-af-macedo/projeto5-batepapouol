let usuario;
let destin = 'Todos';
let tipomsg = 'message';
let tipo_mensagem = '';
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
    let lista_users = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    lista_users.then(colocar_user)
    setInterval(get_user, 10000);
}
function get_user(){
    let lista_users = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    lista_users.then(colocar_user);
}

function abrir_lateral(){
    retirar_lateral();
    setTimeout(animacao,200);
}
function fechar(){
    animacao();
    setTimeout(retirar_lateral,200);
}
function retirar_lateral(){
    let menulat = document.querySelector('.menu_lateral1');
    menulat.classList.toggle('esconder');
}
function animacao(){
    let menu = document.querySelector('.menu');
    let fora = document.querySelector('.fora1');
    if (menu == null){
        menu =document.querySelector('.tamanho0');
        fora =document.querySelector('.fora0');
    }
    menu.classList.toggle('menu');
    menu.classList.toggle('tamanho0');
    fora.classList.toggle('fora1');
    fora.classList.toggle('fora0');

}
/*<ion-icon name="person-circle"></ion-icon>*/
function colocar_user(lista_users){
    let info = document.querySelector('.info');
    let lista = document.querySelector('.logados');
    let user;
    let a;
    lista.innerHTML='';
    let controle = 0;
    let cont;
    for (let i=0;i<lista_users.data.length;i++){
        cont=lista_users.data[i].name;
        if (cont !== usuario){
            if (lista_users.data[i].name !== destin){
            lista.innerHTML=lista.innerHTML + `<div data-identifier="participant" onclick="selecionar_usuario(this, '${cont}')" class="caixa_user">
                <div class="usuario ul_${lista_users.data[i].name}">
                        <ion-icon name="person-circle"></ion-icon>
                        <h2>${lista_users.data[i].name}</h2>
                    </div>
                    <ion-icon class="check esconder" name="checkmark-outline"></ion-icon>
                </div>`
            }
            else{
                lista.innerHTML=lista.innerHTML + `<div data-identifier="participant" onclick="selecionar_usuario(this, '${cont}')" class="caixa_user">
                <div class="usuario ul_${lista_users.data[i].name}">
                        <ion-icon name="person-circle"></ion-icon>
                        <h2>${lista_users.data[i].name}</h2>
                    </div>
                    <ion-icon class="check mostrar" name="checkmark-outline"></ion-icon>
                </div>`
                controle = 1;
            }
        }
    }
    if (controle === 0){
        let todos = document.querySelector('.td .check');
        todos.classList.add('mostrar');
        todos.classList.remove('esconder');
        destin = 'Todos';
        if (destin.length>15){
            info.innerHTML = `Enviando para ${destin.substring(0,10)}... ${tipo_mensagem}`;
        }
        else{
            info.innerHTML = `Enviando para ${destin} ${tipo_mensagem}`;
        }
    }

}
function selecionar_usuario(objeto, conta){
    let a = document.querySelector('.users .mostrar');
    let info = document.querySelector('.info');
    if(a != null){
        a.classList.add('esconder');
        a.classList.remove('mostrar');
    }
    let check = objeto.querySelector('.check');
    check.classList.add('mostrar');
    check.classList.remove('esconder');
    destin=conta;
    if (destin.length>15){
        info.innerHTML = `Enviando para ${destin.substring(0,10)}... ${tipo_mensagem}`;
    }
    else{
        info.innerHTML = `Enviando para ${destin} ${tipo_mensagem}`;
    }
}
function selecionar_visibi(objeto, tipo){
    let a = document.querySelector('.visibilidade .mostrar');
    let info = document.querySelector('.info');
    if(a != null){
        a.classList.add('esconder');
        a.classList.remove('mostrar');
    }
    let check = objeto.querySelector('.check');
    check.classList.add('mostrar');
    check.classList.remove('esconder');
    if (tipo===0){
        tipomsg = 'message';
        tipo_mensagem = '';
    }
    else{
        tipomsg = 'private_message';
        tipo_mensagem = '(reservadamente)';
    }
    if (destin.length>13){
        info.innerHTML = `Enviando para ${destin.substring(0,10)}... ${tipo_mensagem}`;
    }
    else{
        info.innerHTML = `Enviando para ${destin} ${tipo_mensagem}`;
    }
}