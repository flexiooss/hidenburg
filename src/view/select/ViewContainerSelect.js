import {ViewContainer, ViewContainerParameters} from 'hotballoon'
import {ViewSelect} from "./views/ViewSelect";
import {ViewSelectConfig} from "./views/ViewSelectConfig";
import {PrivateActionItemListVisibilityBuilder} from "../../generated/io/flexio/component_select/actions/PrivateActionItemListVisibility";
import {PrivateActionSelectItemPayloadBuilder} from "../../generated/io/flexio/component_select/actions/PrivateActionSelectItemPayload";
import {PrivateActionSelectMultipleItemsPayloadBuilder} from "../../generated/io/flexio/component_select/actions/PrivateActionSelectMultipleItemsPayload";

export class ViewContainerSelect extends ViewContainer {
  /**
   *
   * @param {ViewContainerSelectConfig} config
   */
  constructor(config) {
    let id = config.getComponentContext().nextID()
    console.log(config.getParentNode())
    let constructorConfig = new ViewContainerParameters(config.getComponentContext(), id, config.getParentNode())

    super(constructorConfig)

    this.__proxyStore = config.getDataStore()
    this.__stateStore = config.getStateStore()
    this.__viewItemBuilder = config.getViewItemBuilder()
    this.__actionSelect = config.getActionSelect()
    this.__actionMultipleSelect = config.getActionMultipleSelect()
    this.__actionItemListVisibility = config.getActionItemListVisibility()
    this.__properties = config.getProperties()
    this.__component = config.getComponent()
  }

  createView() {
    let config = new ViewSelectConfig()
      .withViewContainer(this)
      .withViewItemBuilder(this.__viewItemBuilder)
      .withDataStore(this.__proxyStore)
      .withStateStore(this.__stateStore)
      .withProperties(this.__properties)
      .withComponent(this.__component)

    this.__selectView = this.addView(new ViewSelect(config))

    this.__handleEventsFromView()
  }

  onShow() {
    this.__selectView.onShow()
  }

  onHide() {
    this.__selectView.onHide()
  }

  __handleEventsFromView() {
    this.__selectView.on().close((event) => {
      this.__actionItemListVisibility.dispatch(
        new PrivateActionItemListVisibilityBuilder().visibility(false).build()
      )
    })
    this.__selectView.on().selectItem((item) => {
      this.__actionSelect.dispatch(
        new PrivateActionSelectItemPayloadBuilder().item(item).build()
      )
    })
    this.__selectView.on().selectMultipleItems((item) => {
      this.__actionMultipleSelect.dispatch(
        new PrivateActionSelectMultipleItemsPayloadBuilder().itemTo(item).build()
      )
    })
  }
}
