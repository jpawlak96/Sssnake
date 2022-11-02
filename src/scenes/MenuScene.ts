import { Application, BitmapText, Container } from "pixi.js";
import { IScene } from "../managers/IScene";
import { Manager } from "../managers/Manager";
import { GameScene } from "./GameScene";

export class MenuScene extends Container implements IScene {
    app: Application;

    startPrompt: BitmapText;
    scaleVelocity: number = 0.008;
    deltaCounter: number = 0;
    tickTime: number = 0.5;

    constructor(app: Application) {
        super();
        this.app = app

        this.startPrompt = new BitmapText("Press any key to start", { fontName: "comic 32" });
        this.startPrompt.anchor.set(0.5);
        this.startPrompt.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        this.addChild(this.startPrompt);

        document.addEventListener("keydown", () => Manager.changeScene(GameScene), { once: true });
    }

    update(): void {
        this.deltaCounter += this.app.ticker.elapsedMS / 1000;
        if (this.deltaCounter > this.tickTime) {
            this.scaleVelocity *= -1;
            this.deltaCounter -= this.tickTime;
        }
        const currentScale = this.startPrompt.scale.x + this.scaleVelocity * this.deltaCounter;
        this.startPrompt.scale.set(currentScale);
    }
}