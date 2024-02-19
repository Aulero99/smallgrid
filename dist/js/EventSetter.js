import { logger } from "./Logger"
import { vars } from "../var/_variables"

    // NOTE
    // This file sets up the events and the triggers them once the screen
    // size matches the variables set up in the Variables.json file

const tie_under = new Event("tie_under")
const tie_sm = new Event("tie_sm")
const tie_md = new Event("tie_md")
const tie_lg = new Event("tie_lg")
const tie_xl = new Event("tie_xl")
const tie_xxl = new Event("tie_xxl")
const tie_over = new Event("tie_over")
const tie_portrait = new Event("tie_portrait")
const tie_landscape = new Event("tie_landscape")

let orientation = null
let screen = null

function callLogic(event, title){
    if( screen == title ){ return } 
    if( orientation == title ){ return }
    if( title == 'portrait' || title == 'landscape'){
        orientation = title
    } else{
        screen = title
    }
    window.dispatchEvent(event)
}

class Setter{

    setup(){
        logger.log('Event Setter Logic Online')
        this.update()
        window.addEventListener('resize', this.update)
        window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
            const portrait = e.matches;
            if (portrait) { callLogic(tie_portrait,'portrait') } 
            else { callLogic(tie_under,'under') }
        });
    }

    update(){

            // NOTE
            // This is the final destination for all update calls in this framework
            // and can be manually triggered to check whether of not the requisite flags
            // should be triggered

        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    
        if(w>h){ callLogic(tie_landscape,'landscape') }
        else{ callLogic(tie_portrait,'portrait') }

            // NOTE
            // This sets up a logic tree on whether or not it should act according to min-width
            // or max-width to implement over or under logic accordingly as well as to perfectly
            // match the breakpoints in the scss. By default the framework acts exactly as bootstrap
            // but can be changed by matching the variable in the variables.json and the _variables.scss
            // files to either min-width or max-width accordingly
            
            // IMPORTANT 
            // the min-width and max-width variables must match between the min-width and max-width
            // files for this framework to work

        if(vars.minmax == 'max-width'){
            if(w <= vars.sm){ callLogic(tie_sm,'sm'); return}
            else if( w > vars.sm && w <= vars.md){ callLogic(tie_md,'md'); return }
            else if(w > vars.md && w <= vars.lg){ callLogic(tie_lg,'lg'); return }
            else if(w > vars.lg && w <= vars.xl){ callLogic(tie_xl,'xl'); return }
            else if(w > vars.xl && w <= vars.xxl){ callLogic(tie_xxl,'xxl'); return }
            else{ callLogic(tie_over,'over'); return }
        }else{
            if(w < vars.sm){ callLogic(tie_under,'under'); return }
            else if( w >= vars.sm && w < vars.md){ callLogic(tie_sm,'sm'); return }
            else if(w >= vars.md && w < vars.lg){ callLogic(tie_md,'md'); return }
            else if(w >= vars.lg && w < vars.xl){ callLogic(tie_lg,'lg'); return }
            else if(w >= vars.xl && w < vars.xxl){ callLogic(tie_xl,'xl'); return }
            else{ callLogic(tie_xxl,'xxl'); return }
        }
    }

        // NOTE
        // these functions are a fix to allow for the trigger to fire events by
        // clearing the variables that don't allow for the events to fire
        // before calling the update

    clearAllThenUpdate() {
        this.clearOrientThenUpdate()
        this.clearScreenThenUpdate()
    }

    clearScreenThenUpdate() {
        screen = null
        orientation = null
        this.update()
    }

    clearOrientThenUpdate() {
        screen = null
        orientation = null
        this.update()
    }

        // NOTE
        // These functions return the current state of the
        // breakpoints and orientation as strings

    returnOrientation() {
        if(!orientation){this.update()}
        return orientation
    }
    returnScreen() {
        if(!screen){this.update()}
        logger.log('The current screen is ', screen)
        return screen
    }
}
export const setter = new Setter()