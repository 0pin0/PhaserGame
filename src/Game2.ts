import "phaser";

export default class Game2 extends Phaser.Scene {
  constructor() {
    super("Game2");
  }

  preload() {}

  create() {
    console.log("Game2");
  }
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: Game2,
};

const game = new Phaser.Game(config);
