import "phaser";
import myGlobalVariable from "../dist/global.js"

const VersionText = '2023/3/1 00:09';

// interface MyGlobalVariable {
//     key1: string;
//     key2: string;
// }

export default class Demo extends Phaser.Scene {
    private isGame1: boolean;

    constructor() {
        super("demo");

        // const gloVar = myGlobalVariable as MyGlobalVariable;

        // if (this.data.has('gold')) {
        //     this.data.set('gold', 1);
        // }
        // else {
        //     const g = +this.data.get('gold');
        //     this.data.set('gold', `${g + 1}`);
        // }
        // const lastG = +this.data.get('gold');

        let lastG = window.localStorage.getItem('gold');
        if (lastG) {
            lastG = `${+ lastG + 1}`;
        }
        else {
            lastG = `1`;
        }
        window.localStorage.setItem('gold', lastG);
        console.log(`lastG=${lastG}`);

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
            // this.showSource1();
            this.create_Game1();
        } else {
            // this.showSource2();
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
        // source code
        this.add.text(0, 0, `ver ${VersionText}\n` + 'source code: Game1，phaser3 - logo.png, plasma - bundle.glsl.js, shader(RGB Shift Field, tweens.add');

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
    private showSource1(): void {
        // console.log("querySelector(.SourceCodeFrame");
        // const el = document.querySelector(".SourceCodeFrame");
        // el.innerHTML =
        //     "<pre>" +
        //     "phaser3-logo.png" +
        //     "<br>" +
        //     "plasma-bundle.glsl.js" +
        //     "<br>" +
        //     "shader(RGB Shift Field" +
        //     "<br>" +
        //     "tweens.add" +
        //     "</pre>";
    }

    preload_Game2(): void {
        this.load.image("logo", "assets/phaser3-logo.png");
    }
    create_Game2(): void {
        console.log("Game2");
        // source code
        this.add.text(0, 0, 'source code: Game2, phaser3-logo.png, tweens.add');

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
    private showSource2(): void {
        // console.log("querySelector(.SourceCodeFrame");

        // const el = document.querySelector(".SourceCodeFrame");
        // el.innerHTML =
        //     "<pre>" + +"phaser3-logo.png" + "<br>" + "tweens.add" + "<br>" + "</pre>";
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
