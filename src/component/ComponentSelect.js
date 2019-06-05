import {ViewContainerButton} from "../view/container/ViewContainerButton";
import {ViewContainerButtonConfig} from "../view/container/ViewContainerButtonConfig";
import {PrivateActionSelectItemBuilder} from "../actions/PrivateActionSelectItemBuilder";
import {EventListenerOrderedBuilder} from "@flexio-oss/hotballoon";
import {STORE_CHANGED} from "@flexio-oss/hotballoon/src/js/Store/StoreInterface";
import {MultipleList} from "./ListManager/MultipleList";
import {UniqueList} from "./ListManager/UniqueList";
import {PrivateActionSelectMultipleItemsBuilder} from "../actions/PrivateActionSelectMultipleItemsBuilder";
import {Component} from "@flexio-oss/hotballoon/src/js/Component/Component";
import {PrivateActionItemListVisibilityBuilder} from "../actions/PrivateActionItemListVisibilityBuilder";
import {ViewContainerSelectConfig} from "../view/select/ViewContainerSelectConfig";
import {ViewContainerSelect} from "../view/select/ViewContainerSelect";
import {PrivateActionSearchBuilder} from "../actions/PrivateActionSearchBuilder";
import {PrivateActionUnselectBuilder} from "../actions/PrivateActionUnselectBuilder";

export class ComponentSelect extends Component {
  /**
   * @param {ComponentSelectConfig} config
   */
  constructor(config) {
    super()
    this.__config = config
    this.__componentContext = config.getComponentContext()
    this.__store = config.getStore()
    this.__layersManager = config.getLayersManager()

    this.__privateActionSelect = new PrivateActionSelectItemBuilder(this.__componentContext.dispatcher()).init()
    this.__privateActionSelectMultiple = new PrivateActionSelectMultipleItemsBuilder(this.__componentContext.dispatcher()).init()
    this.__privateActionItemListVisibility = new PrivateActionItemListVisibilityBuilder(this.__componentContext.dispatcher()).init()
    this.__privateActionSearch = new PrivateActionSearchBuilder(this.__componentContext.dispatcher()).init()
    this.__privateActionUnselect = new PrivateActionUnselectBuilder(this.__componentContext.dispatcher()).init()

    this.__listManager = (this.__config.getProperties().multiple) ? new MultipleList(this.__componentContext) : new UniqueList(this.__componentContext)
    this.__initStateStore()

    this.__handleUpdateFromProxyStore()
    this.__handleEventsFromPrivateActions()
  }

  __initStateStore() {
    this.__listManager.initStore(this.__store)
  }

  mountView(node) {
    this.__parentNode = node

    this.__mountButtonSelect()
    this.__mountSelect()

    return this
  }

  __mountButtonSelect(){
    let config = new ViewContainerButtonConfig()
      .withParentNode(this.__parentNode)
      .withDataStore(this.__store)
      .withStateStore(this.__listManager.getPublicStateStore())
      .withComponentContext(this.__componentContext)
      .withActionItemListVisibility(this.__privateActionItemListVisibility)
      .withPlaceholder(this.__config.getProperties().placeholder)

    this.__viewContainerButton = new ViewContainerButton(config)
    this.__viewContainerButton.createView()
    this.__viewContainerButton.renderAndMount()
  }

  __mountSelect(){
    this.__selectLayer = this.__layersManager.addLayer()

    let config = new ViewContainerSelectConfig()
      .withParentNode(this.__layersManager.getElementByLayer(this.__selectLayer))
      .withDataStore(this.__store)
      .withStateStore(this.__listManager.getPublicStateStore())
      .withComponentContext(this.__componentContext)
      .withActionSelect(this.__privateActionSelect)
      .withActionUnselect(this.__privateActionUnselect)
      .withActionMultipleSelect(this.__privateActionSelectMultiple)
      .withActionItemListVisibility(this.__privateActionItemListVisibility)
      .withActionSearch(this.__privateActionSearch)
      .withViewItemBuilder(this.__config.getViewItemBuilder())
      .withProperties(this.__config.getProperties())
      .withComponent(this)

    this.__viewContainerSelect = new ViewContainerSelect(config)
    this.__viewContainerSelect.createView()
    this.__viewContainerSelect.renderAndMount()
  }

  __handleEventsFromPrivateActions() {
    this.__privateActionSelect.listenWithCallback(
      (payload) => {
        this.__listManager.performSelectEvent(payload.item())
      }
    )
    this.__privateActionUnselect.listenWithCallback(
      (payload) => {
        this.__listManager.performUnselectEvent(payload.item())
      }
    )
    this.__privateActionSelectMultiple.listenWithCallback(
      (payload) => {
        this.__listManager.performMultipleSelectEvent(payload.itemTo())
      }
    )
    this.__privateActionSearch.listenWithCallback(
      (payload) => {
        this.__listManager.performSearch(payload.label())
      }
    )
    this.__privateActionItemListVisibility.listenWithCallback(
      (payload) => {
        if (payload.visibility()) {
          this.__layersManager.showLayer(this.__selectLayer)
          this.__viewContainerSelect.onShow()
        } else {
          this.__layersManager.hideShowedLayer()
          this.__viewContainerSelect.onHide()
        }
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
   * @return {String[]}
   */
  getSelectedItemsId() {
    return this.__listManager.getSelectedItemsId()
  }

  /**
   * @return {Item[]}
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
