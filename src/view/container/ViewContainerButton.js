import {ViewContainer, ViewContainerParameters} from '@flexio-oss/hotballoon'
import {ViewButtonConfig} from "./views/ViewButtonConfig";
import {ViewButton} from "./views/ViewButton";
import {PrivateActionItemListVisibilityBuilder} from "../../../generated/io/flexio/hidenburg/actions/PrivateActionItemListVisibility";

export class ViewContainerButton extends ViewContainer {
  /**
   *
   * @param {ViewContainerButtonConfig} config
   */
  constructor(config) {
    let id = config.getComponentContext().nextID()
    let constructorConfig = new ViewContainerParameters(config.getComponentContext(), id, config.getParentNode())

    super(constructorConfig)

    this.__config = config
  }

  createView() {
    let config = new ViewButtonConfig()
      .withViewContainer(this)
      .withActionItemListVisibility(this.__config.getActionItemListVisibility())
      .withDataStore(this.__config.getDataStore())
      .withStateStore(this.__config.getStateStore())
      .withPlaceholder(this.__config.getPlaceholder())

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
