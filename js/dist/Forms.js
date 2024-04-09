/*!
  * Bootstrap Forms.js v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./utils/Logger.js')) :
  typeof define === 'function' && define.amd ? define(['exports', './utils/Logger'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Forms = {}, global.Logger));
})(this, (function (exports, Logger_js) { 'use strict';

  class Forms {
    test() {
      Logger_js.logger.log('Dev Mode confirmed - forms');
    }
  }
  const forms = new Forms();

  exports.forms = forms;

  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=Forms.js.map
