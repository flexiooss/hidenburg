import {assert, isNull} from "flexio-jshelpers";

export class ViewContainerSelectConfig {
  constructor() {
    this.__componentContext = null
    this.__parentNode = null
    this.__proxyStore = null
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {ViewContainerSelectConfig}
   */
  withComponentContext(componentContext) {
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
   * @param {ProxyStoreInterface} proxyStore
   * @returns {ViewContainerSelectConfig}
   */
  withProxyStore(proxyStore) {
    this.__proxyStore = proxyStore
    return this
  }

  /**
   *
   * @param viewItemBuilder
   * @returns {ViewContainerSelectConfig}
   */
  withViewItemBuilder(viewItemBuilder) {
    this.__viewItemBuilder = viewItemBuilder
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
}
