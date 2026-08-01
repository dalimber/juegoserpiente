
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    
    let puntaje=0;
    let comidaAtrapada=false;

    let intervaloSerpiente=null;
    let direccionActual="derecha";

    const TAMANIO_CELDA=25;

    const maximoX = canvas.width / TAMANIO_CELDA;
    const maximoY = canvas.height / TAMANIO_CELDA;
    let juegoTerminado=false;
    let velocidad=1000;

    const serpiente = 
    [
      /*//Ejercicio1
      {x:0,y:0},
      {x:1,y:0},
      {x:2,y:0},
      //Ejercicio2
      {x:10,y:12},
      {x:11,y:12},
      {x:12,y:12},
      {x:12,y:13},
      //Ejercicio3*/
      {x:0,y:10},
      {x:0,y:11},
      {x:0,y:12},
      {x:0,y:13},
      {x:0,y:14},
    ];
    
    let comida={x:3,y:10};

    // Primera pintura del juego al cargar la página
      dibujarTodo();
    

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() 
    {
      limpiarCanvas();
      //dibujar cuadricula
      dibujarTablero();
      /*//Prueba1
      pintarParte(5,5);
      //Prueba2
      pintarParte(10,2);
      //Prueba3
      pintarParte(1,23);
      //Prueba4
      pintarParte(23,5);
      //Prueba5
      pintarParte(0,5);
      //Prueba6
      pintarParte(23,0);*/
      pintarSerpiente();
      //moverDerecha();
      pintarComida();
    }

    function dibujarTablero() 
    {
      //Pintamos las lineas verticales de la cuadricula
      for (let index = 0; index < canvas.width; index+=TAMANIO_CELDA) 
        {
          ctx.strokeStyle //coloca un color de línea, similar a fillStyle
          ctx.beginPath()//se invoca siempre para iniciar un trazo
          let xLineaVertical=index;
          let yLineaVertical=0;
          ctx.moveTo(xLineaVertical,yLineaVertical)//posición inicial de la figura
          yLineaVertical=canvas.height;
          ctx.lineTo(xLineaVertical,yLineaVertical)/*dibuja una línea desde la ultima posicion del graficador, en este caso lo que puso en moveTo, hasta la posicion que
          recibe como parámetro, colocar cualquier valor*/
          ctx.stroke()//dibuja la línea
        }
      //Pintamos las lineas horizontales de la cuadricula
      for (let index = 0; index < canvas.height; index+=TAMANIO_CELDA) 
        {
          ctx.strokeStyle //coloca un color de línea, similar a fillStyle
          ctx.beginPath()//se invoca siempre para iniciar un trazo
          let xLineaHorizontal=0;
          let yLineaHorizontal=index;
          ctx.moveTo(xLineaHorizontal,yLineaHorizontal)//posición inicial de la figura
          xLineaHorizontal=canvas.width;
          ctx.lineTo(xLineaHorizontal,yLineaHorizontal)/*dibuja una línea desde la ultima posicion del graficador, en este caso lo que puso en moveTo, hasta la posicion que
          recibe como parámetro, colocar cualquier valor*/
          ctx.stroke()//dibuja la línea
        }
    }

function pintarParte(lineaX,lineaY) 
{
  let posicionX=lineaX*TAMANIO_CELDA;
  let posicionY=lineaY*TAMANIO_CELDA;

  ctx.fillRect(posicionX,posicionY,TAMANIO_CELDA,TAMANIO_CELDA);
}

function pintarSerpiente() 
{
  for (let index = 0; index < serpiente.length; index++) 
    {
      let arregloRecorrer=serpiente[index];
      if (arregloRecorrer!=serpiente[0]) 
        {ctx.fillStyle="red";
          pintarParte(arregloRecorrer.x,arregloRecorrer.y);
      } 
      else 
      {
        ctx.fillStyle="black"
        pintarParte(arregloRecorrer.x,arregloRecorrer.y);
      }
    
  }
}

// =========================
//FUNCIONES DE MOVIMIENTO
// =========================
function cambiarDireccion(direccion) 
{
    direccionActual=direccion;
    moverSerpiente(direccionActual);

}

