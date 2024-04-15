import { vars } from '../utils/_variables.js'

export class Modal {
  constructor(data) {
    this.static = data.static || false
    this.scrollable = data.scrollable || false
    this.disableBodyScroll = data.disableBodyScroll || true
    this.centered = data.centered || false
    this.animation = data.animation || true
    this.transitionTime = data.transitionTime || vars['modal-transition-time'] ? vars['modal-transition-time'] : 1
  }
}
