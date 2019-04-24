import {ViewContainerSelect} from "../view/ViewContainerSelect";
import {ViewContainerSelectConfig} from "../view/ViewContainerSelectConfig";
import {DefaultViewItemBuilder} from "../view/views/defaultViewItem/DefaultViewItemBuilder";
import {isNull} from "flexio-jshelpers";

export class ComponentSelect {
  /**
   *
   * @param {ComponentSelectConfig} config
   */
  constructor(config) {
    this.__componentContext = config.getComponentContext()
    this.__parentNode = config.getParentNode()
    this.__proxyStore = config.getProxyStore()
    this.__viewItemBuilder = config.getViewItemBuilder()
  }

  initView() {
    let config = ViewContainerSelectConfig()
      .withParentNode(this.__parentNode)
      .withProxyStore(this.__proxyStore)
      .withComponentContext(this.__componentContext)

    if (isNull(this.__viewItemBuilder)) {
      config.withViewItemBuilder(new DefaultViewItemBuilder(this))
    }

    this.__viewContainer = new ViewContainerSelect(config)
    this.__viewContainer.renderAndMount(this.__parentNode)
  }

}
