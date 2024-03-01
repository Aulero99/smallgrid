import { logger } from "../js/Logger"

export const vars = {
    spacer:24,
    minmax:"max-width",
    xxs:576,
    xs:576,
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
        
        let prefix = getStyle('--prefix')
        let xxs = returnNumbersOnly(getStyle(`--${prefix}xxs`))
        let xs = returnNumbersOnly(getStyle(`--${prefix}xs`))
        let sm = returnNumbersOnly(getStyle(`--${prefix}sm`))
        let md = returnNumbersOnly(getStyle(`--${prefix}md`))
        let lg = returnNumbersOnly(getStyle(`--${prefix}lg`))
        let xl = returnNumbersOnly(getStyle(`--${prefix}xl`))
        let xxl = returnNumbersOnly(getStyle(`--${prefix}xxl`))
        let spacer = returnNumbersOnly(getStyle(`--${prefix}spacer`)) * returnNumbersOnly(window.getComputedStyle(document.body).fontSize)
        let minmax = getStyle(`--${prefix}minmax`)
        
        vars.xxs = xxs
        vars.xs = xs
        vars.sm = sm
        vars.md = md
        vars.lg = lg
        vars.xl = xl
        vars.xxl = xxl
        vars.spacer = spacer
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