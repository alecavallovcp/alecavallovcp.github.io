// VARIABLES QUE APUNTAN A ELEMENTOS HTML
const sectionSeleccionarAtaque = document.getElementById("seccion-seleccionar-ataque")
const sectionSeleccionarReiniciar = document.getElementById("reiniciar")
const botonComenzar = document.getElementById("boton-comenzar")
const botonReiniciar = document.getElementById("boton-reiniciar")
const spanVidasJugador = document.getElementById("victorias-jugador")
const spanVidasEnemigo = document.getElementById("victorias-enemigo")
const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const sectionSeleccionarMascota = document.getElementById("seccion-seleccionar-mascota")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorBotonesAtaque = document.getElementById("contenedor-botones-ataque")

// VARIABLES GLOBALES
let mokepones = []
let mokeponesEnemigo = []
let ataqueJugador
let ataquesJugador = [] // Secuencia de ataques clickeados
let ataqueEnemigo
let ataquesEnemigo = [] // Secuencia de ataques del mokepon enemigo
let ataquesEnemigoRandom = [] // Reordenados aleatoriamente
let jugando = true
let opcionDeMokepones // Todos los mokepones disponibles HTML button
let opcionDeAtaques // HTML button de los ataques disponibles 
let inputHipodoge // Botón Hipodoge HTML: con checked y id
let inputCapipepo // Botón Capipepo HTML: con checked y id
let inputRatigueya // Botón Ratigueya HTML: con checked y id
let mascotaJugador // Nombre extraído del id del botón de la mascota
let mokeponJugador // Objeto completo mokepon del jugador
let mascotaEnemigo // Nombre del mokepon del enemigo
let mokeponEnemigo // Objeto completo mokepon del enemigo
let botonFuego
let botonAgua
let botonTierra
let botones = [] // Objeto button de los ataques disponibles 
let indexAtaqueJugador // Nombre del ataque elegido 
let indexAtaqueEnemigo // Nombre del ataque elegido
let indexJugada = 0 // Indica el número de la jugada arrancando por 0

let victoriasJugador = 0
let victoriasEnemigo = 0

let mokeponAncho = 40
let mokeponAlto = 40

let lienzo = mapa.getContext('2d')
let mapaAncho = window.innerWidth * 0.95
if (mapaAncho > 500){
    mapaAncho = 500*.95
}
let mapaAlto = mapaAncho * 600 / 800
let mapaBackground = new Image()
mapaBackground.src = 'assets/mokemap.png'
let intervalo


let A1 = "FUEGO 🔥"
let A2 = "AGUA 💧"
let A3 = "TIERRA 🪴"
let B1 = 'botonFuego'
let B2 = 'botonAgua'
let B3 = 'botonTierra'

// CREAMOS UNA CLASE PARA LOS MOKEPONES USANDO ECMA SCRIPT 6 (2015)
class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, ancho = mokeponAncho, alto = mokeponAlto, x, y) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        // Predeterminamos ubicación y tamaño
        this.ancho = ancho
        this.alto = alto
        this.x = x || aleatorio(50,mapaAncho-this.ancho)
        this.y = y || aleatorio(50,mapaAlto-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto)
    }
}

let hipodoge = new Mokepon('Hipodoge','assets/mokepons_mokepon_hipodoge_attack.png',5,'assets/hipodoge.png',mokeponAncho*1.3, mokeponAlto*1.3, 10, 10)

let capipepo = new Mokepon("Capipepo",'assets/mokepons_mokepon_capipepo_attack.png',5,'assets/capipepo.png',mokeponAncho*1.3, mokeponAlto*1.3, 10, 10)

let ratigueya = new Mokepon("Ratigueya","assets/mokepons_mokepon_ratigueya_attack.png",5,'assets/ratigueya.png',mokeponAncho*1.3, mokeponAlto*1.3, 10, 10)

// Creo un nuevo objeto por cada personaje para los enemigos
   // Ubico el enemigo en una posición aleatoria lejos del jugador
let hipodogeEnemigo = new Mokepon('Hipodoge','assets/mokepons_mokepon_hipodoge_attack.png',5,'assets/hipodoge.png',mokeponAncho,mokeponAlto)

let capipepoEnemigo = new Mokepon("Capipepo",'assets/mokepons_mokepon_capipepo_attack.png',5,'assets/capipepo.png',mokeponAncho,mokeponAlto)

