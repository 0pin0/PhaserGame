import "phaser";
import myGlobalVariable from "../dist/global.js"

const VersionText = '2023/3/4 12:31';

const LSKey_TypeId = 'LSKey_TypeId';
const LSKey_GameId = 'LSKey_GameId';

export default class Demo extends Phaser.Scene {
    private readonly btnImageKey = 'btn';
    private readonly menuBtnPosY = 60;
    private readonly gameTitlePosY = 120;
    private readonly gameName2 = '建立動畫事件';
    private readonly gameName3 = '縮放鏡頭';
    private readonly gameName4 = '數學曲線';

    private typeId: number = 0;
    private gameId: number = 0;
    private gameIdTable: number[][] = [
        [],
        [1],
        [2],
        [3],
        [4],
    ];
    private typeNameList: string[] = [
        'None',
        'PhaserTS',
        `動畫`,
        `鏡頭`,
        `數學`
    ];
    private gameNameList: string[] = [
        '上一層',
        'PhaserTS',
        `${this.gameName2}`,
        `${this.gameName3}`,
        `${this.gameName4}`
    ];
    private btnList: Phaser.GameObjects.Image[] = [];

    //#region base
    constructor() {
        super("Demo");

        // 轉換GameId
        let typeIdText = window.localStorage.getItem(LSKey_TypeId);
        let gameIdText = window.localStorage.getItem(LSKey_GameId);
        console.log(`typeIdText=${typeIdText} GameIdText=${gameIdText}`);

        this.typeId = 0;
        if (typeIdText) {
            this.typeId = +typeIdText;
        }
        else {
            window.localStorage.setItem(LSKey_TypeId, `0`);
        }

        this.gameId = 0;
        if (gameIdText) {
            this.gameId = +gameIdText;
        }
        else {
            window.localStorage.setItem(LSKey_GameId, `0`);
        }

        console.log(`typeId=${this.typeId} GameId=${this.gameId}`);
    }

    preload(): void {
        console.log(`preload`);

        // 已選GAME時，切換game
        if (this.typeId > 0) {
            switch (this.gameId) {
                case 0:
                    break;
                case 1:
                    this.preload_Game1();
                    break;
                case 2:
                    this.preload_Game2();
                    break;
                case 3:
                    this.preload_Game3();
                    break;
                case 4:
                    break;
                default:
                    console.error(`undefined, GameId=${this.gameId}`);
                    break;
            }
        }

        this.preload_Menu();
    }

    create(): void {
        console.log(`create`);

        // 已選GAME時，切換game
        if (this.typeId > 0) {
            console.log(`GameId=${this.gameId}`);
            switch (this.gameId) {
                case 0:
                    break;
                case 1:
                    this.create_Game1();
                    break;
                case 2:
                    this.create_Game2();
                    break;
                case 3:
                    this.create_Game3();
                    break;
                case 4:
                    break;
                default:
                    console.error(`undefined, GameId=${this.gameId}`);
                    break;
            }
        }

        this.create_Menu();
    }

    /** 目錄 */
    preload_Menu(): void {
        try {
            this.load.image(this.btnImageKey, "assets/button1_s.png");
        } catch (e) {
            console.error(`msg=${e}`);
        }
    }
    /** 目錄 */
    create_Menu(): void {
        // 刪除舊btn
        this.btnList.forEach((btn) => {
            btn.destroy();
        });
        this.btnList.length = 0;

        this.add.text(0, 0, `ver ${VersionText}\n`);

        console.log(`typeId=${this.typeId} gameId=${this.gameId}`);

        // 目錄
        this.add.text(10, 30, `點擊切換\n t=${this.typeId} \n g=${this.gameId}`);

        // 若是未選擇type/GAME，就是顯示類型頁
        if (this.typeId === 0 && this.gameId === 0) {
            console.log(`length=${this.gameIdTable.length}`);
            for (let i = 1; i < this.gameIdTable.length; i++) {
                const text = this.typeNameList[i];
                this.addButton(i, text);
            }
        }
        // 若是有選擇type，沒選game，就是顯示上一頁/全部game
        else if (this.typeId > 0 && this.gameId === 0) {
            const gameIDList = this.gameIdTable[this.typeId];
            const endIdx = gameIDList.length;
            if (endIdx < 0) {
                console.error(`endIdx=${endIdx}`);
                return;
            }

            // 返回
            this.addButton(0, this.gameNameList[0]);

            // 分類的game按鈕
            console.log(`endIdx=${endIdx}`);
            gameIDList.forEach((gameId, index) => {
                const text = this.gameNameList[gameId];
                this.addButton(index + 1, text);
            });
            for (let i = 0; i <= endIdx; i++) {
            }
        }
        // 若是有選擇game也有選擇type，就是上一頁
        else if (this.typeId > 0 && this.gameId > 0) {
            this.addButton(0, this.gameNameList[0]);
        }
        else {
            console.error(`unknown, typeId=${this.typeId} gameId=${this.gameId}`);
        }
    }

