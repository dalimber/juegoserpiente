
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");


    

    // Primera pintura del juego al cargar la página
    function iniciarJuego() {
      dibujarTodo();
    }
    

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() 
    {
      limpiarCanvas();
      /*dibujar cuadricula*/
      dibujarTablero();
    }

    const TAMANIO_CELDA=25;
    function dibujarTablero() 
    {
      for (let index = 0; index < canvas.width; index+=TAMANIO_CELDA) 
        {
          ctx.strokeStyle //coloca un color de línea, similar a fillStyle
          ctx.beginPath()//se invoca siempre para iniciar un trazo
          let x=index;
          let y=0;
          ctx.moveTo(x,y)//posición inicial de la figura
          x=index;
          y=canvas.height;
          ctx.lineTo(x,y)/*dibuja una línea desde la ultima posicion del graficador, en este caso lo que puso en moveTo, hasta la posicion que
          recibe como parámetro, colocar cualquier valor*/
          ctx.stroke()//dibuja la línea
        }
    }



