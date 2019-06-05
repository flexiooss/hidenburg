import {CloseStrategyBuilder} from "./defaultViewItem/close/CloseStrategyBuilder";
import {isNull, assert} from "@flexio-oss/assert";

export class ViewSelectConfig {
  constructor() {
    this.__viewContainer = null
    this.__dataStore = null
    this.__stateStore = null
    this.__viewItemBuilder = null
    this.__properties = null
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
   * @param {StoreInterface} store
   * @return {ViewSelectConfig}
   */
  withDataStore(store) {
    this.__dataStore = store
    return this
  }

  /**
   * @param {ViewItemBuilder} viewItemBuilder
   * @return {ViewSelectConfig}
   */
  withViewItemBuilder(viewItemBuilder) {
    this.__viewItemBuilder = viewItemBuilder
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

  /**
   * @param {ComponentSelect} component
   * @return {ViewSelectConfig}
   */
  withComponent(component) {
    this.__component = component
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

  /**
   * @return {ViewItemBuilder}
   */
  getViewItemBuilder() {
    assert(!isNull(this.__viewItemBuilder), 'View Item Builder not set')
    return this.__viewItemBuilder;
  }

  __getProperties() {
    assert(!isNull(this.__properties), 'Properties not set')
    return this.__properties;
  }

  /**
   * @return {ComponentSelect}
   */
  getComponent() {
    assert(!isNull(this.__properties), 'Properties not set')
    return this.__component
  }

  /**
   * @return {AbstractCloseStrategy}
   */
  getCloseStrategy() {
    return new CloseStrategyBuilder()
      .component(this.getComponent())
      .properties(this.__getProperties())
      .build()
  }
}
