import { logger } from "./Logger"
import variables from "../../Variables.json"
import { parser } from "./Parser";

const vars = parser.numbers(variables)
const dev = variables.dev
const under = new Event("under")
const sm = new Event("sm")
const md = new Event("md")
const lg = new Event("lg")
const xl = new Event("xl")
const xxl = new Event("xxl")
const over = new Event("over")
const portrait = new Event("portrait")
const landscape = new Event("landscape")

function underLogic(){ window.dispatchEvent(under) }
function smLogic(){ window.dispatchEvent(sm) }
function mdLogic(){ window.dispatchEvent(md) }
function lgLogic(){ window.dispatchEvent(lg) }
function xlLogic(){ window.dispatchEvent(xl) }
function xxlLogic(){ window.dispatchEvent(xxl) }
function overLogic(){ window.dispatchEvent(over) }
function portraitLogic(){ window.dispatchEvent(portrait) }
function landscapeLogic(){ window.dispatchEvent(landscape) }

function listen(){
    logger.log('Listening for size events')
    window.addEventListener("under", (e) => {logger.log('under sm breakpoint')}, false)
    window.addEventListener("sm", (e) => {logger.log('on sm breakpoint')}, false)
    window.addEventListener("md", (e) => {logger.log('on md breakpoint')}, false)
    window.addEventListener("lg", (e) => {logger.log('on lg breakpoint')}, false)
    window.addEventListener("xl", (e) => {logger.log('on xl breakpoint')}, false)
    window.addEventListener("xxl", (e) => {logger.log('on xxl breakpoint')}, false)
    window.addEventListener("over", (e) => {logger.log('over xxl breakpoint')}, false)
    window.addEventListener("portrait", (e) => {logger.log('detected portrait')}, false)
    window.addEventListener("landscape", (e) => {logger.log('detected landscape')}, false)
}

function set(){
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const root = document.querySelector(':root')
    logger.log("the vars are:", vars)

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

// NOTE this is a simple dev check that allows the user to see if the events are emitting properly
if(dev){listen()}
