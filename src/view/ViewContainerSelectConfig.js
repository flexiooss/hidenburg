import {assert, isNull} from "flexio-jshelpers";

export class ViewContainerSelectConfig {
  constructor() {
    this.__componentContext = null
    this.__parentNode = null
    this.__dataStore = null
    this.__actionSelect = null
    this.__stateStore = null
    this.__component = null
  }

  /**
   * @param {ComponentContext} componentContext
   * @returns {ViewContainerSelectConfig}
   */
  withComponentContext(componentContext) {
    this.__componentContext = componentContext
    return this
  }

  /**
   * @param parentNode
   * @returns {ViewContainerSelectConfig}
   */
  withParentNode(parentNode) {
    this.__parentNode = parentNode
    return this
  }

  /**
   * @param {StoreInterface} store
   * @returns {ViewContainerSelectConfig}
   */
  withDataStore(store) {
    this.__dataStore = store
    return this
  }

  /**
   * @param {View} viewItemBuilder
   * @returns {ViewContainerSelectConfig}
   */
  withViewItemBuilder(viewItemBuilder) {
    this.__viewItemBuilder = viewItemBuilder
    return this
  }

  /**
   * @param {Action<PrivateActionSelectItemPayload>} action
   * @returns {ViewContainerSelectConfig}
   */
  withActionSelect(action) {
    this.__actionSelect = action
    return this
  }

  /**
   * @param {StoreInterface} stateStore
   * @return {ViewContainerSelectConfig}
   */
  withStateStore(stateStore) {
    this.__stateStore = stateStore
    return this
  }

  /**
   * @param {Object} properties
   * @return {ViewContainerSelectConfig}
   */
  withProperties(properties) {
    this.__properties = properties
    return this
  }

  /**
   * @param {ComponentSelect} component
   * @return {ViewContainerSelectConfig}
   */
  withComponent(component) {
    this.__component = component
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

  getDataStore() {
    assert(!isNull(this.__dataStore), 'Data Store not set')
    return this.__dataStore;
  }

  getViewItemBuilder() {
    assert(!isNull(this.__viewItemBuilder), 'View Item Builder not set')
    return this.__viewItemBuilder;
  }

  getActionSelect() {
    assert(!isNull(this.__actionSelect), 'Action not set')
    return this.__actionSelect;
  }

  getStateStore() {
    assert(!isNull(this.__stateStore), 'State Store not set')
    return this.__stateStore
  }

  getProperties() {
    assert(!isNull(this.__properties), 'Properties not set')
    return this.__properties;
  }

  getComponent() {
    assert(!isNull(this.__properties), 'Properties not set')
    return this.__component
  }
}
