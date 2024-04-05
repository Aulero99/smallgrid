import { logger } from "./Logger"

class Modal{
    constructor(){
    }
    test(){
        console.log('modals test successful')
        logger.log('Dev Mode confirmed - modals')
    }
}

export const modal = new Modal()