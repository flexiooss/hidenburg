import {ViewContainerSelect} from "../view/ViewContainerSelect";
import {ViewContainerSelectConfig} from "../view/ViewContainerSelectConfig";
import {PrivateActionSelectItemBuilder} from "../actions/PrivateActionSelectItemBuilder";
import {EventListenerOrderedBuilder} from "hotballoon";
import {STORE_CHANGED} from "hotballoon/src/js/Store/StoreInterface";
import {MultipleList} from "./ListManager/MultipleList";
import {UniqueList} from "./ListManager/UniqueList";

export class ComponentSelect {
  /**
   *
   * @param {ComponentSelectConfig} config
   */
  constructor(config) {
    this.__componentContext = config.getComponentContext()
    this.__proxyStore = config.getProxyStore()
    this.__viewItemBuilder = config.getViewItemBuilder()
    this.__properties = config.getProperties()
    this.__privateActionSelect = new PrivateActionSelectItemBuilder(this.__componentContext.dispatcher()).init()

    this.__listManager = (this.__properties.multiple) ? new MultipleList(this.__componentContext) : new UniqueList(this.__componentContext)
    this.__initStateStore()
    this.__handleUpdateFromProxyStore()
  }

  __initStateStore() {
    this.__listManager.initStateStore(this.__proxyStore)
  }

  /**
   *
   * @param parentNode
   */
  initView(parentNode) {
    this.__parentNode = parentNode

    let config = new ViewContainerSelectConfig()
      .withParentNode(this.__parentNode)
      .withProxyStore(this.__proxyStore)
      .withStateStore(this.__listManager.getPublicStateStore())
      .withComponentContext(this.__componentContext)
      .withActionSelect(this.__privateActionSelect)
      .withViewItemBuilder(this.__viewItemBuilder)
      .withProperties(this.__properties)

    this.__viewContainer = new ViewContainerSelect(config)
    this.__viewContainer.createViewItems()
    this.__viewContainer.renderAndMount()

    this.__handleEventsFromView()
  }

  __handleEventsFromView() {
    this.__privateActionSelect.listenWithCallback(
      (payload) => {
        this.__listManager.performSelectEvent(payload.item())
        this.__listManager.dispatchPublicEvents()
      }
    )
  }

  __handleUpdateFromProxyStore() {
    this.__proxyStore.subscribe(
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
