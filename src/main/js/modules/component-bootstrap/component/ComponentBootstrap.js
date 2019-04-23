'use strict'
import {TypeCheck} from 'hotballoon'

import {assertType, FLEXIO_IMPORT_OBJECT, isNode} from 'flexio-jshelpers'
import '../generated/io/package'
import {ActionInitializeUtils} from '../actions/ActionInitializeUtils/ActionInitializeUtils'

const ActionInitializeBuilder = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_bootstrap.actions.ActionInitializeBuilder

export class ComponentBootstrap {
  /**
   *
   * @param {ComponentContext} componentContext
   * @param {Element} parentNode
   */
  constructor(componentContext, parentNode) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'ComponentBootstrap:constructor: `componentContext` argument should be a ComponentContext, %s given',
      typeof componentContext
    )

    assertType(!!isNode(parentNode),
      'ComponentBootstrap:constructor: `parentNode` argument should be a NodeType, %s given',
      typeof parentNode
    )

    this.__componentContext = componentContext
    this.__parentNode = parentNode
  }

  /**
   *
   * @return {ComponentContext}
   */
  get componentContext() {
    return this.__componentContext
  }

  /**
   *
   * @return {ComponentBootstrap}
   */
  __initActionInitialize() {
    this.__actionInitialize = new ActionInitializeUtils(
      this.__componentContext.dispatcher(),
      this.__componentContext.APP(),
      this.__parentNode
    ).init().listen()
    return this
  }

  setEventLoop() {
    this.__initActionInitialize()
    return this
  }

  dispatchActionInitialize(message) {
    assertType(TypeCheck.isAction(this.__actionInitialize.action()),
      'ComponentBootstrap:dispatchActionInitialize: ActionInitialize should be initialized before using it'
    )
    this.__actionInitialize.action().dispatch(
      new ActionInitializeBuilder().message(message).build()
    )
  }
}