let ratigueyaEnemigo = new Mokepon("Ratigueya","assets/mokepons_mokepon_ratigueya_attack.png",5,'assets/ratigueya.png',mokeponAncho,mokeponAlto)

hipodoge.ataques.push(
    { nombre: A1, id:B1},
    { nombre: A2, id:B2},
    { nombre: A2, id:B2},
    { nombre: A2, id:B2},
    { nombre: A3, id:B3}
)

capipepo.ataques.push(
    { nombre: A1, id:B1},
    { nombre: A2, id:B2},
    { nombre: A3, id:B3},
    { nombre: A3, id:B3},
    { nombre: A3, id:B3}
)

ratigueya.ataques.push(
    { nombre: A1, id:B1},
    { nombre: A1, id:B1},
    { nombre: A1, id:B1},
    { nombre: A2, id:B2},
    { nombre: A3, id:B3}
)
hipodogeEnemigo.ataques.push(
    { nombre: A1, id:B1},
    { nombre: A2, id:B2},
    { nombre: A2, id:B2},
    { nombre: A2, id:B2},
    { nombre: A3, id:B3}
)

capipepoEnemigo.ataques.push(
    { nombre: A1, id:B1},
    { nombre: A2, id:B2},
    { nombre: A3, id:B3},
    { nombre: A3, id:B3},
    { nombre: A3, id:B3}
)

ratigueyaEnemigo.ataques.push(
    { nombre: A1, id:B1},
    { nombre: A1, id:B1},
    { nombre: A1, id:B1},
    { nombre: A2, id:B2},
    { nombre: A3, id:B3}
)

mokepones.push(hipodoge,capipepo,ratigueya)

// No es fácil hacer una copia de arrays, asique creo uno nuevo
mokeponesEnemigo.push(hipodogeEnemigo,capipepoEnemigo,ratigueyaEnemigo)

