import { logger } from "./Logger"

class Modals{
    constructor(){
    }
    test(){
        console.log('modals test successful')
        logger.log('Dev Mode confirmed - modals')
    }
}

export const modals = new Modals()