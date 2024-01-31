import { logger } from "./Logger"
import variables from "../var/Variables.json"
import { parser } from "./Parser"

    // NOTE
    // This file sets up the events and the triggers them once the screen
    // size matches the variables set up in the Variables.json file

const vars = parser.numbers(variables)

const clip_under = new Event("clip_under")
const clip_sm = new Event("clip_sm")
const clip_md = new Event("clip_md")
const clip_lg = new Event("clip_lg")
const clip_xl = new Event("clip_xl")
const clip_xxl = new Event("clip_xxl")
const clip_over = new Event("clip_over")
const clip_portrait = new Event("clip_portrait")
const clip_landscape = new Event("clip_landscape")

let orientation = null
let screen = null

function underLogic(){
    if(screen == 'under'){ return } 
    window.dispatchEvent(clip_under)
    screen = 'under'
}
function smLogic(){ 
    if(screen == 'sm'){ return } 
    window.dispatchEvent(clip_sm)
    screen = 'sm'
}
function mdLogic(){ 
    if(screen == 'md'){ return } 
    window.dispatchEvent(clip_md) 
    screen = 'md'
}
function lgLogic(){ 
    if(screen == 'lg'){ return } 
    window.dispatchEvent(clip_lg)
    screen = 'lg' 
}
function xlLogic(){ 
    if(screen == 'xl'){ return } 
    window.dispatchEvent(clip_xl) 
    screen = 'xl' 
}
function xxlLogic(){ 
    if(screen == 'xxl'){ return } 
    window.dispatchEvent(clip_xxl) 
    screen = 'xxl' 
}
function overLogic(){ 
    if(screen == 'over'){ return }
    window.dispatchEvent(clip_over)
    screen = 'over' 
}
function portraitLogic(){
    if(orientation == 'p'){ return } 
    window.dispatchEvent(clip_portrait)
    orientation = 'p' 
}
function landscapeLogic(){ 
    if(orientation == 'l'){ return }
    window.dispatchEvent(clip_landscape)
    orientation = 'l' 
}

class Setter{
    setup(){
        logger.log('Event Setter Online')
        window.addEventListener('resize', this.update)
        window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
            const portrait = e.matches;
            if (portrait) { portraitLogic() } 
            else { landscapeLogic() }
        });
    }

    update(){

            // NOTE
            // This is the final destination for all update calls in this framework
            // and can be manually triggered to check whether of not the requisite flags
            // should be triggered

        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    
        if(w>h){ landscapeLogic() }
        else{ portraitLogic() }

            // NOTE
            // This sets up a logic tree on whether or not it should act according to min-width
            // or max-width to implement over or under logic accordingly as well as to perfectly
            // match the breakpoints in the scss. By default the framework acts exactly as bootstrap
            // but can be changed by matching the variable in the variables.json and the _variables.scss
            // files to either min-width or max-width accorginly
            
            // IMPORTANT 
            // the min-width and max-width variables must match between the min-width and max-width
            // files for this framework to work
        if(variables.minmax == 'max-width'){
            if(w <= vars.sm){ smLogic(); return}
            else if( w > vars.sm && w <= vars.md){ mdLogic(); return }
            else if(w > vars.md && w <= vars.lg){ lgLogic(); return }
            else if(w > vars.lg && w <= vars.xl){ xlLogic(); return }
            else if(w > vars.xl && w <= vars.xxl){ xxlLogic(); return }
            else{ overLogic(); return }
        }else{
            if(w < vars.sm){ underLogic(); return }
            else if( w >= vars.sm && w < vars.md){ smLogic(); return }
            else if(w >= vars.md && w < vars.lg){ mdLogic(); return }
            else if(w >= vars.lg && w < vars.xl){ lgLogic(); return }
            else if(w >= vars.xl && w < vars.xxl){ xlLogic(); return }
            else{ xxlLogic(); return }
        }
     }
}
export const setter = new Setter()