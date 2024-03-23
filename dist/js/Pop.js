import { logger } from "./Logger"

class Pop{
    constructor(){
    }
    test(){
        console.log('pop test successful')
        logger.log('Dev Mode confirmed - pop')
    }
}

export const pop = new Pop()