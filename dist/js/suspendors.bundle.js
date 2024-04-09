/*!
  * Bootstrap v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.suspendors = factory());
})(this, (function () { 'use strict';

  const vars = {
    spacer: 0,
    minmax: null,
    prefix: null,
    xxs: 0,
    xs: 0,
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
    xxl: 0,
    dev: false,
    'modal-transition-time': null
  };

  /* eslint-disable prefer-rest-params */
  function log(type, content) {
    if (vars.dev) {
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

  // NOTE
  // This file sets up the events and the triggers them once the screen
  // size matches the variables set up in the Variables.json file

  const under$1 = new Event('under');
  const xxs = new Event('xxs');
  const xs = new Event('xs');
  const sm$1 = new Event('sm');
  const md$1 = new Event('md');
  const lg$1 = new Event('lg');
  const xl$1 = new Event('xl');
  const xxl$1 = new Event('xxl');
  const over$1 = new Event('over');
  const portrait$1 = new Event('portrait');
  const landscape$1 = new Event('landscape');
  let orientation = null;
  let screen = null;
  let loaded = false;
  function callScreen(event, title) {
    if (screen === title) {
      return;
    }
    screen = title;
    if (!loaded) {
      return;
    }
    window.dispatchEvent(event);
  }
  function callOrient(event, title) {
    if (orientation === title) {
      return;
    }
    orientation = title;
    if (!loaded) {
      return;
    }
    window.dispatchEvent(event);
  }
  function loadingCheck() {
    if (loaded) {
      return;
    }
    loaded = true;
    screen = null;
    orientation = null;
    document.removeEventListener('DOMContentLoaded', setter.loadFlip);
    setter.update();
  }
  class Setter {
    setup() {
      logger.log('Event Setter Logic Online');
      document.addEventListener('DOMContentLoaded', setter.loadFlip);
      window.addEventListener('resize', this.update);
      window.matchMedia('(orientation: portrait)').addEventListener('change', () => {
        this.update();
      });
      this.update();
    }
    loadFlip() {
      loadingCheck();
    }

    // eslint-disable-next-line complexity
    update() {
      // NOTE
      // This is the final destination for all update calls in this framework
      // and can be manually triggered to check whether of not the requisite flags
      // should be triggered

      const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      if (w > h) {
        callOrient(landscape$1, 'landscape');
      } else {
        callOrient(portrait$1, 'portrait');
      }

      // NOTE
      // This sets up a logic tree on whether or not it should act according to min-width
      // or max-width to implement over or under logic accordingly as well as to perfectly
      // match the breakpoints in the scss. By default the framework acts exactly as bootstrap
      // but can be changed by matching the variable in the variables.json and the _variables.scss
      // files to either min-width or max-width accordingly

      // IMPORTANT
      // the min-width and max-width variables must match between the min-width and max-width
      // files for this framework to work

      if (vars.minmax === 'max-width') {
        switch (w) {
          case w < vars.xxs:
            {
              callScreen(xxs, 'xxs');
              break;
            }
          case w > vars.xxs && w <= vars.xs:
            {
              callScreen(xs, 'xs');
              break;
            }
          case w > vars.xs && w <= vars.sm:
            {
              callScreen(sm$1, 'sm');
              break;
            }
          case w > vars.sm && w <= vars.md:
            {
              callScreen(md$1, 'md');
              break;
            }
          case w > vars.md && w <= vars.lg:
            {
              callScreen(lg$1, 'lg');
              break;
            }
          case w > vars.lg && w <= vars.xl:
            {
              callScreen(xl$1, 'xl');
              break;
            }
          case w > vars.xl && w <= vars.xxl:
            {
              callScreen(xxl$1, 'xxl');
              break;
            }
          default:
            {
              callScreen(over$1, 'over');
            }
        }

        //   if (w <= vars.xxs) {
        //     callScreen(xxs, 'xxs')
        //   } else if (w > vars.xxs && w <= vars.xs) {
        //     callScreen(xs, 'xs')
        //   } else if (w > vars.xs && w <= vars.sm) {
        //     callScreen(sm, 'sm')
        //   } else if (w > vars.sm && w <= vars.md) {
        //     callScreen(md, 'md')
        //   } else if (w > vars.md && w <= vars.lg) {
        //     callScreen(lg, 'lg')
        //   } else if (w > vars.lg && w <= vars.xl) {
        //     callScreen(xl, 'xl')
        //   } else if (w > vars.xl && w <= vars.xxl) {
        //     callScreen(xxl, 'xxl')
        //   } else {
        //     callScreen(over, 'over')
        //   }
      } else {
        switch (w) {
          case w < vars.xxs:
            {
              callScreen(under$1, 'under');
              break;
            }
          case w > vars.xxs && w <= vars.xs:
            {
              callScreen(xxs, 'xxs');
              break;
            }
          case w > vars.xs && w <= vars.sm:
            {
              callScreen(xs, 'xs');
              break;
            }
          case w > vars.sm && w <= vars.md:
            {
              callScreen(sm$1, 'sm');
              break;
            }
          case w > vars.md && w <= vars.lg:
            {
              callScreen(md$1, 'md');
              break;
            }
          case w > vars.lg && w <= vars.xl:
            {
              callScreen(lg$1, 'lg');
              break;
            }
          case w > vars.xl && w <= vars.xxl:
            {
              callScreen(xl$1, 'xl');
              break;
            }
          default:
            {
              callScreen(xxl$1, 'xxl');
            }
        }

        // if (w < vars.xxs) {
        //     callScreen(under, 'under')
        // } else if (w >= vars.xxs && w < vars.xs) {
        //     callScreen(xxs, 'xxs')
        // } else if (w >= vars.xs && w < vars.sm) {
        //     callScreen(xs, 'xs')
        // } else if (w >= vars.sm && w < vars.md) {
        //     callScreen(sm, 'sm')
        // } else if (w >= vars.md && w < vars.lg) {
        //     callScreen(md, 'md')
        // } else if (w >= vars.lg && w < vars.xl) {
        //     callScreen(lg, 'lg')
        // } else if (w >= vars.xl && w < vars.xxl) {
        //     callScreen(xl, 'xl')
        // } else {
        //     callScreen(xxl, 'xxl')
        // }
      }
    }

    // NOTE
    // these functions are a fix to allow for the trigger to fire events by
    // clearing the variables that don't allow for the events to fire
    // before calling the update

    clearAllThenUpdate() {
      this.clearOrientThenUpdate();
      this.clearScreenThenUpdate();
    }
    clearScreenThenUpdate() {
      screen = null;
      orientation = null;
      this.update();
    }
    clearOrientThenUpdate() {
      screen = null;
      orientation = null;
      this.update();
    }

    // NOTE
    // These functions return the current state of the
    // breakpoints and orientation as strings

    returnOrientation() {
      if (!orientation) {
        this.update();
      }
      logger.log('The current orientation is ', orientation);
      return orientation;
    }
    returnScreen() {
      if (!screen) {
        this.update();
      }
      logger.log('The current screen is ', screen);
      return screen;
    }
  }
  const setter = new Setter();

  // NOTE
  // This is an independent file for setting the dynamic
  // size for the scss to tap in to for the cvh and cvw variables
  // and sets the foundation for the framework to work within

  let dynamicWidth = null;
  let dynamicHeight = null;
  class VolSizer {
    setup() {
      logger.log('Sizer Logic Online');
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

      if (h < dynamicHeight && w === dynamicWidth && w <= vars.lg) {
        return;
      }
      dynamicWidth = w;
      dynamicHeight = h;
      const root = document.querySelector(':root');
      const {
        prefix
      } = vars;
      // @ts-ignore
      root.style.setProperty(`--${prefix}vh100`, `${h}px`);
      // @ts-ignore
      root.style.setProperty(`--${prefix}vw100`, `${w}px`);
    }
  }
  const volSizer = new VolSizer();

  /* eslint-disable no-return-assign */
  /* eslint-disable unicorn/no-array-reduce */
  const root = document.querySelector(':root');
  function getStyle(name) {
    const select = root !== undefined && root !== null ? getComputedStyle(root) : null;
    if (select !== null) {
      return select.getPropertyValue(name);
    }
    return null;
  }
  function returnNumbersOnly(string) {
    let output = '';
    for (const s of string) {
      if (!Number.isNaN(s) || s === '.') {
        output += s;
      } else {
        break;
      }
    }
    return Number(output);
  }
  function getCssRoot() {
    const cssVars = Array.from(document.styleSheets).filter(sheet => sheet.href === null || sheet.href.startsWith(window.location.origin)).reduce((acc, sheet) => acc = [...acc, ...Array.from(sheet.cssRules).reduce((def, rule) => def = rule.selectorText === ':root' ? [...def, ...Array.from(rule.style).filter(name => name.startsWith('--'))] : def, [])], []);
    return cssVars;
  }
  class Options {
    importVariablesFromCss() {
      const root = getCssRoot();
      logger.log('the found root is: ', root);
      const prefix = getStyle('--prefix');
      vars.prefix = prefix;
      for (const element of root) {
        const key = element.slice(2);
        const val = getStyle(element);
        let set = null;

        // skip if value is nulled or key is too long
        if (val.length === 0 || key.length > 30) {
          continue;
        }

        // skip the prefix
        if (key === 'prefix') {
          continue;
        }

        // skip the vh100 and vw100 values, which we only need to set not get
        if (key === `${prefix}vh100` || key === `${prefix}vw100`) {
          continue;
        }

        // skip the spacer, set that later
        if (key === `${prefix}spacer`) {
          continue;
        }

        // skip if prefix is not detected, for the rest of the rooted variables
        if (!key.includes(prefix)) {
          continue;
        }

        // set the value to a number if first digit is a number, otherwise set it as a string
        set = Number.isNaN(val[0]) ? val : returnNumbersOnly(val);
        vars[`${key.slice(prefix.length)}`] = set;
      }

      // set the spacer as a result of the rem times the base px value of the font size
      const spacer = returnNumbersOnly(getStyle(`--${prefix}spacer`)) * returnNumbersOnly(window.getComputedStyle(document.body).fontSize);
      vars.spacer = spacer;
      logger.log('The vars are now: ', vars);
      document.removeEventListener('DOMContentLoaded', options.importVariablesFromCss);
    }
    dev() {
      vars.dev = true;
      logger.log('set dev mode to true');
    }
    normalize(value) {
      if (value === 'true') {
        return true;
      }
      if (value === 'false') {
        return false;
      }
      if (value === '' || value === 'null' || !value || value === undefined) {
        return null;
      }
      if (value === Number(value).toString()) {
        return Number(value);
      }
      if (typeof value !== 'string') {
        return value;
      }
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch {
        return value;
      }
    }
  }
  const options = new Options();
  document.addEventListener('DOMContentLoaded', options.importVariablesFromCss);

  class Suspendors {
    constructor() {
      logger.log('Suspendors Online');
      volSizer.setup();
      setter.setup();
    }

    // NOTE
    // These are functions that will allow for
    // manual triggers of the current breakpoint
    // or orientation that will remain consistent
    // with all listeners and registered
    // functions

    triggerAll() {
      setter.clearAllThenUpdate();
    }
    triggerOrientation() {
      setter.clearOrientThenUpdate();
    }
    triggerScreen() {
      setter.clearScreenThenUpdate();
    }

    // NOTE
    // These functions return the values of the
    // state of the breakpoints and the
    // orientation values

    returnScreen() {
      return setter.returnScreen();
    }
    returnOrientation() {
      return setter.returnOrientation();
    }
    returnVariables() {
      return vars;
    }
    dev() {
      options.dev();
    }
  }
  const suspendors = new Suspendors();

  const under = [];
  const sm = [];
  const md = [];
  const lg = [];
  const xl = [];
  const xxl = [];
  const over = [];
  const landscape = [];
  const portrait = [];
  class Registrar {
    constructor() {
      logger.log('Registrar Online');
      window.addEventListener('under', () => {
        this.trigger('under');
      }, false);
      window.addEventListener('xxs', () => {
        this.trigger('xxs');
      }, false);
      window.addEventListener('xs', () => {
        this.trigger('xs');
      }, false);
      window.addEventListener('sm', () => {
        this.trigger('sm');
      }, false);
      window.addEventListener('md', () => {
        this.trigger('md');
      }, false);
      window.addEventListener('lg', () => {
        this.trigger('lg');
      }, false);
      window.addEventListener('xl', () => {
        this.trigger('xl');
      }, false);
      window.addEventListener('xxl', () => {
        this.trigger('xxl');
      }, false);
      window.addEventListener('over', () => {
        this.trigger('over');
      }, false);
      window.addEventListener('portrait', () => {
        this.trigger('portrait');
      }, false);
      window.addEventListener('landscape', () => {
        this.trigger('landscape');
      }, false);
    }
    trigger(flag) {
      logger.log(`Triggering ${flag}`);
      if (flag === 'under') {
        this.runEvents(under);
        return;
      }
      if (flag === 'sm') {
        this.runEvents(sm);
        return;
      }
      if (flag === 'md') {
        this.runEvents(md);
        return;
      }
      if (flag === 'lg') {
        this.runEvents(lg);
        return;
      }
      if (flag === 'xl') {
        this.runEvents(xl);
        return;
      }
      if (flag === 'xxl') {
        this.runEvents(xxl);
        return;
      }
      if (flag === 'over') {
        this.runEvents(over);
        return;
      }
      if (flag === 'landscape') {
        this.runEvents(landscape);
        return;
      }
      if (flag === 'portrait') {
        this.runEvents(portrait);
      }
    }
    runEvents(arr) {
      if (arr.length < 1) {
        return;
      }
      for (const e of arr) {
        if (typeof e === 'function') {
          e();
        }
      }
    }
    setEventFlags(fn, flag) {
      if (typeof fn === 'function') {
        logger.log('valid function');
        if (flag === 'under') {
          under.push(fn);
          return;
        }
        if (flag === 'xxs') {
          return;
        }
        if (flag === 'xs') {
          return;
        }
        if (flag === 'sm') {
          sm.push(fn);
          return;
        }
        if (flag === 'md') {
          md.push(fn);
          return;
        }
        if (flag === 'lg') {
          lg.push(fn);
          return;
        }
        if (flag === 'xl') {
          xl.push(fn);
          return;
        }
        if (flag === 'xxl') {
          xxl.push(fn);
          return;
        }
        if (flag === 'over') {
          over.push(fn);
          return;
        }
        if (flag === 'landscape') {
          landscape.push(fn);
          return;
        }
        if (flag === 'portrait') {
          portrait.push(fn);
        }
      } else {
        logger.log('not a valid function');
      }
    }
    under(fn) {
      logger.log('registering function: ', fn, ' at breakpoint under');
      this.setEventFlags(fn, 'under');
    }
    xxs(fn) {
      logger.log('registering function: ', fn, ' at breakpoint sm');
      this.setEventFlags(fn, 'xxs');
    }
    xs(fn) {
      logger.log('registering function: ', fn, ' at breakpoint sm');
      this.setEventFlags(fn, 'xs');
    }
    sm(fn) {
      logger.log('registering function: ', fn, ' at breakpoint sm');
      this.setEventFlags(fn, 'sm');
    }
    md(fn) {
      logger.log('registering function: ', fn, ' at breakpoint md');
      this.setEventFlags(fn, 'md');
    }
    lg(fn) {
      logger.log('registering function: ', fn, ' at breakpoint lg');
      this.setEventFlags(fn, 'lg');
    }
    xl(fn) {
      logger.log('registering function: ', fn, ' at breakpoint xl');
      this.setEventFlags(fn, 'xl');
    }
    xxl(fn) {
      logger.log('registering function: ', fn, ' at breakpoint xxl');
      this.setEventFlags(fn, 'xxl');
    }
    over(fn) {
      logger.log('registering function: ', fn, ' at breakpoint over');
      this.setEventFlags(fn, 'over');
    }
    landscape(fn) {
      logger.log('registering function: ', fn, ' at orientation landscape');
      this.setEventFlags(fn, 'landscape');
    }
    portrait(fn) {
      logger.log('registering function: ', fn, ' at orientation portrait');
      this.setEventFlags(fn, 'portrait');
    }
  }
  const registrar = new Registrar();

  class Modal {
    constructor(data) {
      this.static = data.static || false;
      this.scrollable = data.scrollable || false;
      this.disableBodyScroll = data.disableBodyScroll || true;
      this.centered = data.centered || false;
      this.animation = data.animation || true;
      this.transitionTime = data.transitionTime || vars['modal-transition-time'] ? vars['modal-transition-time'] : 1;
    }
  }

  let targetModalId = null;
  let targetModal = null;
  let modalOptions = {};
  let modalClosing = false;
  let modalOpening = false;
  function setFocus() {
    if (!targetModalId || !targetModal) {
      throw new Error(`no modal target ${arguments.callee.name}`);
    }

    // Check to see if an element has the autofocus attribute applied,
    // and if not apply it to the first child of the element.
    let autofocus = 0;
    Array.prototype.forEach.call(targetModal.querySelectorAll('[autofocus]'), () => {
      autofocus++;
    });
    if (autofocus == 0) {
      logger.log('no autofocus target provided, setting first child to autofocus.');
      targetModal.firstChild.setAttribute('autofocus', '');
    }
  }
  function awaitEscKeyCloseModal(e) {
    // listen for the user to press escape key, then fire the code
    // to close the modal
    if (e.key === 'Escape' || e.keyCode === 27) {
      logger.log('escape pressed');
      closeModal();
    }
  }
  function awaitOutClickCloseModal(e) {
    if (!targetModalId || !targetModal) {
      throw new Error(`no modal target ${arguments.callee.name}`);
    }

    // if modal is closed it will not be visible on the dom
    if (!targetModal.checkVisibility()) {
      return;
    }
    const rect = targetModal.getBoundingClientRect();
    if (e.x < rect.left || e.x > rect.width + rect.left) {
      closeModal();
    } else if (e.y < rect.top || e.y > rect.height + rect.top) {
      closeModal();
    }
  }
  function awaitOutTouchStartToCloseModal(e) {
    if (!targetModalId || !targetModal) {
      throw new Error(`no modal target ${arguments.callee.name}`);
    }
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    const rect = targetModal.getBoundingClientRect();
    // // if modal is closed it will not be visible on the dom
    // // so return
    // if(!modal.checkVisibility()){ return }

    if (x < rect.left + window.scrollX || x > rect.left + window.scrollX + rect.width) {
      // further left
      targetModal.addEventListener('touchend', awaitOutTouchEndToCloseModal);
    } else if (y < rect.top + window.scrollY || y > rect.top + window.scrollY + rect.height) {
      // above
      targetModal.addEventListener('touchend', awaitOutTouchEndToCloseModal);
    }
  }
  function awaitOutTouchEndToCloseModal(e) {
    if (!targetModalId || !targetModal) {
      throw new Error(`no modal target ${arguments.callee.name}`);
    }
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    const rect = targetModal.getBoundingClientRect();
    targetModal.removeEventListener('touchend', awaitOutTouchEndToCloseModal);
    // // if modal is closed it will not be visible on the dom
    // // so return
    // if(!modal.checkVisibility()){ return }

    if (x < rect.left + window.scrollX || x > rect.left + window.scrollX + rect.width) {
      closeModal();
    } else if (y < rect.top + window.scrollY || y > rect.top + window.scrollY + rect.height) {
      closeModal();
    }
  }
  function getScrollBarWidth() {
    const el = document.createElement('div');
    el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute;';
    document.body.append(el);
    const width = el.offsetWidth - el.clientWidth;
    el.remove();
    return width;
  }
  function toggleScroll(toggle = true) {
    if (toggle) {
      // get the width of the scrollbar in the document
      const scrollBarWidth = getScrollBarWidth();
      // turn the body scroll off when modal is open
      document.body.classList.add('modal-open');
      // then set the padding of the body to be equal to that
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      // turn the body scroll off when modal is open
      document.body.classList.remove('modal-open');
      // then set the padding of the body to be equal to that
      document.body.style = '';
    }
  }
  function toggleEventListenersToCloseModal(toggle = true) {
    if (!targetModalId || !targetModal) {
      throw new Error(`no modal target ${arguments.callee.name}`);
    }
    if (toggle) {
      targetModal.addEventListener('cancel', e => {
        e.preventDefault();
      });
      window.addEventListener('click', awaitOutClickCloseModal);
      document.addEventListener('keydown', awaitEscKeyCloseModal);
      window.addEventListener('touchstart', awaitOutTouchStartToCloseModal);
    } else {
      targetModal.removeEventListener('cancel', e => {
        e.preventDefault();
      });
      window.removeEventListener('click', awaitOutClickCloseModal);
      document.removeEventListener('keydown', awaitEscKeyCloseModal);
      window.removeEventListener('touchstart', awaitOutTouchStartToCloseModal);
    }
  }
  function toggleOptionsAndAttributes(toggle = true, options) {
    if (!targetModalId || !targetModal) {
      throw new Error(`no modal target ${arguments.callee.name}`);
    }
    if (!options) {
      options = new Modal(modalOptions);
    }
    if (toggle) {
      if (options.centered) {
        targetModal.setAttribute('data-centered', '');
      }
      if (options.static) {
        targetModal.setAttribute('data-static', '');
      }
      if (options.scrollable) {
        targetModal.setAttribute('data-scrollable', '');
      }
      if (!options.animation) {
        targetModal.setAttribute('data-no-animation', '');
      }
    } else {
      if (options.centered) {
        targetModal.removeAttribute('data-centered', '');
      }
      if (options.static) {
        targetModal.removeAttribute('data-static', '');
      }
      if (options.scrollable) {
        targetModal.removeAttribute('data-scrollable', '');
      }
      if (!options.animation) {
        targetModal.removeAttribute('data-no-animation', '');
      }
    }
  }
  function setModalValuesAndEnvironment(id, options) {
    // sanitize the options from the user
    // and save the options for use later
    modalOptions = new Modal(options);
    // set the variables id to check against
    targetModalId = id;
    // get the element to manipulate
    targetModal = document?.getElementById(targetModalId);
  }
  function resetModalValuesAndEnvironment() {
    // reset the environment
    targetModalId = null;
    targetModal = null;
  }
  async function openModal(id, options) {
    // check to see if the environment is ready
    if (!targetModalId || !targetModal) {
      throw new Error(`no modal target ${arguments.callee.name}`);
    }

    // set the options, true to set, false to remove, options as second param
    toggleOptionsAndAttributes(true);

    // Make sure the modal has a focusable target before opening
    setFocus();

    // FIXME - the current solution for the callback is to have
    // timeouts set, this makes for some shoddy code and adds in delays, this
    // can probably be fixed, but for now I have settled on making it work first
    // and if I find the better way of doing this later I'll update it.

    // then start the open process by setting the display style to block
    targetModal.style.display = 'block';

    // then set the event listeners for the options
    targetModal.addEventListener('transitionend', toggleOnEventListenersToCloseModal);

    // the dom needs a moment to update after setting display styles, so set
    // a minimal timeout function before updating the attribute we are
    // checking for in our styles
    setTimeout(() => {
      targetModal.setAttribute('data-modal-open', '');
    }, 1);

    // now we set up a function that returns after a set amount of time
    const modalStatus = await modalTransitionTimer(options);
    console.log(modalStatus);

    // after the set amount of time call the show-modal function
    // for accessability
    targetModal.showModal();
  }
  function toggleOnEventListenersToCloseModal() {
    if (!targetModalId || !targetModal) {
      throw new Error(`no modal target ${arguments.callee.name}`);
    }
    console.log('modal opened');
    targetModal.removeEventListener('transitionend', toggleOnEventListenersToCloseModal);
    toggleEventListenersToCloseModal(true);
  }
  async function closeModal() {
    if (!targetModalId || !targetModal) {
      throw new Error(`no modal target ${arguments.callee.name}`);
    }
    if (modalClosing) {
      return;
    }
    modalClosing = true;

    // remove the closing events for the modal since we are closing it now
    toggleEventListenersToCloseModal(false);

    // then start the close process
    targetModal.addEventListener('transitionend', toggleOffEventListenersToCloseModal);
    targetModal.removeAttribute('data-modal-open');

    // now we set up a function that returns after a set amount of time
    const modalStatus = await modalTransitionTimer(modalOptions);
    console.log(modalStatus);
  }
  function toggleOffEventListenersToCloseModal() {
    // remove the listener for the transition
    targetModal.removeEventListener('transitionend', toggleOffEventListenersToCloseModal);
    targetModal.style = '';
    toggleEventListenersToCloseModal(false);
    toggleOptionsAndAttributes(false);
    targetModal.close();
    console.log('modal closed');
    modalClosing = false;
  }
  async function modalTransitionTimer(options) {
    const timeOut = options ? options.transitionTime + 50 : modalOptions.transitionTime + 50;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, timeOut);
    });
  }
  class Modals {
    async open(id = '', options = {}) {
      // debugger
      try {
        // user must provide an id to open a modal
        if (id === '') {
          throw new Error('No id provided');
        }

        // if a modal is opening return to prevent double inputs
        if (modalOpening) {
          return;
        }
        modalOpening = true;

        // if a modal is already open, then close the open one first
        if (targetModalId !== null) {
          await this.close(targetModalId);
        }

        // set up the environment to work in
        setModalValuesAndEnvironment(id, options);

        // turn off the scroll of the page
        toggleScroll(true);

        // then run the open logic
        await openModal(id, options);

        // set the opening check back to false
        modalOpening = false;
      } catch (error) {
        logger.error(error);
      }
    }
    async close() {
      try {
        // there must be an open modal to close a modal
        if (targetModalId === null) {
          throw new Error('no modal to close');
        }

        // if the modal is closing, then return to prevent double inputs
        if (modalClosing) {
          return;
        }
        modalClosing = true;

        // then run the close logic
        await closeModal();

        // if there is a modal opening, don't restore
        // scroll capability
        if (!modalOpening) {
          toggleScroll(false);
        }

        // clear the environment
        resetModalValuesAndEnvironment();

        // Set the check back to false
        modalClosing = false;
      } catch (error) {
        if (vars.dev) {
          logger.error(error);
        } else {
          console.log(error);
        }
      }
    }
    async toggle(id = '', options = {}) {
      try {
        if (id === '') {
          // if no id provided, default to close
          await this.close();
          return;
        }
        if (targetModalId === null || targetModalId !== id) {
          // open a modal if no modal is open or if the id provided is not the
          // id of the currently open modal
          await this.open(id, options);
        } else {
          // close the modal if the open modal is equal to the id provided
          await this.close();
        }
      } catch (error) {
        if (vars.dev) {
          logger.error(error);
        } else {
          console.log(error);
        }
      }
    }
  }
  const modal = new Modals();

  class Forms {
    test() {
      logger.log('Dev Mode confirmed - forms');
    }
  }
  const forms = new Forms();

  class Pop {
    test() {
      logger.log('Dev Mode confirmed - pop');
    }
  }
  const pop = new Pop();

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

  const index_umd = {
    suspendors,
    registrar,
    modal,
    forms,
    pop,
    options,
    loaders
  };

  return index_umd;

}));
//# sourceMappingURL=suspendors.bundle.js.map
