import { logger } from "./Logger"

let modalId = null

function setFocus(){
    // Check to see if an element has the autofocus attribute applied,
    // and if not apply it to the first child of the element.
    let autofocus = 0
    const modal = document.getElementById(modalId)
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
    const modal = document.getElementById(modalId)
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
    const modal = document.getElementById(modalId)
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
    const modal = document.getElementById(modalId)
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

function openModal(){
    // check to see if there is a target first
    if(modalId == null){ return }
    // then get the element from the dom
    const modal = document.getElementById(modalId)
    
    // Make sure the modal has a focusable target before opening
    setFocus()

    // then open the modal
    // modal.setAttribute('open', '')
    modal.showModal()

    // register the closing events for the modal
    addModalEventListeners(modal)

    return
}

function closeModal(){
    // check to see if there is a target to open first
    if(modalId == null){ return }
    // get the element from the dom
    const modal = document.getElementById(modalId)
    // then set the target to null to avoid double triggers of this function 
    modalId = null
    
    // remove the closing events for the modal since we are closing it now
    removeModalEventListeners(modal)

    // then close the modal
    // modal.removeAttribute('open')
    modal.close()

    return
}

function addModalEventListeners(modal){
    // Default override for the modal
    modal.addEventListener('cancel', (event) => {
        event.preventDefault();
    });
    // Escape key listener
    document.addEventListener('keydown', awaitEscKeyCloseModal)
    // Out click listener, odd glitch necessitated 1 ms timeout
    setTimeout(()=>{
        window.addEventListener('click', awaitOutClickCloseModal)
    }, "1")
    // Touch listener
    window.addEventListener('touchstart', awaitOutTouchStartToCloseModal)
    // TODO - add touch logic
}

function removeModalEventListeners(modal){
    modal.removeEventListener('cancel', (event) => {
        event.preventDefault();
    });
    window.removeEventListener('click', awaitOutClickCloseModal)
    document.removeEventListener('keydown', awaitEscKeyCloseModal)
    window.removeEventListener('touchstart', awaitOutTouchStartToCloseModal)
}

class Modal{

    constructor(){ }

    open(id){
        // if a modal is already open, then close the open one first
        if(modalId !== null){ this.close(modalId) }
        // identify the modal to be targeted
        modalId = id
        // then run the open logic
        openModal()
        return
    }
    close(id){
        // if there is a modal already open, close it first
        if(modalId !== null && modalId !== id){
            logger.log('detected mismatch on modal id, closing original modal')
            closeModal()
        }
        // then set the target of the closing modal
        modalId = id
        // then close the modal
        closeModal()
        return
    }
    toggle(id){
        if(modalId === null || modalId !== id){
            // open a modal if no modal is open or if the id provided is not the
            // id of the currently open modal
            this.open(id)
            return
        }else{
            // close the modal if the open modal is equal to the id provided
            this.close(id)
            return
        }
    }
}

export const modal = new Modal()