function iniciarJuego(){  
    mokepones.forEach((mokep) => {
        // Generamos una estructura que se llama Templates Literarios usando comillas invertidas. De esta forma podremos insertar texto HTML como necesitamos, y las variables con peso y llaves ${}.
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokep.nombre}">
            <label class="tarjeta-de-mokepon" for="${mokep.nombre}">
                <p>${mokep.nombre}</p>
                <img src="${mokep.foto}" alt="${mokep.nombre}">
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })

    sectionSeleccionarAtaque.style.display = 'none'
    sectionSeleccionarReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'    
    botonComenzar.addEventListener("click", seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

function elegirAtaqueEnemigo(){
    // 1) We put each element in the array in an object, and give it a random sort key. 
    // 2) We sort using the random key
    // 3) We unmap to get the original objects
    ataquesEnemigoRandom = ataquesEnemigo
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    // Extraigo sólo el nombre del ataque
    ataquesEnemigoRandom = ataquesEnemigoRandom.map(o=>o.nombre)
        
    console.log("ATAQUES ENEMIGO RANDOM: ", mascotaEnemigo)
    console.log(ataquesEnemigoRandom)
    
}

function iniciarPelea(){
    console.log("Iniciando pelea")
    if (ataquesJugador.length == botones.length){
        // Si hemos clickeado todos los botones
        console.log("Resultado combate")
        combate()
        revisarVictorias()
    } else {
        combate()
        indexJugada++
    }
}

function indexAmbosOponentes(indexJugada){
    indexAtaqueJugador = ataquesJugador[indexJugada]
    indexAtaqueEnemigo = ataquesEnemigoRandom[indexJugada]
}

function combate(){
    if (jugando){    
        let resultado = ""
        let resultado2 = "" //🟢🔴🟡 Algunos emoticos ocupan 2 espacios en el string. Asique para que funcione el slice() luego, hay que elegir 3 iconos del mismo tamaño

        /* for (let indexJugada = 0; indexJugada < ataquesJugador.length; indexJugada++) { */
            if(ataquesJugador[indexJugada] == ataquesEnemigoRandom[indexJugada]){
                indexAmbosOponentes(indexJugada)
                resultado = "🤷‍♀️ EMPATE 🤷‍♀️"
                resultado2 = "➖➖"
                console.log("(",indexJugada+1,") ",ataquesJugador[indexJugada]," vs ",ataquesEnemigoRandom[indexJugada],"= ",resultado)
            }else if (ataquesJugador[indexJugada] == A1 && ataquesEnemigoRandom[indexJugada] == A3 || ataquesJugador[indexJugada] == A2 && ataquesEnemigoRandom[indexJugada] == A1 || ataquesJugador[indexJugada] == A3 && ataquesEnemigoRandom[indexJugada] == A2){
                indexAmbosOponentes(indexJugada)
                resultado = "🤑 GANASTE 🤑"
                resultado2 = "✅❌" 
                console.log("(",indexJugada+1,") ",ataquesJugador[indexJugada]," vs ",ataquesEnemigoRandom[indexJugada],"= ",resultado)
                victoriasJugador++        
            } else {
                indexAmbosOponentes(indexJugada)
                resultado = "😓 PERDISTE 😓"
                resultado2 = "❌✅" //🔴🟢
                console.log("(",indexJugada+1,") ",ataquesJugador[indexJugada]," vs ",ataquesEnemigoRandom[indexJugada],"= ",resultado)
                victoriasEnemigo++        
            }
                
            spanVidasEnemigo.innerHTML = victoriasEnemigo
            spanVidasJugador.innerHTML = victoriasJugador
            crearMensaje(resultado, resultado2)
        /* } */

        
    }
}


function revisarVictorias(){
    if (victoriasJugador === victoriasEnemigo){
        // EMPATAMOS LA PARTIDA
        jugando = false
        crearMensajeFinal("🤷‍♀️ EMPATASTE LA PARTIDA 🤷‍♀️")
    } else if (victoriasJugador > victoriasEnemigo){
        // GANAMOS LA PARTIDA
        jugando = false
        crearMensajeFinal("🤑 ¡GANASTE LA PARTIDA! 🤑")
    } else if (victoriasEnemigo > victoriasJugador){
        // PERDIMOS LA PARTIDA
        jugando = false
        crearMensajeFinal("😓 PERDISTE LA PARTIDA 😓")
    } 
}
function crearMensaje(resultado, resultado2){
    console.log("Creando mensaje: ",resultado,resultado2)
    sectionMensajes.innerHTML = resultado

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')
    // Le borro los 3 últimos caracteres que contienen el emoticon, y le agrego otro que indique quién ganó
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador.slice(0,indexAtaqueJugador.length-3)+resultado2.slice(0,1)
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo.slice(0,indexAtaqueEnemigo.length-3)+resultado2.slice(1,2)

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(mensajeFinal){
    console.log("Creando mensaje FINAL: ",mensajeFinal)
    sectionMensajes.innerHTML = mensajeFinal

    sectionSeleccionarReiniciar.style.display = 'block'
}

function seleccionarMascotaJugador(){
    // Oculto y muestro las secciones correspondientes
    //sectionSeleccionarAtaque.style.display = 'none'
    sectionSeleccionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
    
    if(inputHipodoge.checked){
        mascotaJugador = inputHipodoge.id        
    } else if (inputCapipepo.checked){
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        mascotaJugador = inputRatigueya.id
    } else {
        mascotaJugador = ""
        sectionSeleccionarAtaque.style.display = 'none'
        sectionSeleccionarMascota.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        alert("¡Debes seleccionar una mascota!")
    }
    
    
    if (mascotaJugador != ""){
        iniciarMapa()
        spanMascotaJugador.innerHTML = mascotaJugador
        mokeponJugador = obtenerObjetoMokepon(mokepones,mascotaJugador)
        extraerAtaquesJugador(mascotaJugador)        
    }
}

function obtenerObjetoMokepon(arrayInput,nombre){
    for (let i = 0; i < arrayInput.length; i++) {
        if (nombre === arrayInput[i].nombre) {
            console.log('Objeto mokeponJugador obtenido')
            return arrayInput[i]
        }
        
    }
}

function extraerAtaquesJugador(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    let opcionDeAtaques
    ataques.forEach(a => {
        opcionDeAtaques = `
        <button id="${a.id}" class="boton-de-ataque">${a.nombre}</button>
        `
        contenedorBotonesAtaque.innerHTML += opcionDeAtaques
    })

    // Pediremos que nos arme un array por cada uno de los objetos del HTML que representa un botón, indicando la clase establecida con ".CLASE" (con un punto por delante).
    botones = document.querySelectorAll('.boton-de-ataque')    
}

//Creamos una función que nos guarde en un array la secuencia de los ataques elegidos
function secuenciaAtaque(){
    botones.forEach(b => {
        b.addEventListener("click", (e) =>{
            ataquesJugador.push(e.target.textContent)
            console.log(ataquesJugador)
            b.style.background = "#890F0D"
            b.disabled = true
            iniciarPelea()
        })
    })
    elegirAtaqueEnemigo()
}

function seleccionarMascotaEnemigo(enemigo){
    // ENEMIGO SELECCIONADO POR COLISIÓN
    console.log("ENEMIGO SELECCIONADO POR COLISIÓN:\nNombre: " + enemigo.nombre+"\nAtaques: "+enemigo.ataques)
    mascotaEnemigo = enemigo.nombre
    mokeponEnemigo = enemigo
    spanMascotaEnemigo.innerHTML = mascotaEnemigo
    ataquesEnemigo = enemigo.ataques
    
    secuenciaAtaque()
}

function pintarCanvas(){
    // Limpiamos el Canvas
    lienzo.clearRect(0,0,mapa.clientWidth,mapa.clientHeight) 

    // Insertamos el fondo del mapa
    lienzo.drawImage(mapaBackground,0,0,mapa.width,mapa.height)

    //console.log("Pintamos. X:",capipepo.x," Y:",capipepo.y)
    mokeponJugador.x = mokeponJugador.x + mokeponJugador.velocidadX
    mokeponJugador.y = mokeponJugador.y + mokeponJugador.velocidadY
    
    mokeponJugador.pintarMokepon()
    mokeponesEnemigo.forEach(m => m.pintarMokepon())

    if (mokeponJugador.velocidadX !== 0 || mokeponJugador.velocidadY !== 0){
        revisarColision(mokeponesEnemigo)
    }
}

function moverPersonaje(direccion){
    console.log(direccion)
    if (direccion == 'DERECHA'){
        mokeponJugador.velocidadX = 5
    } else if (direccion == 'IZQUIERDA'){
        mokeponJugador.velocidadX  = -5
    } else if (direccion == 'ARRIBA'){
        mokeponJugador.velocidadY  = -5
    } else if (direccion == 'ABAJO'){
        mokeponJugador.velocidadY  = 5
    } else if (direccion == 'DETENER'){
        mokeponJugador.velocidadX  = 0
        mokeponJugador.velocidadY  = 0
    }

    pintarCanvas()

}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverPersonaje('ARRIBA')
            break
        case 'ArrowDown':
            moverPersonaje('ABAJO')
            break
        case 'ArrowLeft':
            moverPersonaje('IZQUIERDA')
            break
        case 'ArrowRight':
            moverPersonaje('DERECHA')
            break
        default:
            break
    }
}

