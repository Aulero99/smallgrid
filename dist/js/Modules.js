import { logger } from "./Logger"

const mods = new Event("tie_modules")

class Modules{
    setup(){
        logger.log('Module Logic Online')
        window.dispatchEvent(mods)
    }
}
export const modules = new Modules()