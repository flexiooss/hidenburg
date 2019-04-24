import {ViewContainer, ViewContainerParameters} from 'hotballoon'
import {ViewSelect} from "./views/ViewSelect";

export class ViewContainerSelect extends ViewContainer {
  /**
   *
   * @param {ViewContainerSelectConfig} config
   */
  constructor(config) {
    let id = config.getComponentContext().nextID()
    let constructorConfig = ViewContainerParameters(config.getComponentContext(), id, config.getParentNode())

    super(constructorConfig)

    this.__dataStorePubblic = config.getDataPublicStore()
    this.__accessors = config.getAccessors()


    this.__createViews()

  }

  __createViews() {
    this.__selectView = this.addView(new ViewSelect(this, this.__dataStorePubblic, this.__accessors))
  }
}
