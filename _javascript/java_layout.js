//-------------------------Estrutura do código JavaScript---------------------//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//API:
//1) Google Maps JavaScript API v3;
//2) Notification;
//3) Geolocations;
///////////////////////////////////////////////////////////////////////////////
//Funções:
//1)slideit() - Para o slide show da publicidade;
//2)muda_imagem(num_var_image) - para mudar imagens a cada clique de menu;
//3)carregar_mapa(latitude, longitude, texto, raio) - Função para carregar o
//  mapa, recebe 4 variáveis;
//4)mapa_carrega_tudo - função que carrega a função 2 com os valores 
//  referentes à loja;
//5)localizacao_cliente() - função que carrega a função 2 com o valores do
//  cliente, calcula também a localização do cliente - api geolocation;
//6)notifyMe(estilo_notificacao) - função que chama a api notification, tem como
//  variável o texto de notificação que quisermos! Este texto é passado no momento
//  que chamamos a função.
///////////////////////////////////////////////////////////////////////////////
//Objectos:
//Main- calc_preco_transp - Objecto para calcular o preço de transporte para o cliente;
//Propriedades do objecto:
//1)calc_preco_transp.distancia_maxima - propridade do objecto que recebe o valor
//  variável global distancia_maxima;
//2)calc_preco_transp.dist_cliente_loja - propriedade do objecto que recebe o valor
//  da função "function distancia()" - serve para calcular a distancia entre coordenadas
//  da loja (variaveis globais) e coordenadas do cliente, também variaveis globais que recebem
//  os valores da função 5)localizacao_cliente();
//3)calc_preco_transp.calcular_preco - serve para calcular o preço do transporte
//  através da função "function preco()" onde também ela informa o clinte através 
//  de quadros de verificação;
//Ordem de chamada dos objectos:
//  calc_preco_transp.calcular_preco(); (1)
//  calc_preco_transp.dist_cliente_loja(); (2)
///////////////////////////////////////////////////////////////////////////////
//Elemento document.ready - Jquery
//     $(".class do botão").click(function(){
//     $("class da div").load("página .html"); 
//     $(".page_click_1_1").click(function(){
//     $(".conteudo").load("page1_1.html"); 
///////////////////////////////////////////////////////////////////////////////
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//-----------------------------Variáveis Globais-----------------------------//
//Valor inicial do slide-show;
var step_slideit = 1; //Valor da primeira imagem do slide show
//Latitude da loja;!
var latitude_loja = 41.178398; //Valor fixo, da loja!
//Longitude da loja;
var longitude_loja = -8.653767; //Valor fixo, da loja!
//Raio de alcance de entregas - KM;
var distancia_maxima = 10;
//Latitude do cliente;
var latitude_cliente; //Vai ser carrega na função localizacao_cliente()
//Longitude do cliente;
var longitude_cliente; //Vai ser carrega na função localizacao_cliente()
//Valor (€) do transporte, à hora
var custo_trans = 10;
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//-----------------------------Variáveis Locais------------------------------//

