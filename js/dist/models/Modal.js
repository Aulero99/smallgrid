/*!
  * Bootstrap Modal.js v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../_variables.js')) :
  typeof define === 'function' && define.amd ? define(['exports', '../_variables'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Modal = {}, global._variables));
})(this, (function (exports, _variables_js) { 'use strict';

  class Modal {
    constructor(data) {
      this.static = data.static || false;
      this.scrollable = data.scrollable || false;
      this.disableBodyScroll = data.disableBodyScroll || true;
      this.centered = data.centered || false;
      this.animation = data.animation || true;
      this.transitionTime = data.transitionTime || _variables_js.vars['modal-transition-time'] ? _variables_js.vars['modal-transition-time'] : 1;
    }
  }

  exports.Modal = Modal;

  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=Modal.js.map
