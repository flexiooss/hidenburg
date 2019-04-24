import {assert, isNull} from "flexio-jshelpers";

export class ComponentSelectConfig {
  constructor() {
    this.__parentNode = null
    this.__componentContext = null
    this.__proxyStore = null
    this.__viewItemBuilder = null
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

  /**
   *
   * @param {ProxyStore} proxyStore
   * @returns {ComponentSelectConfig}
   */
  withProxyStore(proxyStore) {
    this.__proxyStore = proxyStore
    return this
  }

  /**
   *
   * @param {View} viewItem
   * @returns {ComponentSelectConfig}
   */
  withOverrodeViewItemBuilder(viewItem) {
    this.__viewItemBuilder = viewItem
    return this
  }

  getParentNode() {
    assert(!isNull(this.__parentNode), 'Parent node not set')
    return this.__parentNode;
  }

  getComponentContext() {
    assert(!isNull(this.__componentContext), 'Component context not set')
    return this.__componentContext;
  }

  getProxyStore() {
    assert(!isNull(this.__proxyStore), 'Proxy store not set')
    return this.__proxyStore;
  }

  getViewItemBuilder() {
    // Can be null, uses default view
    return this.__viewItemBuilder;
  }
}
