import { SCREEN_SIZE, BACKGROUND_COLOR } from './Constants'
import { Manager } from './Manager'
import { LoaderScene } from './scenes/LoaderScene'
import { registerPixiInspector } from './Utils'

registerPixiInspector()

Manager.initialize(SCREEN_SIZE, SCREEN_SIZE, BACKGROUND_COLOR)
Manager.changeScene(LoaderScene)
