import {ViewContainer, ViewContainerParameters} from 'hotballoon'
import {ViewSelect} from "./views/ViewSelect";
import {ViewSelectConfig} from "./views/ViewSelectConfig";

export class ViewContainerSelect extends ViewContainer {
  /**
   *
   * @param {ViewContainerSelectConfig} config
   */
  constructor(config) {
    let id = config.getComponentContext().nextID()
    let constructorConfig = new ViewContainerParameters(config.getComponentContext(), id, config.getParentNode())

    super(constructorConfig)

    this.__proxyStore = config.getProxyStore()
    this.__stateStore = config.getStateStore()
    this.__viewItemBuilder = config.getViewItemBuilder()
    this.__actionSelect = config.getActionSelect()

    this.__handleEvents()
  }

  createViewItems() {
    let config = new ViewSelectConfig()
      .withViewContainer(this)
      .withActionSelect(this.__actionSelect)
      .withViewItemBuilder(this.__viewItemBuilder)
      .withProxyStore(this.__proxyStore)
      .withStateStore(this.__stateStore)

    this.__selectView = this.addView(new ViewSelect(config))
  }

  __handleEvents() {
    this.__actionSelect.listenWithCallback(
      (payload) => {
        let item = payload.item()
      }
    )
  }
}
