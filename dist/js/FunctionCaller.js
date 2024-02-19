import { logger } from "./Logger"

let under = []
let sm = []
let md = []
let lg = []
let xl = []
let xxl = []
let over = [] 
let landscape = []
let portrait = []


class Caller{

    setup(){
        logger.log('Function Caller Logic Online')
        window.addEventListener("tie_under", (e) => {this.trigger('under')}, false)
        window.addEventListener("tie_sm", (e) => {this.trigger('sm')}, false)
        window.addEventListener("tie_md", (e) => {this.trigger('md')}, false)
        window.addEventListener("tie_lg", (e) => {this.trigger('lg')}, false)
        window.addEventListener("tie_xl", (e) => {this.trigger('xl')}, false)
        window.addEventListener("tie_xxl", (e) => {this.trigger('xxl')}, false)
        window.addEventListener("tie_over", (e) => {this.trigger('over')}, false)
        window.addEventListener("tie_portrait", (e) => {this.trigger('portrait')}, false)
        window.addEventListener("tie_landscape", (e) => {this.trigger('landscape')}, false)
    }

    trigger(flag){
        logger.log('Triggering ' + flag)
        if(flag == 'under'){ this.runEvents(under); return; }
        if(flag == 'sm'){ this.runEvents(sm); return; }
        if(flag == 'md'){ this.runEvents(md); return; }
        if(flag == 'lg'){ this.runEvents(lg); return; }
        if(flag == 'xl'){ this.runEvents(xl); return; }
        if(flag == 'xxl'){ this.runEvents(xxl); return; }
        if(flag == 'over'){ this.runEvents(over); return; }
        if(flag == 'landscape'){ this.runEvents(landscape); return;}
        if(flag == 'portrait'){ this.runEvents(portrait); return; }
        return
    }

    runEvents(arr){
        if(arr.length < 1){ return }
        arr.forEach(e => {
            if(typeof e === 'function'){ e() }
        });
    }

    setEventFlags(fn, flag){
        if(typeof fn === 'function'){ 
            logger.log('valid function')
            if(flag == 'under'){ under.push(fn); return; }
            if(flag == 'sm'){ sm.push(fn); return; }
            if(flag == 'md'){ md.push(fn); return; }
            if(flag == 'lg'){ lg.push(fn); return; }
            if(flag == 'xl'){ xl.push(fn); return; }
            if(flag == 'xxl'){ xxl.push(fn); return; }
            if(flag == 'over'){ over.push(fn); return; }
            if(flag == 'landscape'){ landscape.push(fn); return; }
            if(flag == 'portrait'){ portrait.push(fn); return; }
            return
        }
        else{ logger.log('not a valid function') }
        return
    }

}
export const caller = new Caller()