    /** 加入按鈕
     * @param i 索引
     * @param text 文字
     */
    private addButton(i: number, text: string): void {
        const btn = this.add.image(120 + 80 * i, this.menuBtnPosY, this.btnImageKey);
        btn.setScale(0.5);
        btn.setInteractive();
        btn.on('pointerup', () => { this.onClickBtn(i) });

        this.btnList.push(btn);

        const btnText = this.add.text(btn.x, btn.y, text);
        btnText.setOrigin(0.5, 0.5);
    }
    //#endregion base

    //#region btn
    private onClickBtn(index: number): void {
        console.log(`onClickBtn=${index} typeId=${this.typeId} gameId=${this.gameId}`);

        // 若是未選擇type
        if (this.typeId === 0) {
            // 若是未選擇game，就設定type清除game，並顯示game目錄
            if (this.typeId === 0 && this.gameId === 0) {
                this.typeId = index;
                window.localStorage.setItem(LSKey_TypeId, `${this.typeId}`);
                this.gameId = 0;
                window.localStorage.setItem(LSKey_GameId, `${this.gameId}`);
                console.log(`onClickBtn=${index} typeId=${this.typeId} gameId=${this.gameId}`);
                // 重新載入網頁
                location.reload();
            }
            else {
                console.error(`unknown, typeId=${this.typeId} gameId=${this.gameId}`);
            }
        }
        // 若是有選擇type
        else if (this.typeId > 0) {
            // 若按返回鈕，就清除gameId
            if (index === 0) {
                this.typeId = 0;
                window.localStorage.setItem(LSKey_TypeId, `${this.typeId}`);
                this.gameId = 0;
                window.localStorage.setItem(LSKey_GameId, `${this.gameId}`);
                console.log(`onClickBtn=${index} typeId=${this.typeId} gameId=${this.gameId}`);
                // 重新載入網頁
                location.reload();
            }
            // 若沒選game, 且按game鈕，就設定game
            else if (this.gameId === 0 && index > 0) {
                this.gameId = this.gameIdTable[this.typeId][index - 1];
                window.localStorage.setItem(LSKey_GameId, `${this.gameId}`);
                console.log(`onClickBtn=${index} typeId=${this.typeId} gameId=${this.gameId}`);
                // 重新載入網頁
                location.reload();
            }
            else {
                console.error(`unknown, typeId=${this.typeId} gameId=${this.gameId}`);
            }
        }
        else {
            console.error(`unknown, typeId=${this.typeId} gameId=${this.gameId}`);
        }
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
            switch (this.gemIdx) {
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
            this.gemIdx++;
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

    //#region game3
    //  Sphinx
    public readonly location1 = new Phaser.Math.Vector2(766, 1090);
    //  Oasis
    public readonly location2 = new Phaser.Math.Vector2(225, 1552);
    //  Tomb
    public readonly location3 = new Phaser.Math.Vector2(700, 1592);
    //  City Gates
    public readonly location4 = new Phaser.Math.Vector2(323, 480);
    //  Chair
    public readonly location5 = new Phaser.Math.Vector2(593, 274);
    //  River Hormuz
    public readonly location6 = new Phaser.Math.Vector2(180, 1087);
    //  Guard Outpost
    public readonly location7 = new Phaser.Math.Vector2(168, 163);
    preload_Game3(): void {
        this.load.image('map', 'assets/camera/earthbound-scarab.png');
    }
    create_Game3(): void {
        this.cameras.main.setBounds(0, 0, 1024, 2048);

        this.add.image(0, 0, 'map').setOrigin(0);

        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(0, 0);

        var pos = 1;

        this.input.on('pointerdown', function () {

            var cam = this.cameras.main;
            var location = this['location' + pos];
            var rndZoom = Phaser.Math.FloatBetween(0.5, 4);

            cam.pan(location.x, location.y, 3000, 'Sine.easeInOut');
            cam.zoomTo(rndZoom, 3000);

            pos++;

            if (pos === 8) {
                pos = 1;
            }


        }, this);

        this.scene.launch('UIScene');
    }
    //#endregion game3
}

//#region game3
class UIScene extends Phaser.Scene {
    private mapScene: Demo;
    private mapCamera: Phaser.Cameras.Scene2D.Camera;

    private graphics: Phaser.GameObjects.Graphics;

    private tooltip1: Phaser.GameObjects.Text;
    private tooltip2: Phaser.GameObjects.Text;
    private tooltip3: Phaser.GameObjects.Text;
    private tooltip4: Phaser.GameObjects.Text;
    private tooltip5: Phaser.GameObjects.Text;
    private tooltip6: Phaser.GameObjects.Text;
    private tooltip7: Phaser.GameObjects.Text;

    constructor() {
        super('UIScene');
    }

    create() {
        this.mapScene = this.scene.get('Demo') as Demo;

        this.mapCamera = this.mapScene.cameras.main;

        this.graphics = this.add.graphics();

        this.tooltip1 = this.add.text(0, 0, 'Sphinx');
        this.tooltip2 = this.add.text(0, 0, 'Oasis');
        this.tooltip3 = this.add.text(0, 0, 'Tomb of Ket');
        this.tooltip4 = this.add.text(0, 0, 'City Gates');
        this.tooltip5 = this.add.text(0, 0, 'Rest Easy');
        this.tooltip6 = this.add.text(0, 0, 'River Hormuz');
        this.tooltip7 = this.add.text(0, 0, 'Guard Outpost');
    }

    update() {
        this.graphics.clear();

        this.updateToolTip(this.mapScene.location1, this.tooltip1);
        this.updateToolTip(this.mapScene.location2, this.tooltip2);
        this.updateToolTip(this.mapScene.location3, this.tooltip3);
        this.updateToolTip(this.mapScene.location4, this.tooltip4);
        this.updateToolTip(this.mapScene.location5, this.tooltip5);
        this.updateToolTip(this.mapScene.location6, this.tooltip6);
        this.updateToolTip(this.mapScene.location7, this.tooltip7);
    }

    updateToolTip(source, tooltip) {
        var basePosition = source;
        var camera = this.mapCamera;

        //  The marker point
        var x = (basePosition.x - camera.worldView.x) * camera.zoom;
        var y = (basePosition.y - camera.worldView.y) * camera.zoom;

        var graphics = this.graphics;

        graphics.fillStyle(0x000000, 0.8);
        graphics.lineStyle(4, 0x000000, 0.8);

        //  The text is above this point
        var width = tooltip.width + 32;
        var height = tooltip.height + 32;

        var bx = x - width / 2;
        var by = y - (height + 32);

        graphics.fillRect(bx, by, width, height);

        tooltip.x = bx + 16;
        tooltip.y = by + 16;

        graphics.lineBetween(bx + 16, by + height, x, y);
    }
}
//#endregion game3

//#region game4
// dwitter globals

var c;
var x;
var math_I;
var q;

let tin: number = 0;
let frame: number = 0;

var S = Math.sin;
var C = Math.cos;
var T = Math.tan;

function R(r, g, b, a) {
    a = a === undefined ? 1 : a;

    return "rgba(" + (r | 0) + "," + (g | 0) + "," + (b | 0) + "," + a + ")";
};

// https://www.dwitter.net/d/5446
function u(t) {
    c.width |= math_I = 300
    x.lineWidth = .1
    while (--math_I) q = 19 + S(t / 6) / 28 * math_I, x.arc(S(q / 3) * math_I + q * 60, (C(q * S(t / 2)) + 4) * math_I / 2 + 200, (C(q) * 60 + 200) * S(math_I / 96), 0, 7)
    x.stroke()
}

function create() {
    var canvasTexture = this.textures.createCanvas('dwitter', 1920, 1080);

    c = canvasTexture.getSourceImage();
    x = c.getContext('2d');

    this.add.image(0, 0, 'dwitter').setOrigin(0).setScale(0.5);
}

function update() {
    tin = frame / 60;

    if ((tin * 60 | 0) == frame - 1) {
        tin += 0.000001;
    }

    frame++;

    u(tin);
}
//#endregion game4

let config;
const checkGameId = + window.localStorage.getItem(LSKey_GameId);
console.log(`checkGameId=${checkGameId}`);
switch (checkGameId) {
    case 3:
        config = {
            type: Phaser.AUTO,
            backgroundColor: "#125555",
            width: 800,
            height: 600,
            scene: [Demo, UIScene]
        };
        break;
    case 4:
        config = {
            type: Phaser.CANVAS,
            backgroundColor: "#125555",
            width: 800,
            height: 600,
            scene: {
                create: create,
                update: update
            }
        };
        window.localStorage.setItem(LSKey_TypeId, '0');
        window.localStorage.setItem(LSKey_GameId, '0');
        break;

    default:
        config = {
            type: Phaser.AUTO,
            backgroundColor: "#125555",
            width: 800,
            height: 600,
            scene: [Demo],
        };
        break;
}

const game = new Phaser.Game(config);
