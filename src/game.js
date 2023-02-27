"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("phaser");
var Demo = /** @class */ (function (_super) {
    __extends(Demo, _super);
    function Demo() {
        var _this = _super.call(this, "demo") || this;
        _this.isGame1 = Math.random() > 0.5;
        return _this;
    }
    Demo.prototype.preload = function () {
        if (this.isGame1) {
            this.preload_Game1();
        }
        else {
            this.preload_Game2();
        }
    };
    Demo.prototype.create = function () {
        if (this.isGame1) {
            this.create_Game1();
        }
        else {
            this.create_Game2();
        }
    };
    Demo.prototype.preload_Game1 = function () {
        this.load.image("logo", "assets/phaser3-logo.png");
        this.load.image("libs", "assets/libs.png");
        this.load.glsl("bundle", "assets/plasma-bundle.glsl.js");
        this.load.glsl("stars", "assets/starfields.glsl.js");
    };
    Demo.prototype.create_Game1 = function () {
        console.log("Game1");
        this.add.shader("RGB Shift Field", 0, 0, 800, 600).setOrigin(0);
        this.add.shader("Plasma", 0, 412, 800, 172).setOrigin(0);
        this.add.image(400, 300, "libs");
        var logo = this.add.image(400, 70, "logo");
        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 1500,
            ease: "Sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    };
    Demo.prototype.preload_Game2 = function () {
        this.load.image("logo", "assets/phaser3-logo.png");
    };
    Demo.prototype.create_Game2 = function () {
        console.log("Game2");
        var logo = this.add.image(400, 70, "logo");
        this.tweens.add({
            targets: logo,
            y: 350,
            duration: 1500,
            ease: "Sine.inOut",
            yoyo: true,
            repeat: -1,
        });
    };
    return Demo;
}(Phaser.Scene));
exports.default = Demo;
var config = {
    type: Phaser.AUTO,
    backgroundColor: "#125555",
    width: 800,
    height: 600,
    scene: Demo,
};
var game = new Phaser.Game(config);
