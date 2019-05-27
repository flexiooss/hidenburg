import {assert, isNull} from "flexio-jshelpers";

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

  getStateStore() {
    assert(!isNull(this.__stateStore), 'State Store not set')
    return this.__stateStore
  }

  getViewItemBuilder() {
    assert(!isNull(this.__viewItemBuilder), 'View Item Builder not set')
    return this.__viewItemBuilder;
  }

  getActionSelect() {
    assert(!isNull(this.__actionSelect), 'Action select not set')
    return this.__actionSelect;
  }

  getActionUnselect() {
    assert(!isNull(this.__actionUnselect), 'Action unselect not set')
    return this.__actionUnselect
  }

  getActionMultipleSelect() {
    assert(!isNull(this.__actionMultipleSelect), 'Action multiple select not set')
    return this.__actionMultipleSelect;
  }

  getActionItemListVisibility() {
    assert(!isNull(this.__actionItemListVisibility), 'Action item list visibility not set')
    return this.__actionItemListVisibility
  }

  getActionSearch() {
    assert(!isNull(this.__actionItemListVisibility), 'Action search not set')
    return this.__actionSearch
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
