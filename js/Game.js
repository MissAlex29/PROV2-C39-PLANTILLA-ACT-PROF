class Game {
  constructor() {
   
  }
  //Función para obtener estado de juego de base de datos 
  getState(){
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value",function(data) {
      gameState = data.val();
    });
  }

  //Método para actualizar base de datos 
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    //Objeto para el jugador 
    player = new Player();
    playerCount = player.getCount();

    //Objeto para el formulario de registro
    form = new Form();
    form.display();

    //Jugador 1 
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;
    //Jugador 2 
    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;
    //Matriz para almacenar ambos jugadores 
    cars = [car1, car2];
  }

  //Ocultar 
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    
  }

  //Método PLAY
  play() {
    //Oculta el formulario
    this.handleElements();
    
    //Obtiene info. del jugador 
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      
      image(track, 0, -height * 5, width, height * 6);
      
      
      
      var index = 0; 
      for(var prl in allPlayers){
        index = index + 1;
        
        //Almacenamos las posiciones de la BD 
        var x = allPlayers[prl].positionX;
        var y = height - allPlayers[prl].positionY; 
        
        cars[index-1].position.x = x;
        cars[index-1].position.y = y; 
        
        //Dibujaremos ellipse para cada jugador 
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);    
          
          //Cambiar posición de la cámara 
          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;      
        }
      }      
      //Llamamos función de controles 
      this.handlePlayerControls();
      drawSprites();
    }
  }

  //Muestra quien es el lider 
  /*showLeaderboard() {
    //Variable para almacenar jugador lider
    var leader1, leader2;
    var players = Object.values(allPlayers);
    //Comprueba si el 1er jugador tiene la posición 1 
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;esta etiqueta se utiliza para mostrar cuatro espacios.
      //Sí se cumple la condición 
      leader1 =
        players[0].rank +
        "&emsp;" +
        //Colocamos el nombre del jugador 1 en 1er lugar
        players[0].name +
        "&emsp;" +
        //Colocamos su puntuación en 1er lugar
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        //Colocamos el nombre del jugador 2 en 2er lugar
        players[1].name +
        "&emsp;" +
        //Colocamos su puntuación en 2do lugar
        players[1].score;
    }
    //Comprueba si el jugador 2 tiene la posición 1 
    if (players[1].rank === 1) {
      //Sí se cumple la condición 
      leader1 =
        players[1].rank +
        "&emsp;" +
        //Colocamos el nombre del jugador 2 en 1er lugar
        players[1].name +
        "&emsp;" +
        //Colocamos su puntuación en 1er lugar
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        //Colocamos el nombre del jugador 1 en 2er lugar
        players[0].name +
        "&emsp;" +
        //Colocamos su puntuación en 2do lugar
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }*/
  
  //Función para controles 
  handlePlayerControls() {
    // manejando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      //Actualizamos posición del jugador en base de datos 
      player.update();
    }
  }
}
