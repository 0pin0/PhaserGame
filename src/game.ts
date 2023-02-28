import "phaser";

export default class Demo extends Phaser.Scene {
    private isGame1: boolean;

    constructor() {
        super("demo");

        this.isGame1 = Math.random() > 0.5;
        console.log(`this.isGame1 =${this.isGame1}`);
    }

    preload(): void {
        console.log(`preload`);
        if (this.isGame1) {
            this.preload_Game1();
        } else {
            this.preload_Game2();
        }
    }

    create(): void {
        console.log(`create`);
        if (this.isGame1) {
            this.create_Game1();
        } else {
            this.create_Game2();
        }
    }

    preload_Game1(): void {
        this.load.image("logo", "assets/phaser3-logo.png");
        this.load.image("libs", "assets/libs.png");
        this.load.glsl("bundle", "assets/plasma-bundle.glsl.js");
        this.load.glsl("stars", "assets/starfields.glsl.js");
    }

    create_Game1(): void {
        console.log("Game1");

        this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);

        this.add.shader("Plasma", 0, 412, 800, 172).setOrigin(0);

        this.add.image(400, 300, "libs");

        const logo = this.add.image(400, 70, "logo");

        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 1500,
            ease: "Sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    }

    preload_Game2(): void {
        this.load.image("logo", "assets/phaser3-logo.png");
    }
    create_Game2(): void {
        console.log("Game2");

        const logo = this.add.image(400, 70, "logo");

        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 1500,
            ease: "Sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: "#125555",
    width: 800,
    height: 600,
    scene: Demo,
};

const game = new Phaser.Game(config);
