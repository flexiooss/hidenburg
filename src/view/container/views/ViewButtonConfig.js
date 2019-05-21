import {assert, isNull} from "flexio-jshelpers";

export class ViewButtonConfig {
  constructor() {
    this.__viewContainer = null
    this.__dataStore = null
    this.__stateStore = null
    this.__viewItemBuilder = null
    this.__properties = null

    // Todo strategies
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
   * @param {Object} properties
   * @return {ViewButtonConfig}
   */
  withProperties(properties) {
    this.__properties = properties
    return this
  }

  /**
   * @param {ComponentAtmosphereLayersPublicHandler} layersManager
   * @return {ViewButtonConfig}
   */
  withLayersManager(layersManager) {
    this.__layersManager = layersManager
    return this
  }

  getViewContainer() {
    assert(!isNull(this.__viewContainer), 'View container not set')
    return this.__viewContainer;
  }

  getDataStore() {
    assert(!isNull(this.__dataStore), 'Data store not set')
    return this.__dataStore;
  }

  getStateStore() {
    assert(!isNull(this.__stateStore), 'State store not set')
    return this.__stateStore;
  }

  getViewItemBuilder() {
    assert(!isNull(this.__viewItemBuilder), 'View Item Builder not set')
    return this.__viewItemBuilder;
  }

  __getProperties() {
    assert(!isNull(this.__properties), 'Properties not set')
    return this.__properties;
  }
}