function moverDerecha() 
{
  //Posicion de la cabeza de la serpiente
  let nuevaCabeza=
  {
    x:serpiente[0].x+1,
    y:serpiente[0].y
  } 
  //Cuadro nuevo hacia la derecha
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda() 
{
  //Posicion de la cabeza de la serpiente
  let nuevaCabeza=
  {
    x:serpiente[0].x-1,
    y:serpiente[0].y
  } 
  //Cuadro nuevo hacia la derecha
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() 
{
  //Posicion de la cabeza de la serpiente
  let nuevaCabeza=
  {
    x:serpiente[0].x,
    y:serpiente[0].y-1
  } 
  //Cuadro nuevo hacia la derecha
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() 
{
  //Posicion de la cabeza de la serpiente
  let nuevaCabeza=
  {
    x:serpiente[0].x,
    y:serpiente[0].y+1
  } 
  //Cuadro nuevo hacia la derecha
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

//MOVIMIENTO AUTOMATICO
function iniciarJuego() 
{
  pintarComida();
  intervaloSerpiente=setInterval(moverSerpiente,velocidad);
  document.getElementById("estado").innerText = "Partida en curso";
  document.getElementById("mensaje").textContent = "Da tu mejor esfuerzo";
}

function pausarJuego() 
{
  console.log("JUEGO PAUSADO")
  clearInterval(intervaloSerpiente);
  document.getElementById("estado").innerText = "Pausa";
}

function moverSerpiente() 
{
  juegoTerminado=GameOver();
  if (juegoTerminado!=true) 
    {
      if (direccionActual == "arriba") 
        { moverArriba()};
      if (direccionActual == "abajo") 
        { moverAbajo()};
      if (direccionActual == "izquierda") 
        { moverIzquierda()};
      if (direccionActual == "derecha") 
        { moverDerecha()};
      
      comidaAtrapada=atrapaComida();
      if (comidaAtrapada==true) 
        {
          let cola = serpiente[serpiente.length - 1];
          serpiente.push({x: cola.x,y: cola.y});
          puntaje+=1;
          document.getElementById("puntaje").innerText = ""+puntaje;
            velocidad -= 200;
            clearInterval(intervaloSerpiente);
            intervaloSerpiente = setInterval(moverSerpiente, velocidad);
        }
        dibujarTodo();
    }
    else {return;}
}

// =========================
//FUNCIONES DE COMIDA
// =========================

function pintarComida()
{
  let comidaX=comida.x;
  let comidaY=comida.y;
  if(comidaAtrapada==true)
  {
    comidaX=Math.floor(Math.random()*(maximoX));
    comidaY=Math.floor(Math.random()*(maximoY));
    comida.x=comidaX;
    comida.y=comidaY;
  }

ctx.fillStyle="black";
pintarParte(comidaX,comidaY);
}
function atrapaComida() 
{
  let cabeza = serpiente[0];
  if (cabeza.x == comida.x && cabeza.y == comida.y) 
    {return true;}
  else
    {return false;}
}

// =========================
//FUNCIONES DE TERMINAR JUEGO
// =========================
function GameOver() 
{
  let cabeza = serpiente[0];
  if (
      cabeza.x < 0 ||
      cabeza.y < 0 ||
      cabeza.x >= maximoX ||
      cabeza.y >= maximoY
    ) 
    {
      juegoTerminado = true;
      pausarJuego();
      document.getElementById("estado").innerText = "GAME OVER";
      document.getElementById("mensaje").innerText = "Tu puntaje fue de: "+puntaje;
    }

    // Verifica si choca con su propio cuerpo
    for (let index = 1; index < serpiente.length; index++) 
      {
      if (
          cabeza.x == serpiente[index].x &&
          cabeza.y == serpiente[index].y
          ) 
          {
            juegoTerminado = true;
            pausarJuego();
            document.getElementById("estado").innerText = "GAME OVER";
            document.getElementById("mensaje").innerText = "Tu puntaje fue de: "+puntaje;
          }
    }
    return juegoTerminado;
}

function reiniciarJuego() 
{
  pausarJuego();
  velocidad=1000;
  puntaje=0;
  juegoTerminado = false;
  serpiente.length = 0;
  serpiente.push
  (
    {x:0,y:10},
    {x:0,y:11},
    {x:0,y:12},
    {x:0,y:13},
    {x:0,y:14},
  );
    direccionActual = "derecha";
    document.getElementById("puntaje").textContent = "0";
    document.getElementById("estado").textContent = "Listo";
    document.getElementById("mensaje").textContent = "Presiona Iniciar para comenzar.";
    dibujarTodo();

}
