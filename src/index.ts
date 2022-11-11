import { utils } from 'pixi.js'
import { SCREEN_SIZE, BACKGROUND_COLOR } from './Constants'
import { KeyInput } from './inputs/KeyInput'
import { SwipeInput } from './inputs/SwipeInput'
import { Manager } from './Manager'
import { LoaderScene } from './scenes/LoaderScene'
import { registerPixiInspector } from './Utils'

registerPixiInspector()

const input = utils.isMobile.any ? new SwipeInput() : new KeyInput()

Manager.initialize(SCREEN_SIZE, SCREEN_SIZE, BACKGROUND_COLOR, input)
Manager.changeScene(LoaderScene)
