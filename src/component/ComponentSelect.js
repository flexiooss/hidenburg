import {ViewContainerSelect} from "../view/ViewContainerSelect";
import {ViewContainerSelectConfig} from "../view/ViewContainerSelectConfig";
import {PrivateActionSelectItemBuilder} from "../actions/PrivateActionSelectItemBuilder";
import {EventListenerOrderedBuilder} from "hotballoon";
import {STORE_CHANGED} from "hotballoon/src/js/Store/StoreInterface";
import {MultipleList} from "./ListManager/MultipleList";
import {UniqueList} from "./ListManager/UniqueList";
import {PrivateActionSelectMultipleItemsBuilder} from "../actions/PrivateActionSelectMultipleItemsBuilder";
import {Component} from "hotballoon/src/js/Component/Component";

export class ComponentSelect extends Component {
  /**
   * @param {ComponentSelectConfig} config
   */
  constructor(config) {
    super()
    this.__componentContext = config.getComponentContext()
    this.__store = config.getStore()
    this.__viewItemBuilder = config.getViewItemBuilder()
    this.__properties = config.getProperties()
    this.__parentNode = config.getParentNode()
    this.__layersManager = config.getLayersManager()

    this.__privateActionSelect = new PrivateActionSelectItemBuilder(this.__componentContext.dispatcher()).init()
    this.__privateActionSelectMultiple = new PrivateActionSelectMultipleItemsBuilder(this.__componentContext.dispatcher()).init()

    this.__listManager = (this.__properties.multiple) ? new MultipleList(this.__componentContext) : new UniqueList(this.__componentContext)
    this.__initStateStore()

    this.__handleUpdateFromProxyStore()
    this.__handleEventsFromPrivateActions()
  }

  __initStateStore() {
    this.__listManager.initStateStore(this.__store)
  }

  mountView() {
    this.__selectLayer = this.__layersManager.addLayer()
    // console.log(this.__selectLayer)

    let config = new ViewContainerSelectConfig()
      .withParentNode(this.__parentNode)
      .withDataStore(this.__store)
      .withStateStore(this.__listManager.getPublicStateStore())
      .withComponentContext(this.__componentContext)
      .withActionSelect(this.__privateActionSelect)
      .withActionMultipleSelect(this.__privateActionSelectMultiple)
      .withViewItemBuilder(this.__viewItemBuilder)
      .withProperties(this.__properties)
      .withComponent(this)

    this.__viewContainer = new ViewContainerSelect(config)
    this.__viewContainer.createViewItems()
    this.__viewContainer.renderAndMount()

    this.__layersManager.showLayer(this.__selectLayer.id())
    return this
  }

  __handleEventsFromPrivateActions() {
    this.__privateActionSelect.listenWithCallback(
      (payload) => {
        this.__listManager.performSelectEvent(payload.item())
      }
    )
    this.__privateActionSelectMultiple.listenWithCallback(
      (payload) => {
        this.__listManager.performMultipleSelectEvent(payload.itemTo())
      }
    )
  }

  __handleUpdateFromProxyStore() {
    this.__store.subscribe(
      EventListenerOrderedBuilder
        .listen(STORE_CHANGED)
        .callback((payload) => {
          this.__initStateStore()
        })
        .build()
    )
  }

  /**
   * @return {Array}
   */
  getSelectedItemsId() {
    return this.__listManager.getSelectedItemsId()
  }

  /**
   * @return {Array}
   */
  getSelectedItems() {
    return this.__listManager.getSelectedItems()
  }

  /**
   * @return {Action<PublicActionSelectItemPayload>}
   */
  getPublicActionSelect() {
    return this.__listManager.__publicActionSelect
  }

  /**
   * @return {Action<PublicActionSelectedItemPayload>}
   */
  getPublicActionSelected() {
    return this.__listManager.__publicActionSelected
  }

  /**
   * @return {Action<PublicActionUnselectedItemPayload>}
   */
  getPublicActionUnselected() {
    return this.__listManager.__publicActionUnselected
  }
}
