import { logger } from "./Logger"
import variables from "../Variables.json"
import { parser } from "./Parser";

const vars = parser.numbers(variables)

function underLogic(){
    logger.log('under sm breakpoint')
}

function smLogic(){
    logger.log('on sm breakpoint')
}

function mdLogic(){
    logger.log('on md breakpoint')
}

function lgLogic(){
    logger.log('on lg breakpoint')
}

function xlLogic(){
    logger.log('on xl breakpoint')
}

function xxlLogic(){
    logger.log('on xxl breakpoint')
}

function overLogic(){
    logger.log('over breakpoints')
}

function portraitLogic(){
    logger.log('detected portrait')
}

function landscapeLogic(){
    logger.log('detected landscape')
}

function set(){
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const root = document.querySelector(':root')

    // @ts-ignore
    root.style.setProperty('--vh100', `${h}px`)
    // @ts-ignore
    root.style.setProperty('--vw100', `${w}px`)

    logger.log('setting static view params - ','height:',h,'width:',w)
 }

class Sizer{
 setup(){
    window.addEventListener('resize', this.update)
    window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
        const portrait = e.matches;
    
        if (portrait) {
            portraitLogic()
            set()
        } else {
            landscapeLogic()
            set()
        }
    });
    this.update()
 }
 update(){
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    // NOTE this sets the two methods of breakpoints between bootstrap style 'screen >= breakpoint' or default 'screen <= breakpoint'
    // this can be changed by setting the minmax variable in the variables.json file to either min or max
    if(variables.minmax == 'max-width'){
        if(w <= vars.sm){
            smLogic()
        }else if( w > vars.sm && w <= vars.md){
            mdLogic()
        }else if(w > vars.md && w <= vars.lg){
            lgLogic()
        }else if(w > vars.lg && w <= vars.xl){
            xlLogic()
        }else if(w > vars.xl && w <= vars.xxl){
            xxlLogic()
        }else{
            overLogic()
        }
    }else{
        if(w < vars.sm){
            underLogic()
        }else if( w >= vars.sm && w < vars.md){
            smLogic()
        }else if(w >= vars.md && w < vars.lg){
            mdLogic()
        }else if(w >= vars.lg && w < vars.xl){
            lgLogic()
        }else if(w >= vars.xl && w < vars.xxl){
            xlLogic()
        }else{
            xxlLogic()
        }
    }
    set()
 }
 
}

export const sizer = new Sizer()