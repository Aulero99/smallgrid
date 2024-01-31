import { logger } from "./Logger"

class Setter{
    setup(){
        logger.log('Setter Online')
    }
}
export const setter = new Setter()