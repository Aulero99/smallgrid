import { logger } from "./Logger";

function returnNumOnly(string){
    var numsStr = string.replace(/[^0-9]/g, '');
    return parseInt(numsStr);
}

class Parser{
    numbers(object) {
        let output = {}
        Object.entries(object).forEach(entry => {
            const [key, value] = entry;
            output[`${key}`] = returnNumOnly(value)
          });
          logger.log(output)
          return output
    }
}
export const parser = new Parser()