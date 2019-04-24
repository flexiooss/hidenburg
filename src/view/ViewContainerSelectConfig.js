import {assert, isNull} from "flexio-jshelpers";

export class ViewContainerSelectConfig {
  constructor() {
    this.__componentContext = null
    this.__parentNode = null
    this.__dataPublicStore = null
    this.__accessors = null
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {ViewContainerSelectConfig}
   */
  withComponententContext(componentContext) {
    this.__componentContext = componentContext
    return this
  }

  /**
   *
   * @param parentNode
   * @returns {ViewContainerSelectConfig}
   */
  withParentNode(parentNode) {
    this.__parentNode = parentNode
    return this
  }

  /**
   *
   * @param {StoreInterface<*>} dataPublicStore
   * @returns {ViewContainerSelectConfig}
   */
  withDataPublicStore(dataPublicStore) {
    this.__dataPublicStore = dataPublicStore
    return this
  }


  /**
   *
   * @param {Map<string, function>} accessors
   * @returns {ViewContainerSelectConfig}
   */
  withAccessors(accessors) {
    this.__accessors = accessors
    return this
  }


  getComponentContext() {
    assert(!isNull(this.__componentContext), 'Public store not set')
    return this.__componentContext;
  }

  getParentNode() {
    assert(!isNull(this.__parentNode), 'Parent node not set')
    return this.__parentNode;
  }

  getDataPublicStore() {
    assert(!isNull(this.__dataPublicStore), 'Data public store not set')
    return this.__dataPublicStore;
  }

  getAccessors() {
    assert(!isNull(this.__accessors), 'Accessors not set')
    return this.__accessors;
  }
}
