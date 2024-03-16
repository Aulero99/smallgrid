import { logger } from "../js/Logger"

export const vars = {
    spacer:0,
    minmax:null,
    prefix:null,
    xxs:0,
    xs:0,
    sm:0,
    md:0,
    lg:0,
    xl:0,
    xxl:0,
    dev:false
}

const root = document.querySelector(':root')

function getStyle(name){
    let select = (root != undefined && root != null)? getComputedStyle(root) : null;
    if (select != null){
      return select.getPropertyValue(name)
    }
    else{
      return null
    }
}

function returnNumbersOnly(string){
    let output = ''
    for(let i = 0; i < string.length; i++){
        let s = string[i]
        if(!isNaN(s) || s == '.'){
            output = output + string[i]
        }else{ break }
    }
    return Number(output)
}

function getCssRoot(){
    const cssVars = Array.from(document.styleSheets)
    .filter(
      sheet =>
        sheet.href === null || sheet.href.startsWith(window.location.origin)
    )
    .reduce(
      (acc, sheet) =>
        (acc = [
          ...acc,
          ...Array.from(sheet.cssRules).reduce(
            (def, rule) =>
              (def =
                rule.selectorText === ":root"
                  ? [
                      ...def,
                      ...Array.from(rule.style).filter(name =>
                        name.startsWith("--")
                      )
                    ]
                  : def),
            []
          )
        ]),
      []
    );
    return cssVars;
}

class Options{
    importVariablesFromCss(){
        let root = getCssRoot()
        logger.log('the found root is: ', root)
        
        let prefix = getStyle('--prefix')
        vars.prefix = prefix

        for(let i = 0; i < root.length; i++){
            let key = root[i].substring(2)
            let val = getStyle(root[i])
            let set = null

            // skip if value is nulled or key is too long
            if(val.length == 0 || key.length > 14){ continue }
            // skip the prefix
            if(key === 'prefix'){ continue }
            // skip the vh100 and vw100 values, which we only need to set not get
            if(key == `${prefix}vh100` || key == `${prefix}vw100`){ continue }
            // skip the spacer, set that later
            if(key === `${prefix}spacer`){ continue }
            // skip if prefix is not detected, for the rest of the rooted variables
            if(!key.includes(prefix)){ continue }

            // set the value to a number if first digit is a number, otherwise set it as a string
            if(!isNaN(val[0])){
                set = returnNumbersOnly(val)
            }else{ set = val }

            vars[`${key.substring(prefix.length)}`] = set
        }

        // set the spacer as a result of the rem times the base px value of the font size
        const spacer = returnNumbersOnly(getStyle(`--${prefix}spacer`)) * returnNumbersOnly(window.getComputedStyle(document.body).fontSize)
        vars.spacer = spacer
        
        logger.log('The vars are now: ', vars)
        document.removeEventListener('DOMContentLoaded', options.importVariablesFromCss)
    }
    dev(){
        vars.dev = true
        logger.log('set dev mode to true')
    }
}
export const options = new Options()
document.addEventListener('DOMContentLoaded', options.importVariablesFromCss)