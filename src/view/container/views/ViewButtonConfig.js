import {isNull, assert} from "@flexio-oss/assert";

export class ViewButtonConfig {
  constructor() {
    this.__viewContainer = null
    this.__dataStore = null
    this.__stateStore = null
  }

  /**
   * @param {ViewContainer} viewContainer
   * @return {ViewButtonConfig}
   */
  withViewContainer(viewContainer) {
    this.__viewContainer = viewContainer
    return this
  }

  /**
   * @param {StoreInterface} store
   * @return {ViewButtonConfig}
   */
  withDataStore(store) {
    this.__dataStore = store
    return this
  }

  /**
   * @param {Action<PrivateActionItemListVisibility>} action
   * @return {ViewButtonConfig}
   */
  withActionItemListVisibility(action) {
    this.__actionItemListVisibility = action
    return this
  }

  /**
   * @param {StoreInterface} stateStore
   * @return {ViewButtonConfig}
   */
  withStateStore(stateStore) {
    this.__stateStore = stateStore
    return this
  }

  /**
   * @return {ViewContainer}
   */
  getViewContainer() {
    assert(!isNull(this.__viewContainer), 'View container not set')
    return this.__viewContainer;
  }

  /**
   * @return {StoreInterface}
   */
  getDataStore() {
    assert(!isNull(this.__dataStore), 'Data store not set')
    return this.__dataStore;
  }

  /**
   * @return {StoreInterface}
   */
  getStateStore() {
    assert(!isNull(this.__stateStore), 'State store not set')
    return this.__stateStore;
  }
}
