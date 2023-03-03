import "phaser";
import myGlobalVariable from "../dist/global.js"

const VersionText = '2023/3/3 07:29';

const LSKey_GameId = 'LSKey_GameID';

export default class Demo extends Phaser.Scene {
    private readonly btnImageKey = 'btn';
    private readonly menuBtnPosY = 60;
    private readonly gameTitlePosY = 120;
    private readonly maxGameId = 2;

    private gameId: number = 0;
    private readonly gameName2 = '建立動畫事件';
    private gameNameList: string[] = [
        '目錄',
        'PhaserTS',
        `${this.gameName2}`
    ];

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
    create_Game0(): void {
        this.add.text(0, 0, `ver ${VersionText}\n`);

        // 目錄
        this.add.text(10, 30, `點擊切換`);

        // 目錄會顯示全部game，非目錄的只show目綠鈕
        const maxId = this.gameId > 0 ? 0 : this.maxGameId;

        for (let i = 0; i <= maxId; i++) {
            const btn = this.add.image(120 + 80 * i, this.menuBtnPosY, this.btnImageKey);
            btn.setScale(0.5);
            btn.setInteractive();
            btn.on('pointerdown', () => { this.onClickBtn(i) });

            const text = this.gameNameList[i];
            const btnText = this.add.text(btn.x, btn.y, text);
            btnText.setOrigin(0.5, 0.5);
        }
    }
    //#endregion base

    //#region btn
    private onClickBtn(index: number): void {
        console.log(`onClickBtn${index}`);
        window.localStorage.setItem(LSKey_GameId, `${index}`);
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

        // version
        this.add.text(0, this.gameTitlePosY, 'source code: Game1，phaser3 - logo.png, plasma - bundle.glsl.js, shader(RGB Shift Field, tweens.add');
    }

    //#endregion game1

    //#region game2
    private gemPosY: number;
    private gemIdx: number;
    preload_Game2(): void {
        // 載入atlas(png/json)
        this.load.atlas('gems', 'assets/columns/gems.png', 'assets/columns/gems.json');
        // Local variable
        this.gemPosY = 160;
    }
    create_Game2(): void {
        // 提示字
        this.add.text(400, 32, 'Click to create animations', { color: '#00ff00' })
            .setOrigin(0.5, 0);

        // 綁動畫建立event，建立時通知刷新
        //  Each time a new animation is added to the Animation Manager we'll call this function
        this.anims.on(Phaser.Animations.Events.ADD_ANIMATION, this.addAnimation, this);

        this.gemIdx = 0;

        // 點擊畫面，建立動畫
        //  Click to add an animation
        this.input.on('pointerup', function () {
            switch (this.i) {
                case 0:
                    this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 });
                    break;
                case 1:
                    this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 });
                    break;
                case 2:
                    this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 });
                    break;
                case 3:
                    this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 });
                    break;
            }
            this.i++;
        }, this);

        // version
        this.add.text(0, this.gameTitlePosY, `${this.gameName2}, gems.png, gems.json, anims.create, generateFrameNames`);
    }
    /** 建立動畫子元件 */
    addAnimation(key: string) {
        this.add.sprite(400, this.gemPosY, 'gems')
            .play(key);
        this.gemPosY += 100;
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
