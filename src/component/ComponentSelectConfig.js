import {assert, isNull} from "flexio-jshelpers";
import {DefaultViewItemBuilder} from "../view/views/defaultViewItem/DefaultViewItemBuilder";

export class ComponentSelectConfig {
  constructor() {
    this.__parentNode = null
    this.__componentContext = null
    this.__proxyStore = null
    this.__viewItemBuilder = null
    this.__properties = {
      multiple: false,
      search: false,
      autoUpdateItems: true,
      pagination: false,
      autoCloseListNotMultiple: true
    }
  }

  /**
   * @param parentNode
   * @returns {ComponentSelectConfig}
   */
  withParentNode(parentNode) {
    this.__parentNode = parentNode
    return this
  }

  /**
   * @param {ComponentContext} componentContext
   * @returns {ComponentSelectConfig}
   */
  withComponentContext(componentContext) {
    this.__componentContext = componentContext
    return this
  }

  /**
   * @param {StoreInterface} proxyStore
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
  withOverrideViewItemBuilder(viewItem) {
    this.__viewItemBuilder = viewItem
    return this
  }

  withProperties(properties) {
    this.__properties = Object.assign({}, this.__properties, properties) // Attribute default value if not set
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
    if (isNull(this.__viewItemBuilder)) {
      return new DefaultViewItemBuilder()
    }
    return this.__viewItemBuilder;
  }

  getProperties() {
    return this.__properties
  }
}