//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//-----------------Executar apenas quando a página carregar------------------//
$(document).ready(function() {
//Vai executar a função slideit, do slide show de publicidade
    slideit();
//Várias páginas numa só página
//Uso da api Ajax - Jquery
//Para info
//     $("#id do botão").click(function(){
//     $("#id da div").load("página .html"); 
//     $("#page_click_1_1").click(function(){
//     $("#conteudo").load("page1_1.html"); 
//     OU
//     $(".class do botão").click(function(){
//     $("class da div").load("página .html"); 
//     $(".page_click_1_1").click(function(){
//     $(".conteudo").load("page1_1.html");   
//Executar procedimentos para mudar de páginas
//Primeiro Botão - Cadeiras p/venda    
    // Página 1.1 como o respectivo html 
    $("#page_click_1_1").click(function() {
        $(".conteudo").load("page1_1.html");
        //Mudar imagem para correspondente através da função muda_imagem;
        muda_imagem('1_1');
    });
    // Página 1.2 como o respectivo html
    $("#page_click_1_2").click(function() {
        $(".conteudo").load("page1_2.html");
        //Mudar imagem para correspondente através da função muda_imagem;
        muda_imagem('1_2');
    });
    // Página 1.3 como o respectivo html
    $("#page_click_1_3").click(function() {
        $(".conteudo").load("page1_3.html");
        //Mudar imagem para correspondente através da função muda_imagem;
        muda_imagem('1_3');
    });
    //Segundo Botão - Serviços    
    // Página 2.1 como o respectivo html 
    $("#page_click_2_1").click(function() {
        $(".conteudo").load("page2_1.html");
        //Mudar imagem para correspondente através da função muda_imagem;
        muda_imagem('2_1');
    });
    // Página 2.2 como o respectivo html
    $("#page_click_2_2").click(function() {
        $(".conteudo").load("page2_2.html");
        //Mudar imagem para correspondente através da função muda_imagem;
        muda_imagem('2_2');
    });
    // Página 2.3 como o respectivo html
    $("#page_click_2_3").click(function() {
        $(".conteudo").load("page2_3.html");
        //Mudar imagem para correspondente através da função muda_imagem;
        muda_imagem('2_3');
    });
    //Terceiro Botão - Zona Cliente    
    // Página 3.1 como o respectivo html
    $("#page_click_3_1").click(function() {
        $(".conteudo").load("page3_1.html");
        //Mudar imagem para correspondente através da função muda_imagem;
        muda_imagem('3_1');
    });
    // Página 3.2 como o respectivo html
    $("#page_click_3_2").click(function() {
        $(".conteudo").load("page3_2.html", function() {
            //Código a executar quando o carregamento da página acabar//
            //Funções
            localizacao_cliente();
            //Mudar imagem para correspondente através da função muda_imagem;
            muda_imagem('3_2');
            /////Sub botões,dentro da página page3_2/////
            //Botão calcular preço do transporte página 3_2
            $("#calcular_preco").click(function() {
                //Limpar o conteúdo da div c/valor do transporte;
                var limpa = document.getElementById("info_servico");
                limpa.innerHTML = ('');
                //Valor do trasnporte através do objecto calc_preco_transp;
                calc_preco_transp.calcular_preco();
            });
        });
    });
//Quarto Botão - Contactos
    // Página 4 como o respectivo html
    $("#page_click_4").click(function() {
        //Executar função notifyMe (APInotification) e passar 
        //parametro "estilo_notificacao";
        notifyMe('Encontra-se na secção Contactos');
        $(".conteudo").load("page4.html", function() {
            //Código a executar quando o carregamento da página acabar;
            ////Mudar imagem para correspondente através da função muda_imagem;
            muda_imagem('4');
            //Funções;
            mapa_carrega_tudo(latitude_loja, longitude_loja, 'Nossa Loja!', (distancia_maxima * 1000));
        });
    });
});
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//--------------------------SLIDE SHOW DE PUBLICIDADE------------------------//
function slideit() {
    //------Função, sem variáveis, para executar slide show;  
    //Atribui ao atributo src do elemento img o valor que estiver 
    //aqui "_imagens/pub_image" + step + ".jpg";
    document.getElementById('pub_image').src = "_imagens/pub_image" + step_slideit + ".jpg";
    //Se o valor da variável step for menor que o número limite de imagens (6) 
    //então soma mais um ao número;
    if (step_slideit < 6)
        step_slideit++;
    //Caso seja igual iguala o valor da variável step a 1, para começar de novo;
    else
        step_slideit = 1;
    //Temporizador para executar a função slideit(), auto se executa a 
    //cada 2,5 segundos;
    setTimeout("slideit()", 2500);
}
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//------------------------------Mudar imagens--------------------------------//
function muda_imagem(num_var_image) {
    //Função para mudar de imagem a cada clique do botão
    document.getElementById('var_image').src = "_imagens/" + num_var_image + "_pub_image.png";
}
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//-----------Google Maps JavaScript API v3 e Geolocations--------------------//
//Função que carrega o mapa, ou com localização predefinida ou com a do cliente;
//Nota: O mapa de contactos carrega logo pois não influencia a privadidade 
//do cliente!
function carregar_mapa(latitude, longitude, texto, raio) {
//Se geolocation estiver no navegador
    if (navigator.geolocation) {
//Defenir o centro do mapa consoante os valores passados de latitude e 
//longitude;
        var myCenter = new google.maps.LatLng(latitude, longitude);
        //Tratamento do zoom consuante tipo de mapa, o do cliente ou da loja;
        if (raio === 0) {
            zoom = 18;
        } else {
            zoom = 11;
        }
        //Objecto para as propriedade do mapa;
        var mapProp = {
            center: myCenter,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        //Carregamento do mapa e suas propriedades para o id map-canvas
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapProp);
        ////Definição de marcador da localização;
        var marker = new google.maps.Marker({
            position: myCenter
        });
        //Marcador da localização, variável map;  
        marker.setMap(map);
        //Informação da janela que se abre sobre o marcador;
        var infowindow = new google.maps.InfoWindow({
            content: texto
        });
        //Animação do marcador de localização;
        google.maps.event.addListener(marker, 'click', function() {

            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        });
        //Evento para quando carregar-mos no marcador ele abrir uma janela;
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
        //Defenir valores e caracteristicas do raio de alcançe da loja;
        var myCity = new google.maps.Circle({
            center: myCenter,
            radius: raio,
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0000FF",
            fillOpacity: 0.4
        });
        //
        myCity.setMap(map);
    } else { //Senão escreve no documento que o navegador não têm suporte
        document.write("Ooopsss, o seu browser não tem suporte para geolocalização :(");
    }
}
//Função que carrega tudo do mapa, com valores de variáveis da função carregar_mapa;
function mapa_carrega_tudo(latitude, longitude, texto, raio) {
    google.maps.event.addDomListener(window, 'load', carregar_mapa(latitude, longitude, texto, raio));
}
//Função para carregar localização de cliente através do Geolocations;
function localizacao_cliente() {
    navigator.geolocation.getCurrentPosition(function(position) {
//Achar os valores de latitude e longitude do cliente;
        latitude_cliente = position.coords.latitude;
        longitude_cliente = position.coords.longitude;
        //Carregar mapa com valores de latitude e longitude do cliente mais
        //restante informação de argumentos;
        mapa_carrega_tudo(latitude_cliente, longitude_cliente, 'Sua Localização', 0);
    });
}
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//-----------------------Objecto para Calcular a distancia--------------------//
var calc_preco_transp = new Object();
//Criar propriedades do objecto;
//Propriedade referente à distancia máxima para transportes;
calc_preco_transp.distancia_maxima = distancia_maxima;
//Calcular distancia entre cliente e loja;
calc_preco_transp.dist_cliente_loja = function distancia() {
    function graus2rad(valor_graus) {
        //Recebe o valor que lhe passarem através da variável valor_graus e
        //multiplica o PI que divide por 180;
        return valor_graus * (Math.PI / 180);
    }
    var R = 6371; //Valor do raio da terra;
    var dLat = graus2rad(latitude_loja - latitude_cliente); //Calcular a latitude através da função graus2rad;
    var dLon = graus2rad(longitude_loja - longitude_cliente); //Calcular a longitude através da função graus2rad;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(graus2rad(latitude_cliente)) * Math.cos(graus2rad(longitude_cliente)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return (d).toFixed(0);
};
//Propriedade para calcular preço
calc_preco_transp.calcular_preco = function preco() {
    //Se a distancia do cliente da loja for menor ou igual que a distancia máxima,
    //então tem direito a transporte!
    if (calc_preco_transp.dist_cliente_loja() <= calc_preco_transp.distancia_maxima) {
        //Caixa para confirmar o transporte e informar o valor a pagar;
        if (confirm('O valor final do transporte da sua encomenda é de ' + (custo_trans * calc_preco_transp.dist_cliente_loja()) + '€. Deseja confirmar?')) {
            //Se o cliente concordar com o valor e der Ok então informar;
            var info_servico = document.getElementById("info_servico");
            info_servico.innerHTML = ('Encontra-se a ' + calc_preco_transp.dist_cliente_loja() + ' Km das nossas\n\
        instalações! Uma vez que a n/distancia máxima para entregas é de ' + calc_preco_transp.distancia_maxima + ' Km, a sua encomenda\n\
 será entregue num prazo máximo de 24 horas!');
            //Carregar aqui uma notificação
            notifyMe('Solicitou um transporte, aguarde!');
        }
    }
    //Senão não é possivel satisfazer a encomenda!
    else {
        var info_servico = document.getElementById("info_servico");
        info_servico.innerHTML = ('Lamenta-mos mas uma vez que se encontra-se a ' + calc_preco_transp.dist_cliente_loja() + ' Km das nossas\n\
        instalações, não temos forma de satisfazer o seu pedido! A n/distancia máxima para entregas é de ' + calc_preco_transp.distancia_maxima + ' Km.');
    }
};
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//
//--------------------------------API Notifications---------------------------//
//Função para notificações, com 1 variável;
function notifyMe(estilo_notificacao) {
    //Instrução Condicional - IF
    //Se (NOT) notificação estiver na janela (browser)
    if (!("Notification" in window)) {
        //então dar mensagem de erro
        alert("Infelizente o seu broswer não permite notifiações!");
    }
    //Operador === serve para comparar as expressões e determinar se
    //elas são iguais em valor e do mesmo tipo de dados;
    //Verificar o a permissão actual;
    //A propriedade permission do objecto Notification indica a permissão actual concedida
    //pelo cliente sobre as notificações. Valores da propriedade: granted, denied, default;
    //granted = O cliente deu o ok para receber notificações. 
    else if (Notification.permission === "granted") {
        //Se o valor da propriedade permission for igual a granted - concedido, então
        //criar uma notificação com o valor da variável desta função (notifyMe).
        new Notification(estilo_notificacao);
    }
    //Se a propriedade permission do objecto Notification for contrario de negado (denied)
    //então utilizar o método estático requestPermission do objecto Notification com parametro
    //"function(permission)";
    //O método estático requestPermission é utilizado para perguntar ao cliente
    //se permite a exibição de notificações;
    //Operador !== compara duas expressões para determinar se elas são iguais;
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function(permission) {
            // O que isto faz?
            if (!('permission' in Notification)) {
                //O valor que for solucionado pelo cliente, sim ou não, será
                //atribuido à propriedade permission do objecto Notification.
                //Significa que se o cliente der Ok o valor da propriedade será
                //de granted, se não permitir será de denied, por fim se o
                //cliente não fizer nenhuma das duas anteriores a sua acção
                //será desconhecida. Desta forma agiremos como se o cliente
                //tivesse negado as notificações;
                Notification.permission = permission;
            }
            if (permission === "granted") {
                //Se o valor da propriedade permission for igual a granted - concedido, então
                //criar uma notificação com o valor da variável desta função (notifyMe).
                new Notification(estilo_notificacao);
            }
        });
    }
}