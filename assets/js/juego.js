const miModulo = (() => {
    'use strict'

    
    let deck         = [];
    const tipos      = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

let puntosJugadores=[]


// Referencias del HTML
const btnPedir   = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener'),
      btnNuevo   = document.querySelector('#btnNuevo');

const puntosHTML = document.querySelectorAll('small'),
         divCartasJugadores = document.querySelectorAll('.divCartas')

// Esta función crea un nuevo deck

const inicializarJuego =(numJugadores=2) => {
    deck= crearDeck();
    puntosJugadores=[]
    for (let i=0 ; i<numJugadores ; i++)
        puntosJugadores.push(0)


    puntosHTML.forEach(elem => elem.innerText=0)
    divCartasJugadores.forEach(elem => elem.innerHTML='')
    



}

const crearDeck = () => {
    deck =[] 
    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        }
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo);
        }
    }
    // console.log( deck );
    return _.shuffle( deck );
}


// Esta función me permite tomar una carta
const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    return  deck.pop();
}

// pedirCarta();
const valorCarta = ( carta ) => {
    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN( valor ) ) ? 
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
}
// turno: 0 es el primer jugador, el ultimo es la computadora
const acumularPuntos = (carta,turno) => {
         puntosJugadores[turno]=puntosJugadores[turno] + valorCarta( carta );
       puntosHTML[turno].innerText = puntosJugadores[turno];
       return puntosJugadores[turno]
}

const crearCarta =(carta , turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append( imgCarta );
}

const determinarGanador =()=>{
    const [puntosMinimos, puntosComputadora] = puntosJugadores
    setTimeout(() => {
        if( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) {
            alert('Jugador Gana');
        } else {
            alert('Computadora Gana')
        }
    }, 100 );
}

// turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {
    let puntosComputadora= 0;
    do {
        const carta = pedirCarta();
        puntosComputadora=   acumularPuntos(carta, puntosJugadores.length-1)     
        crearCarta (carta, puntosJugadores.length-1)

        if( puntosMinimos > 21 ) {
            break;
        }

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

    determinarGanador()
}

// Eventos pedir carta jugador
btnPedir.addEventListener('click', () => {

   const carta = pedirCarta();    
   const puntosJugador = acumularPuntos(carta, 0)
   crearCarta (carta, 0)

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador);

    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

});


btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugadores[0] );
});

btnNuevo.addEventListener('click', () => {

    inicializarJuego()  
    btnPedir.disabled   = false;
    btnDetener.disabled = false;
  });

  return {
    nuevoJuego: inicializarJuego
  }

})()


