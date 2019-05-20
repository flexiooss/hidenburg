import {assert, isNull} from "flexio-jshelpers";
import {DefaultViewItemBuilder} from "../view/views/defaultViewItem/DefaultViewItemBuilder";

export class ComponentSelectConfig {
  constructor() {
    this.__componentContext = null
    this.__store = null
    this.__viewItemBuilder = new DefaultViewItemBuilder()
    this.__parentNode = null
    this.__layersManager = null
    this.__properties = {
      multiple: false,
      search: false,
      autoUpdateItems: true,
      pagination: false,
      autoCloseListNotMultiple: true
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

  withParentNode(parentNode) {
    this.__parentNode = parentNode
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

  getComponentContext() {
    assert(!isNull(this.__componentContext), 'Component context not set')
    return this.__componentContext;
  }

  getStore() {
    assert(!isNull(this.__store), 'Store not set')
    return this.__store;
  }

  getViewItemBuilder() {
    return this.__viewItemBuilder
  }

  getProperties() {
    return this.__properties
  }

  getParentNode() {
    console.log(this.__parentNode)
    assert(!isNull(this.__parentNode), 'Parent node not set')
    return this.__parentNode
  }

  /**
   * @return {ComponentAtmosphereLayersPublicHandler}
   */
  getLayersManager() {
    assert(!isNull(this.__layersManager), 'Layers manager not set')
    return this.__layersManager
  }
}
