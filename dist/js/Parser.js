import { logger } from "./Logger";

    // NOTE
    // This is a file to extract the values from the variables.json file
    // which isn't implemented much at this point but opens the 
    // door for more expansion in the future

function returnNumOnly(str){
    if(typeof str != 'string'){return}
    var numsStr = str.replace(/[^0-9]/g, '');
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