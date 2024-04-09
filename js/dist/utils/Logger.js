/*!
  * Bootstrap Logger.js v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../_variables.js')) :
  typeof define === 'function' && define.amd ? define(['exports', '../_variables'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Logger = {}, global._variables));
})(this, (function (exports, _variables_js) { 'use strict';

  /* eslint-disable prefer-rest-params */
  function log(type, content) {
    if (_variables_js.vars.dev) {
      // eslint-disable-next-line no-console
      console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content);
    } else {
      // eslint-disable-next-line default-case
      switch (type) {
        case 'log':
        case 'assert':
          {
            return;
          }
      }

      // eslint-disable-next-line no-warning-comments
      // TODO SEND LOGS TO EXTERNAL SERVICE
      // eslint-disable-next-line no-console
      console[type](`[${type}] :: ${new Date().toLocaleTimeString()} :: `, ...content);
    }
  }
  const logger = {
    log() {
      log('log', arguments);
    },
    error() {
      log('error', arguments);
    },
    warn() {
      log('warn', arguments);
    },
    assert() {
      log('assert', arguments);
    },
    trace() {
      log('trace', arguments);
    }
  };

  exports.logger = logger;

  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=Logger.js.map
