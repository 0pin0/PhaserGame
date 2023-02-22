import { Game, Scene } from "phaser";

// Define your game configuration
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO, // Change to Phaser.CANVAS, Phaser.WEBGL, or Phaser.HEADLESS
    width: 800,
    height: 600,
    parent: "game",
    scene: [], // Add custom scenes to the array
    physics: {
        default: "arcade"
    },
    backgroundColor: "#000000"
};

// Create a new game instance based on the configuration
const game: Phaser.Game = new Game(config);

// Add custom scene
class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }
}
game.scene.add("MyScene", MyScene, true);

// Start the game
game.scene.start("MyScene");
