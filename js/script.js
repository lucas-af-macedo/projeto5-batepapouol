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
    let response = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',{
        name: usuario
    });
}
function reset(response){
    window.location.reload();
}
function acesso(login){
    setInterval(status, 5000);
    let inicio = document.querySelector('.inicio');
    inicio.classList.toggle('esconder');
    let lista_users = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    lista_users.then(colocar_user)
    let lista_msg = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    lista_msg.then(colocar_msg);
    setInterval(get_user, 10000);
    setInterval(get_msg, 3000);

}

function get_msg(){
    let lista_msg = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    lista_msg.then(colocar_msg);
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
    let cont2;
    let cont;
    for (let i=0;i<lista_users.data.length;i++){
        cont=`${lista_users.data[i].name}`;
        cont2=cont;
        if (cont.length>15){
            cont2=cont.substring(0,15)+'...'
        }
        if (cont !== usuario){
            if (lista_users.data[i].name !== destin){
            lista.innerHTML=lista.innerHTML + `<div data-identifier="participant" onclick="selecionar_usuario(this, '${cont}')" class="caixa_user">
                <div class="usuario ul_${lista_users.data[i].name}">
                        <ion-icon name="person-circle"></ion-icon>
                        <h2>${cont2}</h2>
                    </div>
                    <ion-icon class="check esconder" name="checkmark-outline"></ion-icon>
                </div>`
            }
            else{
                lista.innerHTML=lista.innerHTML + `<div data-identifier="participant" onclick="selecionar_usuario(this, '${cont}')" class="caixa_user">
                <div class="usuario ul_${lista_users.data[i].name}">
                        <ion-icon name="person-circle"></ion-icon>
                        <h2>${cont2}</h2>
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

function colocar_msg(lista_msg){
    let local_msg = document.querySelector('.mensagens');
    let array_msg = lista_msg.data;
    local_msg.innerHTML = '';
    for (let i=0;i<array_msg.length;i++){
        if (array_msg[i].type == 'status'){
            local_msg.innerHTML =local_msg.innerHTML + `<div class="mensagem status">
                                        <p>
                                        <c>(${array_msg[i].time})</c> <b>${array_msg[i].from}</b> ${array_msg[i].text}</p>
                                    </div>`;
        }else if (array_msg[i].type == 'message') {
            local_msg.innerHTML =local_msg.innerHTML + `<div class="mensagem message">
                                        <p>
                                        <c>(${array_msg[i].time})</c> <b>${array_msg[i].from}</b> para <b> ${array_msg[i].to}</b>: ${array_msg[i].text}</p>
                                    </div>`;
        }else
            if (array_msg[i].from == usuario){
                local_msg.innerHTML =local_msg.innerHTML + `<div class="mensagem private-message">
                                        <p>
                                        <c>(${array_msg[i].time})</c> <b>${array_msg[i].from}</b> reservadamente para <b> ${array_msg[i].to}</b>: ${array_msg[i].text}</p>
                                    </div>`;
            }else if (array_msg[i].to == usuario || array_msg[i].from == 'Todos'){
                local_msg.innerHTML =local_msg.innerHTML + `<div class="mensagem private-message">
                                        <p>
                                        <c>(${array_msg[i].time})</c> <b>${array_msg[i].from}</b> reservadamente para <b> ${array_msg[i].to}</b>: ${array_msg[i].text}</p>
                                    </div>`;
            }
        
    }
}

function enviar(){
    let local_mensagem = document.querySelector('.caixa_mensagem input');
    mensagem = local_mensagem.value;
    local_mensagem.value='';
    let response = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',{
        from: usuario,
        to: destin,
        text: mensagem,
        type: tipomsg
    });
    response.catch(response);
}
let textBox = document.querySelector('.caixa_mensagem input');
textBox.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        enviar();
    }
});

let textBox2 = document.querySelector('.login_ini input');
textBox2.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        cadastro();
    }
});