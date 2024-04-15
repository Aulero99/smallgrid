import { vars } from "./_variables"

function get(id){
    return document.getElementById(id)
}

function kebabCase(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`)
}

function normalizeData(value) {
    if (value === 'true') {
      return true
    }
  
    if (value === 'false') {
      return false
    }
  
    if (value === Number(value).toString()) {
      return Number(value)
    }
  
    if (value === '' || value === 'null') {
      return null
    }
  
    if (typeof value !== 'string') {
      return value
    }
  
    try {
      return JSON.parse(decodeURIComponent(value))
    } catch {
      return value
    }
}

function execute(possibleCallback, args = [], defaultValue = possibleCallback) {
    return typeof possibleCallback === 'function' ? possibleCallback(...args) : defaultValue
}

function getTransitionDurationFromElement(element) {
    if (!element) {
      return 0
    }
  
    // Get transition-duration of the element
    let { transitionDuration, transitionDelay } = window.getComputedStyle(element)
  
    const floatTransitionDuration = Number.parseFloat(transitionDuration)
    const floatTransitionDelay = Number.parseFloat(transitionDelay)
  
    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0
    }
  
    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0]
    transitionDelay = transitionDelay.split(',')[0]
  
    return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * 1000
}

class Manipulator {

    setDataAttribute(element, key = '', value = ''){
        if(typeof element !== 'string'){
            element.setAttribute(`data-${vars.prefix}-${kebabCase(key)}`, value)
        }else(
            get(element).setAttribute(`data-${vars.prefix}-${kebabCase(key)}`, value)
        )
    }

    removeDataAttribute(element, key = '', value = ''){
        if(typeof element !== 'string'){
            element.removeAttribute(`data-${vars.prefix}-${kebabCase(key)}`, value)
        }else(
            get(element).removeAttribute(`data-${vars.prefix}-${kebabCase(key)}`, value)
        )
    }

    getDataAttributes(element) {
        if (!element) {
          return {}
        }
        const prefix = vars.prefix
        const attributes = {}
        const sKeys = Object.keys(element.dataset).filter(key => key.startsWith(`${prefix}`))
        for (const key of sKeys) {
          let pureKey = key.replace(`/^${prefix}/`, '')
          pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length)
          attributes[pureKey] = normalizeData(element.dataset[key])
        }
        return attributes
    }
    
    getDataAttribute(element, key) {
        return normalizeData(element.getAttribute(`data-bs-${kebabCase(key)}`))
    }

    executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
        if (!waitForTransition) {
          execute(callback)
          return
        }
      
        const durationPadding = 5
        const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding
      
        let called = false
      
        const handler = ({ target }) => {
          if (target !== transitionElement) {
            return
          }
      
          called = true
          transitionElement.removeEventListener(TRANSITION_END, handler)
          execute(callback)
        }
      
        transitionElement.addEventListener(TRANSITION_END, handler)
        setTimeout(() => {
          if (!called) {
            triggerTransitionEnd(transitionElement)
          }
        }, emulatedDuration)
      }

}

export const manipulator = new Manipulator()