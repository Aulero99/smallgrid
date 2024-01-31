import { logger } from "./Logger"
import variables from "../../Variables.json"
import { parser } from "./Parser";

// NOTE this file is used to set up the event callers
// which can either be listened to manually or passed 
// into in the Caller file.

const vars = parser.numbers(variables)
const dev = variables.dev

// NOTE These are the events that can be listened to
// do not change these names unless you also change 
const clip_under = new Event("clip_under")
const clip_sm = new Event("clip_sm")
const clip_md = new Event("clip_md")
const clip_lg = new Event("clip_lg")
const clip_xl = new Event("clip_xl")
const clip_xxl = new Event("clip_xxl")
const clip_over = new Event("clip_over")
const clip_portrait = new Event("clip_portrait")
const clip_landscape = new Event("clip_landscape")

function underLogic(){ window.dispatchEvent(clip_under) }
function smLogic(){ window.dispatchEvent(clip_sm) }
function mdLogic(){ window.dispatchEvent(clip_md) }
function lgLogic(){ window.dispatchEvent(clip_lg) }
function xlLogic(){ window.dispatchEvent(clip_xl) }
function xxlLogic(){ window.dispatchEvent(clip_xxl) }
function overLogic(){ window.dispatchEvent(clip_over) }
function portraitLogic(){ window.dispatchEvent(clip_portrait) }
function landscapeLogic(){ window.dispatchEvent(clip_landscape) }

function set(){
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const root = document.querySelector(':root')

    // @ts-ignore
    root.style.setProperty('--vh100', `${h}px`)
    // @ts-ignore
    root.style.setProperty('--vw100', `${w}px`)
 }

class Sizer{
 setup(){
    logger.log('Sizer Online')
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

    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

    if(w>h){
        landscapeLogic()
    }else{
        portraitLogic()
    }
    this.update()
 }
 update(){
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

    // NOTE this sets the two methods of breakpoints between bootstrap style 'screen >= breakpoint' or default 'screen <= breakpoint'
    // this can be changed by setting the minmax variable in the variables.json file to either min or max
    if(variables.minmax == 'max-width'){
        if(w <= vars.sm){ smLogic() }
        else if( w > vars.sm && w <= vars.md){ mdLogic() }
        else if(w > vars.md && w <= vars.lg){ lgLogic() }
        else if(w > vars.lg && w <= vars.xl){ xlLogic() }
        else if(w > vars.xl && w <= vars.xxl){ xxlLogic() }
        else{ overLogic() }
    }else{
        if(w < vars.sm){ underLogic() }
        else if( w >= vars.sm && w < vars.md){ smLogic() }
        else if(w >= vars.md && w < vars.lg){ mdLogic() }
        else if(w >= vars.lg && w < vars.xl){ lgLogic() }
        else if(w >= vars.xl && w < vars.xxl){ xlLogic() }
        else{ xxlLogic() }
    }
    set()
 }
}

export const sizer = new Sizer()