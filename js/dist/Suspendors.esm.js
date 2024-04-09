/*!
  * Bootstrap Suspendors.esm.js v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./Suspendors.js'), require('./Registrar.js'), require('./Modals.js'), require('./Forms.js'), require('./Pop.js'), require('./Options.js'), require('./Loaders.js')) :
	typeof define === 'function' && define.amd ? define(['exports', './Suspendors', './Registrar', './Modals', './Forms', './Pop', './Options', './Loaders'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Suspendors = global.Suspendors || {}, global.Suspendors.esm = {}), global.Suspendors, global.Registrar, global.Modals, global.Forms, global.Pop, global.Options, global.Loaders));
})(this, (function (exports, Suspendors_js, Registrar_js, Modals_js, Forms_js, Pop_js, Options_js, Loaders_js) { 'use strict';

	Object.defineProperty(exports, 'suspendors', {
		enumerable: true,
		get: () => Suspendors_js.suspendors
	});
	Object.defineProperty(exports, 'registrar', {
		enumerable: true,
		get: () => Registrar_js.registrar
	});
	Object.defineProperty(exports, 'modal', {
		enumerable: true,
		get: () => Modals_js.modal
	});
	Object.defineProperty(exports, 'forms', {
		enumerable: true,
		get: () => Forms_js.forms
	});
	Object.defineProperty(exports, 'pop', {
		enumerable: true,
		get: () => Pop_js.pop
	});
	Object.defineProperty(exports, 'options', {
		enumerable: true,
		get: () => Options_js.options
	});
	Object.defineProperty(exports, 'loaders', {
		enumerable: true,
		get: () => Loaders_js.loaders
	});

	Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=Suspendors.esm.js.map
