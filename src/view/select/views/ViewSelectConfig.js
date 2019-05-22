import {assert, isNull} from "flexio-jshelpers";
import {CloseStrategyBuilder} from "./defaultViewItem/close/CloseStrategyBuilder";

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
   * @param {StoreInterface} store
   * @return {ViewSelectConfig}
   */
  withSearchStore(store) {
    this.__searchStore = store
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

  getSearchStore() {
    assert(!isNull(this.__searchStore), 'Search store not set')
    return this.__searchStore;
  }

  getViewItemBuilder() {
    assert(!isNull(this.__viewItemBuilder), 'View Item Builder not set')
    return this.__viewItemBuilder;
  }

  __getProperties() {
    assert(!isNull(this.__properties), 'Properties not set')
    return this.__properties;
  }

  getComponent() {
    assert(!isNull(this.__properties), 'Properties not set')
    return this.__component
  }

  /**
   * @return {CloseMultiple|CloseUnique}
   */
  getCloseStrategy() {
    return new CloseStrategyBuilder()
      .component(this.getComponent())
      .properties(this.__getProperties())
      .build()
  }
}
