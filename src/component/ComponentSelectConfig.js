import {isNull, assert} from "@flexio-oss/assert";
import {DefaultViewItemBuilder} from "../view/select/views/defaultViewItem/DefaultViewItemBuilder";

export class ComponentSelectConfig {
  constructor() {
    this.__componentContext = null
    this.__store = null
    this.__viewItemBuilder = new DefaultViewItemBuilder()
    this.__layersManager = null
    this.__properties = {
      multiple: false,
      search: false,
      autoUpdateItems: true,
      pagination: false,
      autoCloseListNotMultiple: true,
      placeholder: 'Choisir ...'
    }
  }

  /**
   * @param {ComponentContext} componentContext
   * @returns {ComponentSelectConfig}
   */
  withComponentContext(componentContext) {
    this.__componentContext = componentContext
    return this
  }

  /**
   * @param {StoreInterface} store
   * @returns {ComponentSelectConfig}
   */
  withStore(store) {
    this.__store = store
    return this
  }

  /**
   * @param {View} viewItem
   * @returns {ComponentSelectConfig}
   */
  withOverrideViewItemBuilder(viewItem) {
    this.__viewItemBuilder = viewItem
    return this
  }

  /**
   * @param {object} properties
   * @return {ComponentSelectConfig}
   */
  withProperties(properties) {
    this.__properties = Object.assign({}, this.__properties, properties) // Attribute default value if not set
    return this
  }

  /**
   * @param {ComponentAtmosphereLayersPublicHandler} layersManager
   * @return {ComponentSelectConfig}
   */
  withLayersManager(layersManager) {
    this.__layersManager = layersManager
    return this
  }

  /**
   * @return {ComponentContext}
   */
  getComponentContext() {
    assert(!isNull(this.__componentContext), 'Component context not set')
    return this.__componentContext;
  }

  /**
   * @return {StoreInterface}
   */
  getStore() {
    assert(!isNull(this.__store), 'Store not set')
    return this.__store;
  }

  /**
   * @return {ViewItemBuilder}
   */
  getViewItemBuilder() {
    return this.__viewItemBuilder
  }

  /**
   * @return {object}
   */
  getProperties() {
    return this.__properties
  }

  /**
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  getLayersManager() {
    assert(!isNull(this.__layersManager), 'Layers manager not set')
    return this.__layersManager
  }
}
