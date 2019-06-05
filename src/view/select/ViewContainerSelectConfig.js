import {isNull, assert} from "@flexio-oss/assert";

export class ViewContainerSelectConfig {
  constructor() {
    this.__componentContext = null
    this.__parentNode = null
    this.__dataStore = null
    this.__actionSelect = null
    this.__actionUnselect = null
    this.__actionMultipleSelect = null
    this.__actionItemListVisibility = null
    this.__actionSearch = null
    this.__stateStore = null
    this.__component = null
    this.__properties = null
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
   * @param {ViewItemBuilder} viewItemBuilder
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
   * @param {Action<PrivateActionUnselectPayload>} action
   * @return {ViewContainerSelectConfig}
   */
  withActionUnselect(action) {
    this.__actionUnselect = action
    return this
  }

  /**
   * @param {Action<PrivateActionSelectMultipleItemsPayload>} action
   * @return {ViewContainerSelectConfig}
   */
  withActionMultipleSelect(action) {
    this.__actionMultipleSelect = action
    return this
  }

  /**
   * @param {Action<PrivateActionItemListVisibility>} action
   * @return {ViewContainerSelectConfig}
   */
  withActionItemListVisibility(action) {
    this.__actionItemListVisibility = action
    return this
  }

  /**
   * @param {Action<PrivateActionSearchPayload>} action
   * @return {ViewContainerSelectConfig}
   */
  withActionSearch(action) {
    this.__actionSearch = action
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

  /**
   * @return {ComponentContext}
   */
  getComponentContext() {
    assert(!isNull(this.__componentContext), 'Public store not set')
    return this.__componentContext;
  }

  /**
   * @return {Element}
   */
  getParentNode() {
    assert(!isNull(this.__parentNode), 'Parent node not set')
    return this.__parentNode;
  }

  /**
   * @return {StoreInterface}
   */
  getDataStore() {
    assert(!isNull(this.__dataStore), 'Data Store not set')
    return this.__dataStore;
  }

  /**
   * @return {StoreInterface}
   */
  getStateStore() {
    assert(!isNull(this.__stateStore), 'State Store not set')
    return this.__stateStore
  }

  /**
   * @return {ViewItemBuilder}
   */
  getViewItemBuilder() {
    assert(!isNull(this.__viewItemBuilder), 'View Item Builder not set')
    return this.__viewItemBuilder;
  }

  /**
   * @return {Action<PrivateActionSelectItemPayload>}
   */
  getActionSelect() {
    assert(!isNull(this.__actionSelect), 'Action select not set')
    return this.__actionSelect;
  }

  /**
   * @return {Action<PrivateActionUnselectPayload>}
   */
  getActionUnselect() {
    assert(!isNull(this.__actionUnselect), 'Action unselect not set')
    return this.__actionUnselect
  }

  /**
   * @return {Action<PrivateActionSelectMultipleItemsPayload>}
   */
  getActionMultipleSelect() {
    assert(!isNull(this.__actionMultipleSelect), 'Action multiple select not set')
    return this.__actionMultipleSelect;
  }

  /**
   * @return {Action<PrivateActionItemListVisibility>}
   */
  getActionItemListVisibility() {
    assert(!isNull(this.__actionItemListVisibility), 'Action item list visibility not set')
    return this.__actionItemListVisibility
  }

  /**
   * @return {Action<PrivateActionSearchPayload>}
   */
  getActionSearch() {
    assert(!isNull(this.__actionItemListVisibility), 'Action search not set')
    return this.__actionSearch
  }

  /**
   * @return {Object}
   */
  getProperties() {
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
}
