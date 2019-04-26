export class ViewSelectConfig {
  constructor() {
    this.__viewContainer = null
    this.__proxyStore = null
    this.__stateStore = null
    this.__viewItemBuilder = null
    this.__actionSelect = null
  }

  /**
   *
   * @param {ViewContainer} viewContainer
   * @return {ViewSelectConfig}
   */
  withViewContainer(viewContainer) {
    this.__viewContainer = viewContainer
    return this
  }

  /**
   *
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
   *
   * @param {Action<ActionSelectItemPayload>} actionSelect
   * @return {ViewSelectConfig}
   */
  withActionSelect(actionSelect) {
    this.__actionSelect = actionSelect
    return this
  }

  /**
   *
   * @param {StoreInterface} stateStore
   * @return {ViewSelectConfig}
   */
  withStateStore(stateStore) {
    this.__stateStore = stateStore
    return this
  }

  getViewContainer() {
    return this.__viewContainer;
  }

  getProxyStore() {
    return this.__proxyStore;
  }

  getStateStore() {
    return this.__stateStore;
  }

  getViewItemBuilder() {
    return this.__viewItemBuilder;
  }

  getActionSelect() {
    return this.__actionSelect;
  }


}
