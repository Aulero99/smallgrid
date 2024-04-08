import { vars } from "../../var/_variables";
import { logger } from "../Logger"
import { Options } from "./ModalOptions";

let openModalID = null;
let shownModal = null;
let modalOptions = {}
let modalClosing = false;
let modalOpening = false;

function setFocus(){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    // Check to see if an element has the autofocus attribute applied,
    // and if not apply it to the first child of the element.
    let autofocus = 0
    Array.prototype.forEach.call(shownModal.querySelectorAll('[autofocus]'), function(){autofocus++})
    if(autofocus == 0){
        logger.log('no autofocus target provided, setting first child to autofocus.')
        shownModal.firstChild.setAttribute('autofocus', '')
    }
    return
}

function awaitEscKeyCloseModal(e){
    // listen for the user to press escape key, then fire the code
    // to close the modal
    if(e.key==='Escape' || e.keyCode === 27){
        logger.log('escape pressed')
        closeModal()
    }
}

function awaitOutClickCloseModal(e){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    // if modal is closed it will not be visible on the dom
    if(!shownModal.checkVisibility()){ return }
    const rect = shownModal.getBoundingClientRect();
    if(e.x < rect.left || e.x > (rect.width + rect.left)){
        closeModal()
    }else if(e.y < rect.top || e.y > (rect.height + rect.top)){
        closeModal()
    }
    return
}

function awaitOutTouchStartToCloseModal(e){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    const x = e.changedTouches[0].clientX
    const y = e.changedTouches[0].clientY
    const rect = shownModal.getBoundingClientRect();
    // // if modal is closed it will not be visible on the dom
    // // so return
    // if(!modal.checkVisibility()){ return }
    
    if(x < rect.left + window.scrollX || x > rect.left + window.scrollX + rect.width){
        // further left
        shownModal.addEventListener('touchend', awaitOutTouchEndToCloseModal)
        return
    }else if(y < rect.top + window.scrollY || y > rect.top + window.scrollY + rect.height){
        // above
        shownModal.addEventListener('touchend', awaitOutTouchEndToCloseModal)
        return
    }
}

function awaitOutTouchEndToCloseModal(e){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    const x = e.changedTouches[0].clientX
    const y = e.changedTouches[0].clientY
    const rect = shownModal.getBoundingClientRect();
    
    shownModal.removeEventListener('touchend', awaitOutTouchEndToCloseModal)
    // // if modal is closed it will not be visible on the dom
    // // so return
    // if(!modal.checkVisibility()){ return }
    
    if(x < rect.left + window.scrollX || x > rect.left + window.scrollX + rect.width){
        closeModal()
        return
    }else if(y < rect.top + window.scrollY || y > rect.top + window.scrollY + rect.height){
        closeModal()
        return
    }
}

function getScrollBarWidth() {
    let el = document.createElement("div");
    el.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;";
    document.body.appendChild(el);
    let width = el.offsetWidth - el.clientWidth;
    el.remove();
    return width;
}

function toggleScroll(toggle = true){
    if(toggle){
        // get the width of the scrollbar in the document
        let scrollBarWidth = getScrollBarWidth();
        // turn the body scroll off when modal is open
        document.body.classList.add('modal-open');
        // then set the padding of the body to be equal to that
        document.body.style.paddingRight = `${scrollBarWidth}px`;
        return
    }else{
        // turn the body scroll off when modal is open
        document.body.classList.remove('modal-open');
        // then set the padding of the body to be equal to that
        document.body.style = '';
        return
    }
}

function toggleEventListenersToCloseModal(toggle = true){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    if(toggle){
        shownModal.addEventListener('cancel', (e) => {
            e.preventDefault();
        });
        window.addEventListener('click', awaitOutClickCloseModal)
        document.addEventListener('keydown', awaitEscKeyCloseModal)
        window.addEventListener('touchstart', awaitOutTouchStartToCloseModal)
        return
    }else{
        shownModal.removeEventListener('cancel', (e) => {
            e.preventDefault();
        });
        window.removeEventListener('click', awaitOutClickCloseModal)
        document.removeEventListener('keydown', awaitEscKeyCloseModal)
        window.removeEventListener('touchstart', awaitOutTouchStartToCloseModal)
        return
    }
}

function toggleOptionsAndAttributes(toggle = true, options){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    if(!options){
        options = new Options(modalOptions)
    }
    if(toggle){
        if(options.centered){ shownModal.setAttribute('data-centered', '') }
        if(options.static){ shownModal.setAttribute('data-static', '') }
        if(options.scrollable){ shownModal.setAttribute('data-scrollable', '') }
        if(!options.animation){ shownModal.setAttribute('data-no-animation', '') }
        return
    }else{
        if(options.centered){ shownModal.removeAttribute('data-centered', '') }
        if(options.static){ shownModal.removeAttribute('data-static', '') }
        if(options.scrollable){ shownModal.removeAttribute('data-scrollable', '') }
        if(!options.animation){ shownModal.removeAttribute('data-no-animation', '') }
        return
    }
}

