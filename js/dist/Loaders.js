/*!
  * Bootstrap Loaders.js v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Loaders = {}));
})(this, (function (exports) { 'use strict';

  class Loaders {
    loadAllImg() {
      Array.prototype.forEach.call(document.querySelectorAll('img[data-src]'), img => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.addEventListener('load', () => {
          img.removeAttribute('data-src');
        });
      });
    }
    loadAllImgInId(id) {
      Array.prototype.forEach.call(document.getElementById(id).querySelectorAll('img[data-src]'), img => {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.addEventListener('load', () => {
          img.removeAttribute('data-src');
        });
      });
    }
  }
  const loaders = new Loaders();

  exports.loaders = loaders;

  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=Loaders.js.map
