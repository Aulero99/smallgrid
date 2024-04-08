import { vars } from "../../var/_variables";
import { logger } from "../Logger"
import { Options } from "./ModalOptions";

let openModalID = null;
let shownModal = null;
let modalOptions = {}
let modalClosing = false;
let modalOpening = false;

function setFocus(){
    // Check to see if an element has the autofocus attribute applied,
    // and if not apply it to the first child of the element.
    let autofocus = 0
    const modal = document.getElementById(openModalID)
    Array.prototype.forEach.call(modal.querySelectorAll('[autofocus]'), function(){autofocus++})
    if(autofocus == 0){
        logger.log('no autofocus target provided, setting first child to autofocus.')
        modal.firstChild.setAttribute('autofocus', '')
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
    const modal = document.getElementById(openModalID)
    // if modal is closed it will not be visible on the dom
    // so return
    if(!modal.checkVisibility()){ return }
    const rect = modal.getBoundingClientRect();
    if(e.x < rect.left || e.x > (rect.width + rect.left)){
        closeModal()
    }else if(e.y < rect.top || e.y > (rect.height + rect.top)){
        closeModal()
    }
    return
}

function awaitOutTouchStartToCloseModal(e){
    const modal = document.getElementById(openModalID)
    const x = e.changedTouches[0].clientX
    const y = e.changedTouches[0].clientY
    const rect = modal.getBoundingClientRect();
    // // if modal is closed it will not be visible on the dom
    // // so return
    // if(!modal.checkVisibility()){ return }
    
    if(x < rect.left + window.scrollX || x > rect.left + window.scrollX + rect.width){
        // further left
        modal.addEventListener('touchend', awaitOutTouchEndToCloseModal)
        return
    }else if(y < rect.top + window.scrollY || y > rect.top + window.scrollY + rect.height){
        // above
        modal.addEventListener('touchend', awaitOutTouchEndToCloseModal)
        return
    }
}

function awaitOutTouchEndToCloseModal(e){
    const modal = document.getElementById(openModalID)
    const x = e.changedTouches[0].clientX
    const y = e.changedTouches[0].clientY
    const rect = modal.getBoundingClientRect();
    
    modal.removeEventListener('touchend', awaitOutTouchEndToCloseModal)
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

function disableScroll(tf = true){
    if(tf){
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

function setModalEventListeners(tf = true){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    if(tf){
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

function setOptions(tf=true, options = {}){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    if(tf){
        // disable the scroll on the page
        disableScroll(options.disableBodyScroll)
        // determine whether to center or not
        if(options.centered){ shownModal.setAttribute('data-centered', '') }
        if(options.static){ shownModal.setAttribute('data-static', '') }
        if(options.scrollable){ shownModal.setAttribute('data-scrollable', '') }
        if(!options.animation){ shownModal.setAttribute('data-no-animation', '') }
        return
    }else{
        disableScroll(false)
        shownModal.removeAttribute('data-centered', '') 
        shownModal.removeAttribute('data-static', '')
        shownModal.removeAttribute('data-scrollable', '') 
        shownModal.removeAttribute('data-no-animation', '')
        return
    }
}

async function openModal(options = {}){
    // debugger
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }

    // set the options, true to set, false to remove, options as second param
    setOptions(true, options)

    // Make sure the modal has a focusable target before opening
    setFocus()

    // FIXME - the current solution for the callback is to have
    // timeouts set, this makes for some shoddy code and adds in delays, this
    // can probably be fixed, but for now I have settled on making it work first
    // and if I find the better way of doing this later I'll update it.

    // then start the open process by setting the display style to block
    shownModal.style.display = 'block';

    // then set the event listeners for the options
    shownModal.addEventListener('transitionend', setOpenModalEvents)

    // the dom needs a moment to update after setting display styles, so set
    // a minimal timeout function before updating the attribute we are
    // checking for in our styles
    setTimeout(() => { shownModal.setAttribute('data-modal-open', '') }, 1);

    // now we set up a function that returns after a set amount of time
    let modalStatus = await modalTransitionTimer(options)
    console.log(modalStatus)
    return
}

function setOpenModalEvents(){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }
    console.log('modal opened')
    shownModal.removeEventListener('transitionend', setOpenModalEvents)
    setModalEventListeners(true)
    shownModal.showModal()
    return
}

async function closeModal(){
    if(!openModalID || !shownModal){ throw new Error(`no modal target ${arguments.callee.name}`) }

    // check to see if the modal is closing to avoid double triggers
    if(modalClosing){ return }
    modalClosing = true
    
    // remove the closing events for the modal since we are closing it now
    setModalEventListeners(false)
    
    // then start the close process
    shownModal.addEventListener('transitionend', setCloseModalOptions)
    shownModal.removeAttribute('data-modal-open')

    // now we set up a function that returns after a set amount of time
    let modalStatus = await modalTransitionTimer(modalOptions)
    console.log(modalStatus)

    // reset the modal variables
    modalClosing = false
    openModalID = null
    shownModal = null
    return
}

function setCloseModalOptions(){
    // remove the listener for the transition
    shownModal.removeEventListener('transitionend', setCloseModalOptions)
    shownModal.style = ''
    setModalEventListeners(false)
    setOptions(false)
    shownModal.close()
    console.log('modal closed')
}

async function modalTransitionTimer(options){
    const timeOut = options.transitionTime + 50 || 1
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
            if(id === ''){ throw new Error('No id provided') }
            // if a modal is already open, then close the open one first
            if(openModalID !== null){ 
                await this.close(openModalID) 
            }

            // sanitize the options from the user
            options = new Options(options)
            // save the options for use later
            modalOptions = options
            // set the variables to check against
            openModalID = id
            shownModal = document?.getElementById(openModalID)

            // check to see if modal is opening to avoid double triggers
            if(modalOpening){ return }
            modalOpening = true
            // then run the open logic
            await openModal(options)
            // set the opening check back to false
            modalOpening = false
            return
        } catch (e) {
            if(vars.dev){ logger.error(e) }
            else{ console.log(e) }
        }
    }
    async close(){
        try {
            // there must be an open modal to close a modal
            if(openModalID === null){ throw new Error('no modal to close') }
                await closeModal()
                return
            }
        catch (e) {
            if(vars.dev){ logger.error(e) }
            else{ console.log(e) }
        }
    }
    async toggle(id = '', options = {}){
        try {
            if(id === ''){ throw new Error('No id provided')}
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