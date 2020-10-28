class Game {
  constructor() {



  }



  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var any = await database.ref('playerCount').once("value");
      if (any.exists()) {
        playerCount = any.val();
        player.getCount();
      }

      form = new Form();
      form.display();
    }
  }


  play() {

    form.hide();
    text("Game Start !!");
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {

      var pos = 130;

      for (var i in allPlayers) {

        if (i === "player" + player.index) {

          fill("red");
        } else {
          fill("black");
        }

        pos += 20;
        text(allPlayers[i].name + " : " + allPlayers[i].distance, 120, pos);
      }



    }

    if (keyDown(UP_ARROW)) {

      player.distance += 50;
      player.update();

    }

  }
}