import {assertType} from 'flexio-jshelpers'
import {ComponentBootstrap} from './ComponentBootstrap'

const __component = Symbol('__componentBootstrapPublic')

export class ComponentBootstrapPublic {
  constructor(component) {
    assertType(component instanceof ComponentBootstrap, 'ComponentCounterPublic:constructor: `component` should be a ComponentBootstrap')
    /**
     * @private
     * @property {ComponentBootstrap} ComponentBootstrapPublic.__component
     */
    this[__component] = component
  }

  dispatchActionInitialize(message) {
    this[__component].dispatchActionInitialize(message)
  }
}
