import {assert, isNull} from "flexio-jshelpers";

export class ViewContainerSelectConfig {
  constructor() {
    this.__componentContext = null
    this.__parentNode = null
    this.__proxyStore = null
    this.__actionSelect = null
    this.__stateStore = null
  }

  /**
   * @param {ComponentContext} componentContext
   * @returns {ViewContainerSelectConfig}
   */
  withComponentContext(componentContext) {
    this.__componentContext = componentContext
    return this
  }

  /**
   * @param parentNode
   * @returns {ViewContainerSelectConfig}
   */
  withParentNode(parentNode) {
    this.__parentNode = parentNode
    return this
  }

  /**
   * @param {ProxyStore} proxyStore
   * @returns {ViewContainerSelectConfig}
   */
  withProxyStore(proxyStore) {
    this.__proxyStore = proxyStore
    return this
  }

  /**
   * @param {View} viewItemBuilder
   * @returns {ViewContainerSelectConfig}
   */
  withViewItemBuilder(viewItemBuilder) {
    this.__viewItemBuilder = viewItemBuilder
    return this
  }

  /**
   * @param {Action<ActionSelectItemPayload>} action
   * @returns {ViewContainerSelectConfig}
   */
  withActionSelect(action) {
    this.__actionSelect = action
    return this
  }

  /**
   * @param {StoreInterface} stateStore
   * @return {ViewContainerSelectConfig}
   */
  withStateStore(stateStore) {
    this.__stateStore = stateStore
    return this
  }

  /**
   * @param {Object} properties
   * @return {ViewSelectConfig}
   */
  withProperties(properties) {
    this.__properties = properties
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

  getProxyStore() {
    assert(!isNull(this.__proxyStore), 'Proxy Store not set')
    return this.__proxyStore;
  }

  getViewItemBuilder() {
    assert(!isNull(this.__viewItemBuilder), 'View Item Builder not set')
    return this.__viewItemBuilder;
  }

  getActionSelect() {
    assert(!isNull(this.__actionSelect), 'Action not set')
    return this.__actionSelect;
  }

  getStateStore() {
    assert(!isNull(this.__stateStore), 'State Store not set')
    return this.__stateStore
  }

  getProperties() {
    assert(!isNull(this.__properties), 'Properties not set')
    return this.__properties;
  }
}
