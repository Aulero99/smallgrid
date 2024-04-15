import { logger } from './utils/Logger.js'
import { vars } from './utils/_variables.js'

// NOTE
// This is an independent file for setting the dynamic
// size for the scss to tap in to for the cvh and cvw variables
// and sets the foundation for the framework to work within

let dynamicWidth = null
let dynamicHeight = null

class VolSizer {
  setup() {
    logger.log('Sizer Logic Online')
    window.addEventListener('resize', this.update)
    window.matchMedia('(orientation: portrait)').addEventListener('change', () => {
      this.update()
    })
  }

  update() {
    // logger.log('Updating CSS Size')
    const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

    // NOTE
    // This check stops the update if the browser is mobile, the screen size is below
    // the md breakpoint and if the width has not changed. This makes it so that
    // a change to the viewport size, like navigation sliding on or off the screen
    // will not cause the page to jump drastically. Solutions to completely eliminate jumps
    // at higher scroll speeds are still being tested, but this works seamlessly on at least 80% of
    // devices at low to md scroll speeds, with only the highest scroll speeds causing visual
    // glitches at infrequent intervals and mostly on a scroll up action.

    if (h < dynamicHeight && w === dynamicWidth && w <= vars.lg) {
      return
    }

    dynamicWidth = w
    dynamicHeight = h

    const root = document.querySelector(':root')
    const { prefix } = vars
    // @ts-ignore
    root.style.setProperty(`--${prefix}vh100`, `${h}px`)
    // @ts-ignore
    root.style.setProperty(`--${prefix}vw100`, `${w}px`)
  }
}

export const volSizer = new VolSizer()
