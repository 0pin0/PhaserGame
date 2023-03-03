import "phaser";
import myGlobalVariable from "../dist/global.js"

const VersionText = '2023/3/3 07:29';

const LSKey_GameId = 'LSKey_GameID';

export default class Demo extends Phaser.Scene {
    private readonly btnImageKey = 'btn';
    private readonly gameTitlePosY = 30;

    private gameId: number = 0;

    //#region base
    constructor() {
        super("Demo");

        // 轉換gameId
        let gameIdText = window.localStorage.getItem(LSKey_GameId);
        this.gameId = 1;
        if (gameIdText) {
            this.gameId = +gameIdText;
        }
        console.log(`gameId=${this.gameId}`);
    }

    preload(): void {
        console.log(`preload`);

        // 切換game
        switch (this.gameId) {
            case 1:
                this.preload_Game1();
                break;
            case 2:
                this.preload_Game2();
                break;
            default:
                console.error(`undefined, gameId=${this.gameId}`);
                break;
        }

        this.preload_Game0();
    }

    create(): void {
        console.log(`create`);

        // 切換game
        console.log(`gameId=${this.gameId}`);
        switch (this.gameId) {
            case 1:
                this.create_Game1();
                break;
            case 2:
                this.create_Game2();
                break;
            default:
                console.error(`undefined, gameId=${this.gameId}`);
                break;
        }

        this.create_Game0();
    }

    preload_Game0(): void {
        // 目錄
        try {
            this.load.image(this.btnImageKey, "assets/button1_s.png");
        } catch (e) {
            console.error(`msg=${e}`);
        }
    }
    create_Game0(): void {       // 目錄
        this.add.text(100, 50, `點擊切換`);

        const btn0 = this.add.image(100, 100, this.btnImageKey);
        btn0.setScale(0.5);
        btn0.setInteractive();
        btn0.on('pointerdown', this.onClickBtn0);
        let btnText = this.add.text(btn0.x, btn0.y, `選單`);
        btnText.setOrigin(0.5, 0.5);

        let btn = this.add.image(200, 100, this.btnImageKey);
        btn.setScale(0.5);
        btn.setInteractive();
        btn.on('pointerdown', this.onClickBtn1);
        btnText = this.add.text(btn.x, btn.y, `遊戲1`,);
        btnText.setOrigin(0.5, 0.5);

        btn = this.add.image(300, 100, this.btnImageKey);
        btn.setScale(0.5);
        btn.setInteractive();
        btn.on('pointerdown', this.onClickBtn2);
        btnText = this.add.text(btn.x, btn.y, `遊戲2`);
        btnText.setOrigin(0.5, 0.5);

        this.add.text(0, 0, `ver ${VersionText}\n`);
    }
    //#endregion base

    //#region btn
    private onClickBtn0(): void {
        console.log(`onClickBtn0`);
        window.localStorage.setItem(LSKey_GameId, `0`);
        location.reload();
    }
    private onClickBtn1(): void {
        console.log(`onClickBtn1`);
        window.localStorage.setItem(LSKey_GameId, `1`);
        location.reload();
    }
    private onClickBtn2(): void {
        console.log(`onClickBtn2`);
        window.localStorage.setItem(LSKey_GameId, `2`);
        location.reload();
    }
    //#endregion btn

    //#region game1
    preload_Game1(): void {
        this.load.image("logo", "assets/phaser3-logo.png");
        this.load.image("libs", "assets/libs.png");
        this.load.glsl("bundle", "assets/plasma-bundle.glsl.js");
        this.load.glsl("stars", "assets/starfields.glsl.js");
    }

    create_Game1(): void {
        console.log("Game1");
        // source code
        this.add.text(0, this.gameTitlePosY, 'source code: Game1，phaser3 - logo.png, plasma - bundle.glsl.js, shader(RGB Shift Field, tweens.add');

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
    //#endregion game1

    //#region game2
    preload_Game2(): void {
        this.load.image("logo", "assets/phaser3-logo.png");
    }
    create_Game2(): void {
        console.log("Game2");
        // source code
        this.add.text(0, this.gameTitlePosY, 'source code: Game2, phaser3-logo.png, tweens.add');

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
    //#endregion game2
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: "#125555",
    width: 800,
    height: 600,
    scene: Demo,
};

const game = new Phaser.Game(config);
