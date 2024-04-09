/*!
  * Bootstrap VolSizer.js v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./utils/Logger.js'), require('./_variables.js')) :
  typeof define === 'function' && define.amd ? define(['exports', './utils/Logger', './_variables'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VolSizer = {}, global.Logger, global._variables));
})(this, (function (exports, Logger_js, _variables_js) { 'use strict';

  // NOTE
  // This is an independent file for setting the dynamic
  // size for the scss to tap in to for the cvh and cvw variables
  // and sets the foundation for the framework to work within

  let dynamicWidth = null;
  let dynamicHeight = null;
  class VolSizer {
    setup() {
      Logger_js.logger.log('Sizer Logic Online');
      window.addEventListener('resize', this.update);
      window.matchMedia('(orientation: portrait)').addEventListener('change', () => {
        this.update();
      });
    }
    update() {
      // logger.log('Updating CSS Size')
      const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

      // NOTE
      // This check stops the update if the browser is mobile, the screen size is below
      // the md breakpoint and if the width has not changed. This makes it so that
      // a change to the viewport size, like navigation sliding on or off the screen
      // will not cause the page to jump drastically. Solutions to completely eliminate jumps
      // at higher scroll speeds are still being tested, but this works seamlessly on at least 80% of
      // devices at low to md scroll speeds, with only the highest scroll speeds causing visual
      // glitches at infrequent intervals and mostly on a scroll up action.

      if (h < dynamicHeight && w === dynamicWidth && w <= _variables_js.vars.lg) {
        return;
      }
      dynamicWidth = w;
      dynamicHeight = h;
      const root = document.querySelector(':root');
      const {
        prefix
      } = _variables_js.vars;
      // @ts-ignore
      root.style.setProperty(`--${prefix}vh100`, `${h}px`);
      // @ts-ignore
      root.style.setProperty(`--${prefix}vw100`, `${w}px`);
    }
  }
  const volSizer = new VolSizer();

  exports.volSizer = volSizer;

  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=VolSizer.js.map
