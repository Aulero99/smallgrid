import { logger } from "../js/Logger"

export const vars = {
    gutter:24,
    minmax:"max-width",
    sm:576,
    md:768,
    lg:992,
    xl:1200,
    xxl:1400,
    dev:true
}

const root = document.querySelector(':root')

let override = false

function getStyle(name){
    let select = getComputedStyle(root)
    return select.getPropertyValue(name)
}

function returnNumbersOnly(string){
    let output = ''
    for(let i = 0; i < string.length; i++){
        let s = string[i]
        if(!isNaN(s) || s == '.'){
            output = output + string[i]
        }else{ break }
    }
    return output
}

class Options{
    constructor(){
    }
    importVariablesFromCss(){
        if(override){ return }
        logger.log('The defaults set are: ', vars)
        
        let sm = returnNumbersOnly(getStyle('--sm'))
        let md = returnNumbersOnly(getStyle('--md'))
        let lg = returnNumbersOnly(getStyle('--lg'))
        let xl = returnNumbersOnly(getStyle('--xl'))
        let xxl = returnNumbersOnly(getStyle('--xxl'))
        let gutter = returnNumbersOnly(getStyle('--gutter')) * returnNumbersOnly(window.getComputedStyle(document.body).fontSize)
        let minmax = getStyle('--minmax')
        
        vars.sm = sm
        vars.md = md
        vars.lg = lg
        vars.xl = xl
        vars.xxl = xxl
        vars.gutter = gutter
        vars.minmax = minmax
        
        logger.log('The vars are now: ', vars)
        document.removeEventListener('DOMContentLoaded', options.importVariablesFromCss)
    }
    dev(){
        console.log('setting dev mode to true')
        vars.dev = true
    }
    overrideVars(obj){
        override = true
        vars.sm = obj.sm
        vars.md = obj.md
        vars.lg = obj.lg
        vars.xl = obj.xl
        vars.xxl = obj.xxl
        vars.gutter = obj.gutter
        vars.minmax = obj.minmax
    }
}
export const options = new Options()
document.addEventListener('DOMContentLoaded', options.importVariablesFromCss)