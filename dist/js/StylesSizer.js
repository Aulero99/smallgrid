import { logger } from "./Logger"

// NOTE 
// This is an independent file for setting the dynamic
// size for the scss to tap in to for the cvh and cvw variables
// and sets the foundation for the framework to work within


class Sizer{
 setup(){
    logger.log('Sizer Online')
    window.addEventListener('resize', this.update)
    window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
       this.update()
      });
 }
 update(){
   logger.log('Updating CSS Size')
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    const root = document.querySelector(':root')

    // @ts-ignore
    root.style.setProperty('--vh100', `${h}px`)
    // @ts-ignore
    root.style.setProperty('--vw100', `${w}px`)
 }
}

export const sizer = new Sizer()