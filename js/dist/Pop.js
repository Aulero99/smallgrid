/*!
  * Bootstrap Pop.js v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./utils/Logger.js')) :
  typeof define === 'function' && define.amd ? define(['exports', './utils/Logger'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Pop = {}, global.Logger));
})(this, (function (exports, Logger_js) { 'use strict';

  class Pop {
    test() {
      Logger_js.logger.log('Dev Mode confirmed - pop');
    }
  }
  const pop = new Pop();

  exports.pop = pop;

  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=Pop.js.map
