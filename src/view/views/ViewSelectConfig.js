import {assert, isNull} from "flexio-jshelpers";

export class ViewSelectConfig {
  constructor() {
    this.__viewContainer = null
    this.__proxyStore = null
    this.__stateStore = null
    this.__viewItemBuilder = null
    this.__actionSelect = null
  }

  /**
   * @param {ViewContainer} viewContainer
   * @return {ViewSelectConfig}
   */
  withViewContainer(viewContainer) {
    this.__viewContainer = viewContainer
    return this
  }

  /**
   * @param {StoreInterface} proxyStore
   * @return {ViewSelectConfig}
   */
  withProxyStore(proxyStore) {
    this.__proxyStore = proxyStore
    return this
  }

  withViewItemBuilder(viewItemBuilder) {
    this.__viewItemBuilder = viewItemBuilder
    return this
  }

  /**
   * @param {Action<ActionSelectItemPayload>} actionSelect
   * @return {ViewSelectConfig}
   */
  withActionSelect(actionSelect) {
    this.__actionSelect = actionSelect
    return this
  }

  /**
   * @param {StoreInterface} stateStore
   * @return {ViewSelectConfig}
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

  getViewContainer() {
    assert(!isNull(this.__viewContainer), 'View container not set')
    return this.__viewContainer;
  }

  getProxyStore() {
    assert(!isNull(this.__proxyStore), 'Proxy store not set')
    return this.__proxyStore;
  }

  getStateStore() {
    assert(!isNull(this.__stateStore), 'State store not set')
    return this.__stateStore;
  }

  getViewItemBuilder() {
    assert(!isNull(this.__viewItemBuilder), 'View Item Builder not set')
    return this.__viewItemBuilder;
  }

  getActionSelect() {
    assert(!isNull(this.__actionSelect), 'Action Select not set')
    return this.__actionSelect;
  }

  getProperties() {
    assert(!isNull(this.__properties), 'Properties not set')
    return this.__properties;
  }

}
