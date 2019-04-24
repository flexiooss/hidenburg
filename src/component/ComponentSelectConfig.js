import {assert, isNull} from "flexio-jshelpers";

export class ComponentSelectConfig {
  constructor() {
    this.__publicStore = null
    this.__parentNode = null
    this.__componentContext = null
  }

  /**
   *
   * @param {StoreInterface<*>} publicStore
   * @returns {ComponentSelectConfig}
   */
  withPublicStore(publicStore) {
    this.__publicStore = publicStore
    return this
  }

  /**
   *
   * @param parentNode
   * @returns {ComponentSelectConfig}
   */
  withParentNode(parentNode) {
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {ComponentSelectConfig}
   */
  withComponentContext(componentContext) {
    this.__componentContext = componentContext
    return this
  }


  getPublicStore() {
    assert(!isNull(this.__publicStore), 'Public store not set')
    return this.__publicStore;
  }

  getParentNode() {
    assert(!isNull(this.__parentNode), 'Parent node not set')
    return this.__parentNode;
  }

  getComponentContext() {
    assert(!isNull(this.__componentContext), 'Component context not set')
    return this.__componentContext;
  }
}
