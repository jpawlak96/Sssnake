import { Application } from "@pixi/app";
import { IScene } from "./IScene";

export class Manager {
    private constructor() {}

    private static app: Application;
    private static currentScene: IScene;

    public static initialize(width: number, height: number, background: number): void {
        
        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: width,
            height: height
        });

        Manager.app.ticker.add(Manager.update)
    }

    public static changeScene(clazz: new (identifier: Application) => IScene): void {
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        Manager.currentScene = new clazz(this.app);
        Manager.app.stage.addChild(Manager.currentScene);
    }

    private static update(framesPassed: number): void {
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }
    }
}