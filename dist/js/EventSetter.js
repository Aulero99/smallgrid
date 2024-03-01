import { logger } from "./Logger"
import { vars } from "../var/_variables"

    // NOTE
    // This file sets up the events and the triggers them once the screen
    // size matches the variables set up in the Variables.json file

const under = new Event("under")
const xxs = new Event("xxs")
const xs = new Event("xs")
const sm = new Event("sm")
const md = new Event("md")
const lg = new Event("lg")
const xl = new Event("xl")
const xxl = new Event("xxl")
const over = new Event("over")
const portrait = new Event("portrait")
const landscape = new Event("landscape")

let orientation = null
let screen = null
let loaded = false

function callScreen(event, title){
    if( screen == title ){ return } 
    screen = title
    if(!loaded){ return }
    window.dispatchEvent(event)
}

function callOrient(event, title){
    if( orientation == title ){ return }
    orientation = title
    if(!loaded){ return }
    window.dispatchEvent(event)
}

function loadingCheck(){
    if(loaded){ return }
    loaded = true
    screen = null
    orientation = null
    document.removeEventListener('DOMContentLoaded', setter.loadFlip)
    setter.update()
}

class Setter{

    setup(){
        logger.log('Event Setter Logic Online')
        document.addEventListener('DOMContentLoaded', setter.loadFlip)
        window.addEventListener('resize', this.update)
        window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
            this.update()
        });
        this.update()
    }

    loadFlip(){ loadingCheck() }

    update(){
            // NOTE
            // This is the final destination for all update calls in this framework
            // and can be manually triggered to check whether of not the requisite flags
            // should be triggered

        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    
        if(w>h){ callOrient(landscape,'landscape') }
        else{ callOrient(portrait,'portrait') }

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
            if(w <= vars.xxs){ callScreen(xxs,'xxs'); return}
            else if( w > vars.xxs && w <= vars.xs){ callScreen(xs,'xs'); return }
            else if( w > vars.xs && w <= vars.sm){ callScreen(sm,'sm'); return }
            else if( w > vars.sm && w <= vars.md){ callScreen(md,'md'); return }
            else if(w > vars.md && w <= vars.lg){ callScreen(lg,'lg'); return }
            else if(w > vars.lg && w <= vars.xl){ callScreen(xl,'xl'); return }
            else if(w > vars.xl && w <= vars.xxl){ callScreen(xxl,'xxl'); return }
            else{ callScreen(over,'over'); return }
        }else{
            if(w < vars.xxs){ callScreen(under,'under'); return }
            else if( w >= vars.xxs && w < vars.xs){ callScreen(xxs,'xxs'); return }
            else if( w >= vars.xs && w < vars.sm){ callScreen(xs,'xs'); return }
            else if( w >= vars.sm && w < vars.md){ callScreen(sm,'sm'); return }
            else if(w >= vars.md && w < vars.lg){ callScreen(md,'md'); return }
            else if(w >= vars.lg && w < vars.xl){ callScreen(lg,'lg'); return }
            else if(w >= vars.xl && w < vars.xxl){ callScreen(xl,'xl'); return }
            else{ callScreen(xxl,'xxl'); return }
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
        logger.log('The current orientation is ', orientation)
        return orientation
    }
    returnScreen() {
        if(!screen){this.update()}
        logger.log('The current screen is ', screen)
        return screen
    }
}

export const setter = new Setter()