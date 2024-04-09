/*!
  * Bootstrap Suspendors.js v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./EventSetter.js'), require('./VolSizer.js'), require('./utils/Logger.js'), require('./_variables.js'), require('./Options.js')) :
  typeof define === 'function' && define.amd ? define(['exports', './EventSetter', './VolSizer', './utils/Logger', './_variables', './Options'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Suspendors = {}, global.EventSetter, global.VolSizer, global.Logger, global._variables, global.Options));
})(this, (function (exports, EventSetter_js, VolSizer_js, Logger_js, _variables_js, Options_js) { 'use strict';

  class Suspendors {
    constructor() {
      Logger_js.logger.log('Suspendors Online');
      VolSizer_js.volSizer.setup();
      EventSetter_js.setter.setup();
    }

    // NOTE
    // These are functions that will allow for
    // manual triggers of the current breakpoint
    // or orientation that will remain consistent
    // with all listeners and registered
    // functions

    triggerAll() {
      EventSetter_js.setter.clearAllThenUpdate();
    }
    triggerOrientation() {
      EventSetter_js.setter.clearOrientThenUpdate();
    }
    triggerScreen() {
      EventSetter_js.setter.clearScreenThenUpdate();
    }

    // NOTE
    // These functions return the values of the
    // state of the breakpoints and the
    // orientation values

    returnScreen() {
      return EventSetter_js.setter.returnScreen();
    }
    returnOrientation() {
      return EventSetter_js.setter.returnOrientation();
    }
    returnVariables() {
      return _variables_js.vars;
    }
    dev() {
      Options_js.options.dev();
    }
  }
  const suspendors = new Suspendors();

  exports.suspendors = suspendors;

  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=Suspendors.js.map
