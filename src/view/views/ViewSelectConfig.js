import {assert, isNull} from "flexio-jshelpers";
import {CloseStrategyBuilder} from "./defaultViewItem/close/CloseStrategyBuilder";

export class ViewSelectConfig {
  constructor() {
    this.__layers = null
    this.__viewContainer = null
    this.__dataStore = null
    this.__stateStore = null
    this.__viewItemBuilder = null
    this.__actionSelect = null
    this.__actionMultipleSelect = null
    this.__properties = null
    // Todo strategies
  }

  /**
   * @param {ComponentAtmosphereLayersPublicHandler} layers
   */
  withLayers(layers) {
    this.__layers = layers
    return this
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
   * @param {Action<PrivateActionSelectItemPayload>} actionSelect
   * @return {ViewSelectConfig}
   */
  withActionSelect(actionSelect) {
    this.__actionSelect = actionSelect
    return this
  }

  /**
   * @param {Action<PrivateActionSelectMultipleItemsPayload>} action
   * @return {ViewSelectConfig}
   */
  withActionMultipleSelect(action) {
    this.__actionMultipleSelect = action
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
   *
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  getLayers() {
    assert(!isNull(this.__layers), 'Layers not set')
    return this.__layers;
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

  getActionSelect() {
    assert(!isNull(this.__actionSelect), 'Action Select not set')
    return this.__actionSelect;
  }

  getActionMultipleSelect() {
    assert(!isNull(this.__actionMultipleSelect), 'Action multiple select not set')
    return this.__actionMultipleSelect;
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
