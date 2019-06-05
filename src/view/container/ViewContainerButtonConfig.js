import {isNull, assert} from "@flexio-oss/assert";

export class ViewContainerButtonConfig {
  constructor() {
    this.__componentContext = null
    this.__parentNode = null
    this.__dataStore = null
    this.__actionItemListVisibility = null
    this.__stateStore = null
    this.__placeholder = null
  }

  /**
   * @param {ComponentContext} componentContext
   * @returns {ViewContainerButtonConfig}
   */
  withComponentContext(componentContext) {
    this.__componentContext = componentContext
    return this
  }

  /**
   * @param parentNode
   * @returns {ViewContainerButtonConfig}
   */
  withParentNode(parentNode) {
    this.__parentNode = parentNode
    return this
  }

  /**
   * @param {StoreInterface} store
   * @returns {ViewContainerButtonConfig}
   */
  withDataStore(store) {
    this.__dataStore = store
    return this
  }

  /**
   * @param {StoreInterface} stateStore
   * @return {ViewContainerButtonConfig}
   */
  withStateStore(stateStore) {
    this.__stateStore = stateStore
    return this
  }

  /**
   * @param {Action<PrivateActionItemListVisibility>} action
   * @return {ViewContainerButtonConfig}
   */
  withActionItemListVisibility(action) {
    this.__actionItemListVisibility = action
    return this
  }

  /**
   * @param {string} placeholder
   * @return {ViewContainerButtonConfig}
   */
  withPlaceholder(placeholder){
    this.__placeholder = placeholder
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
   * @return {Action<PrivateActionItemListVisibility>}
   */
  getActionItemListVisibility() {
    assert(!isNull(this.__actionItemListVisibility), 'Action item list visibility not set')
    return this.__actionItemListVisibility
  }

  /**
   * @return {string}
   */
  getPlaceholder(){
    assert(!isNull(this.__placeholder), 'Placeholder not set')
    return this.__placeholder
  }
}
