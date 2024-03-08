import { logger } from "./Logger"

class Pop{
    constructor(){
    }
    test(){
        console.log('modals test successful')
        logger.log('Dev Mode confirmed - modals')
    }
}

export const pop = new Pop()