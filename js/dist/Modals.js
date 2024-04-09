/*!
  * Bootstrap Modals.js v1.6.4 (undefined)
  * Copyright 2011-2024 Auston Robertson <auston.robertson.business@gmail.com>
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('./_variables.js'), require('./utils/Logger.js'), require('./models/Modal.js')) :
  typeof define === 'function' && define.amd ? define(['exports', './_variables', './utils/Logger', './models/Modal'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Modals = {}, global._variables, global.Logger, global.Modal));
})(this, (function (exports, _variables_js, Logger_js, Modal_js) { 'use strict';

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
      Logger_js.logger.log('no autofocus target provided, setting first child to autofocus.');
      targetModal.firstChild.setAttribute('autofocus', '');
    }
  }
  function awaitEscKeyCloseModal(e) {
    // listen for the user to press escape key, then fire the code
    // to close the modal
    if (e.key === 'Escape' || e.keyCode === 27) {
      Logger_js.logger.log('escape pressed');
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
      options = new Modal_js.Modal(modalOptions);
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
    modalOptions = new Modal_js.Modal(options);
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
        Logger_js.logger.error(error);
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
        if (_variables_js.vars.dev) {
          Logger_js.logger.error(error);
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
        if (_variables_js.vars.dev) {
          Logger_js.logger.error(error);
        } else {
          console.log(error);
        }
      }
    }
  }
  const modal = new Modals();

  exports.modal = modal;

  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=Modals.js.map
