import {ViewContainer, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewButtonConfig} from "./views/ViewButtonConfig";
import {ViewButton} from "./views/ViewButton";
import {PrivateActionItemListVisibilityBuilder} from "../../generated/io/flexio/component_select/actions/PrivateActionItemListVisibility";

export class ViewContainerButton extends ViewContainer {
  /**
   *
   * @param {ViewContainerButtonConfig} config
   */
  constructor(config) {
    let id = config.getComponentContext().nextID()
    let constructorConfig = new ViewContainerParameters(config.getComponentContext(), id, config.getParentNode())

    super(constructorConfig)

    this.__proxyStore = config.getDataStore()
    this.__stateStore = config.getStateStore()
    this.__actionItemListVisibility = config.getActionItemListVisibility()
    this.__properties = config.getProperties()
  }

  createView() {
    let config = new ViewButtonConfig()
      .withViewContainer(this)
      .withActionItemListVisibility(this.__actionItemListVisibility)
      .withDataStore(this.__proxyStore)
      .withStateStore(this.__stateStore)
      .withProperties(this.__properties)
      .withLayersManager(this.__layersManager)

    this.__buttonView = this.addView(new ViewButton(config))

    this.__handleEventsFromView()
  }

  __handleEventsFromView() {
    this.__buttonView.on().openList((event) => {
      this.__actionItemListVisibility.dispatch(
        new PrivateActionItemListVisibilityBuilder().visibility(true).build()
      )
    })
  }
}
