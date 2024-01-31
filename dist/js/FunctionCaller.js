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
        logger.log('Caller Online')
        window.addEventListener("clip_under", (e) => {this.trigger('under')}, false)
        window.addEventListener("clip_sm", (e) => {this.trigger('sm')}, false)
        window.addEventListener("clip_md", (e) => {this.trigger('md')}, false)
        window.addEventListener("clip_lg", (e) => {this.trigger('lg')}, false)
        window.addEventListener("clip_xl", (e) => {this.trigger('xl')}, false)
        window.addEventListener("clip_xxl", (e) => {this.trigger('xxl')}, false)
        window.addEventListener("clip_over", (e) => {this.trigger('over')}, false)
        window.addEventListener("clip_portrait", (e) => {this.trigger('portrait')}, false)
        window.addEventListener("clip_landscape", (e) => {this.trigger('landscape')}, false)
    }

    trigger(flag){
        logger.log('Triggering ' + flag)
        if(flag == 'under'){ this.runEvents(under) }
        if(flag == 'sm'){ this.runEvents(sm) }
        if(flag == 'md'){ this.runEvents(md) }
        if(flag == 'lg'){ this.runEvents(lg) }
        if(flag == 'xl'){ this.runEvents(xl) }
        if(flag == 'xxl'){ this.runEvents(xxl) }
        if(flag == 'over'){ this.runEvents(over) }
        if(flag == 'landscape'){ this.runEvents(landscape) }
        if(flag == 'portrait'){ this.runEvents(portrait) }
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
            if(flag == 'under'){ under.push(fn); return }
            if(flag == 'sm'){ sm.push(fn); return }
            if(flag == 'md'){ md.push(fn); return }
            if(flag == 'lg'){ lg.push(fn); return }
            if(flag == 'xl'){ xl.push(fn); return }
            if(flag == 'xxl'){ xxl.push(fn); return }
            if(flag == 'over'){ over.push(fn); return }
            if(flag == 'landscape'){ landscape.push(fn); return }
            if(flag == 'portrait'){ portrait.push(fn); return }
            return
        }
        else{ logger.log('not a valid function') }
        return
    }

}
export const caller = new Caller()