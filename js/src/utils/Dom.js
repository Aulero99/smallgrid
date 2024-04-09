import { vars } from "../_variables"

function get(id){
    return document.getElementById(id)
}

function kebabCase(key) {
    return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`)
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
    getDataAttributes(element){
        if(!element){
            return{}
        }
        if(element === string){
            element = get(element)
        }

        



        
    }

}

export const manipulator = new Manipulator()