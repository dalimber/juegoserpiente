
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA=25;

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
        ctx.fillStyle="blacks"
        pintarParte(arregloRecorrer.x,arregloRecorrer.y);
      }
    
  }
}