function setModalValuesAndEnvironment(id, options){
        // sanitize the options from the user
        // and save the options for use later
        modalOptions = new Options(options)
        // set the variables id to check against
        openModalID = id
        // get the element to manipulate
        shownModal = document?.getElementById(openModalID)
        return
}

function resetModalValuesAndEnvironment(){
    // reset the environment
    openModalID = null
    shownModal = null
}

async function openModal(id, options){
    // check to see if the environment is ready
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }

    // set the options, true to set, false to remove, options as second param
    toggleOptionsAndAttributes(true)

    // Make sure the modal has a focusable target before opening
    setFocus()

    // FIXME - the current solution for the callback is to have
    // timeouts set, this makes for some shoddy code and adds in delays, this
    // can probably be fixed, but for now I have settled on making it work first
    // and if I find the better way of doing this later I'll update it.

    // then start the open process by setting the display style to block
    shownModal.style.display = 'block';

    // then set the event listeners for the options
    shownModal.addEventListener('transitionend', toggleOnEventListenersToCloseModal)

    // the dom needs a moment to update after setting display styles, so set
    // a minimal timeout function before updating the attribute we are
    // checking for in our styles
    setTimeout(() => { shownModal.setAttribute('data-modal-open', '') }, 1);

    // now we set up a function that returns after a set amount of time
    let modalStatus = await modalTransitionTimer(options)
    console.log(modalStatus)

    // after the set amount of time call the show-modal function
    // for accessability
    shownModal.showModal()
    return
}

function toggleOnEventListenersToCloseModal(){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    console.log('modal opened')
    shownModal.removeEventListener('transitionend', toggleOnEventListenersToCloseModal)
    toggleEventListenersToCloseModal(true)
    return
}

async function closeModal(){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    
    // remove the closing events for the modal since we are closing it now
    toggleEventListenersToCloseModal(false)
    
    // then start the close process
    shownModal.addEventListener('transitionend', toggleOffEventListenersToCloseModal)
    shownModal.removeAttribute('data-modal-open')

    // now we set up a function that returns after a set amount of time
    let modalStatus = await modalTransitionTimer(modalOptions)
    console.log(modalStatus)
    
    return
}

function toggleOffEventListenersToCloseModal(){
    // remove the listener for the transition
    shownModal.removeEventListener('transitionend', toggleOffEventListenersToCloseModal)
    shownModal.style = ''
    toggleEventListenersToCloseModal(false)
    toggleOptionsAndAttributes(false)
    shownModal.close()
    console.log('modal closed')
}

async function modalTransitionTimer(options){
    const timeOut = options ? options.transitionTime + 50 : modalOptions.transitionTime + 50
    return new Promise(resolve =>{
        setTimeout(() => {
            resolve(true)
        }, timeOut);
    })
}

class Modal{

    async open(id = '', options = {}){
        // debugger
        try {
            // user must provide an id to open a modal
            if(id === ''){ throw new Error('No id provided') }

            // if a modal is opening return to prevent double inputs
            if(modalOpening){ return }
            modalOpening = true

            // if a modal is already open, then close the open one first
            if(openModalID !== null){ await this.close(openModalID) }

            // set up the environment to work in
            setModalValuesAndEnvironment(id, options)

            // turn off the scroll of the page
            toggleScroll(true)

            // then run the open logic
            await openModal(id, options)
            
            // set the opening check back to false
            modalOpening = false
            return
        } catch (e) {
            if(vars.dev){ logger.error(e) }
            else{ console.log(e) }
        }
    }
    async close(){
        debugger
        try {
            // there must be an open modal to close a modal
            if(openModalID === null){ throw new Error('no modal to close') }
            // if the modal is closing, then return to prevent double inputs
            if(modalClosing){ return }
            modalClosing = true
            
            // then run the close logic
            await closeModal()

            // if there is a modal opening, don't restore
            // scroll capability
            if(!modalOpening){ toggleScroll(false) }

            // clear the environment
            resetModalValuesAndEnvironment()
            
            // Set the check back to false
            modalClosing = false
            return
            }
        catch (e) {
            if(vars.dev){ logger.error(e) }
            else{ console.log(e) }
        }
    }
    async toggle(id = '', options = {}){
        try {
            if(id === ''){ 
                // if no id provided, default to close
                await this.close() 
                return
            }
            if(openModalID === null || openModalID !== id){
                // open a modal if no modal is open or if the id provided is not the
                // id of the currently open modal
                await this.open(id, options)
                return
            }else{
                // close the modal if the open modal is equal to the id provided
                await this.close()
                return
            }
        } catch (e) {
            if(vars.dev){ logger.error(e) }
            else{ console.log(e) }
        }
    }
}

export const modal = new Modal()