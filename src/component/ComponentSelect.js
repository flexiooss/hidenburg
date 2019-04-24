import {ViewContainerSelect} from "../view/ViewContainerSelect";
import {ViewContainerSelectConfig} from "../view/ViewContainerSelectConfig";

export class ComponentSelect {
  /**
   *
   * @param {ComponentSelectConfig} config
   */
  constructor(config) {
    this.__componentContext = config.getComponentContext()
    this.__parentNode = config.getParentNode()
    this.__publicStore = config.getPublicStore()

    this.__accessorProperties = new Map()
  }

  initView() {
    let config = ViewContainerSelectConfig()
      .withParentNode(this.__parentNode)
      .withAccessors(this.__accessorProperties)
      .withComponententContext(this.__componentContext)
      .withDataPublicStore(this.__publicStore)
    this.__viewContainer = new ViewContainerSelect(config)
    this.__viewContainer.renderAndMount(this.__parentNode)
  }

  /**
   *
   * @param {string} name
   * @param {function} clb
   * @returns {boolean}
   */
  addAccessorProperty(name, clb) {
    this.__accessorProperties.set(name, clb)
  }

  /**
   *
   * @param {string} name
   * @returns {boolean}
   */
  removeAccessorProperty(name) {
    return this.__accessorProperties.delete(name)
  }

  removeAllAccessors() {
    this.__accessorProperties.clear()
  }

  renderAndMountView() {

  }

}