function iniciarMapa(){
    mapa.width = mapaAncho
    mapa.height = mapaAlto

    // Seteamos que se llame a tal función cada tantos milisegundos
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', seSoltoUnaTecla)

}

function seSoltoUnaTecla(event){
    moverPersonaje('DETENER')
}

function revisarColision(enemigos){
    const arribaMascota = mokeponJugador.y
    const abajoMascota = mokeponJugador.y + mokeponJugador.alto
    const derechaMascota = mokeponJugador.x + mokeponJugador.ancho
    const izquierdaMascota = mokeponJugador.x

    enemigos.forEach(enemigo => {    
        const arribaEnemigo = enemigo.y
        const abajoEnemigo = enemigo.y + enemigo.alto
        const derechaEnemigo = enemigo.x + enemigo.ancho
        const izquierdaEnemigo = enemigo.x

        if( // Si se cumple algo de esto es que no hay colisión (no lo entiendo muy bien la verdad)
            abajoMascota < arribaEnemigo ||
            arribaMascota > abajoEnemigo ||
            derechaMascota < izquierdaEnemigo ||
            izquierdaMascota > derechaEnemigo
        ){
            return
        }
        moverPersonaje('DETENER')
        // Detenemos el intervalo de ejecución de la función
        clearInterval(intervalo)
        // Oculto y muestro las secciones correspondientes
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'

        seleccionarMascotaEnemigo(enemigo)
    })
}

// Para que ejecute el código cuando se haya terminado de cargar la página así no hay errores
window.addEventListener("load",iniciarJuego)
