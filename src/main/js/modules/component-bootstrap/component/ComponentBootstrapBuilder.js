import {ComponentBootstrap} from './ComponentBootstrap'
import {ComponentBootstrapPublic} from './ComponentBootstrapPublic'
import {TypeCheck} from 'hotballoon'
import {assert, isNode} from 'flexio-jshelpers'

export class ComponentBootstrapBuilder {
  /**
   *
   * @param {HotBalloonApplication} APP
   * @param {Element} parentNode
   * @return {ComponentBootstrapPublic}
   */
  static build(APP, parentNode) {
    assert(TypeCheck.isHotballoonApplication(APP),
      'ComponentBootstrapBuilder:constructor: `APP` argument should be an instanceof HotballoonApplication, %s given',
      typeof APP)

    assert(!!isNode(parentNode),
      'ComponentBootstrapBuilder:constructor: `parentNode` argument should be NodeType, %s given',
      typeof parentNode)

    return new ComponentBootstrapPublic(
      new ComponentBootstrap(
        APP.addComponentContext(),
        parentNode
      ).setEventLoop()
    )
  }
}
