import {ViewContainer, ViewContainerParameters} from 'hotballoon'
import {ViewSelect} from "./views/ViewSelect";

export class ViewContainerSelect extends ViewContainer {
  /**
   *
   * @param {ViewContainerSelectConfig} config
   */
  constructor(config) {
    let id = config.getComponentContext().nextID()
    let constructorConfig = new ViewContainerParameters(config.getComponentContext(), id, config.getParentNode())

    super(constructorConfig)

    this.__config = config
  }

  __createViewItems() {
    this.__selectView = this.addView(new ViewSelect(this, this.__config.getProxyStore(), this.__config.getViewItemBuilder()))
    this.__selectView.initView()
  }
}
