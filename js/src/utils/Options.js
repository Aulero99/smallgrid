/* eslint-disable no-return-assign */
/* eslint-disable unicorn/no-array-reduce */
import { logger } from './Logger.js'
import { vars } from './_variables.js'

const root = document.querySelector(':root')

function getStyle(name) {
  const select = (root !== undefined && root !== null) ? getComputedStyle(root) : null
  if (select !== null) {
    return select.getPropertyValue(name)
  }
  return null
}

function returnNumbersOnly(string) {
  let output = ''
  for (const s of string) {
    if (!Number.isNaN(s) || s === '.') {
      output += s
    } else {
      break
    }
  }

  return Number(output)
}

function getCssRoot() {
  const cssVars = Array.from(document.styleSheets)
    .filter(
      sheet =>
        sheet.href === null || sheet.href.startsWith(window.location.origin)
    )
    .reduce(
      (acc, sheet) =>
        (acc = [
          ...acc,
          ...Array.from(sheet.cssRules).reduce(
            (def, rule) =>
              (def =
                rule.selectorText === ':root' ?
                  [
                    ...def,
                    ...Array.from(rule.style).filter(name =>
                      name.startsWith('--')
                    )
                  ] :
                  def),
            []
          )
        ]),
      []
    )
  return cssVars
}

class Options {
  importVariablesFromCss() {
    const root = getCssRoot()
    // logger.log('the found root is: ', root)
    console.log('the found root is: ', root)

    const prefix = getStyle('--prefix')
    vars.prefix = prefix

    console.log('the found prefix is: ', prefix)


    for (const element of root) {
      const key = element.slice(2)
      const val = getStyle(element)
      let set = null

      // skip if value is nulled
      if (val.length === 0) {
        continue
      }

      // skip the prefix
      if (key === 'prefix') {
        continue
      }

      // skip the vh100 and vw100 values, which we only need to set not get
      if (key === `${prefix}vh100` || key === `${prefix}vw100`) {
        continue
      }

      // skip the spacer, set that later
      if (key === `${prefix}spacer`) {
        continue
      }

      // skip if prefix is not detected, for the rest of the rooted variables
      if (!key.includes(prefix)) {
        continue
      }

      // set the value to a number if first digit is a number, otherwise set it as a string
      set = Number.isNaN(val[0]) ? val : returnNumbersOnly(val)

      vars[`${key.slice(prefix.length)}`] = set
    }

    // set the spacer as a result of the rem times the base px value of the font size
    const spacer = returnNumbersOnly(getStyle(`--${prefix}spacer`)) * returnNumbersOnly(window.getComputedStyle(document.body).fontSize)
    vars.spacer = spacer

    logger.log('The vars are now: ', vars)
    document.removeEventListener('DOMContentLoaded', options.importVariablesFromCss)
  }

  dev() {
    vars.dev = true
    logger.log('set dev mode to true')
  }

  normalize(value){
    if(value === 'true'){
      return true
    }
    if (value === 'false'){
      return false
    }
    if( value === '' || value === 'null' || !value || value === undefined){
       return null
    }
    if (value === Number(value).toString()){
      return Number(value)
    }
    if (typeof value !== 'string'){
      return value
    }
    try {
      return JSON.parse(decodeURIComponent(value))
    } catch {
      return value
    }
  }
}
export const options = new Options()
