import {ViewContainerSelect} from "../view/ViewContainerSelect";
import {ViewContainerSelectConfig} from "../view/ViewContainerSelectConfig";
import {PrivateActionSelectItemBuilder} from "../actions/PrivateActionSelectItemBuilder";
import {StoreState} from "../stores/StoreState";
import {MapItemState} from "./MapItemState";
import {StoreStateItemBuilder} from "../generated/io/flexio/component_select/types/StoreStateItem";
import {EventListenerOrderedBuilder} from "hotballoon";
import {STORE_CHANGED} from "hotballoon/src/js/Store/StoreInterface";
import {PublicActionSelectItemPayloadBuilder} from "../generated/io/flexio/component_select/actions/PublicActionSelectItemPayload";
import {PublicActionSelectItemBuilder} from "../actions/PublicActionSelectItemBuilder";
import {PublicActionSelectedItemBuilder} from "../actions/PublicActionSelectedItemBuilder";
import {PublicActionUnselectedItemBuilder} from "../actions/PublicActionUnselectedItemBuilder";
import {PublicActionSelectedItemPayloadBuilder} from "../generated/io/flexio/component_select/actions/PublicActionSelectedItemPayload";
import {PublicActionUnselectedItemPayloadBuilder} from "../generated/io/flexio/component_select/actions/PublicActionUnselectedItemPayload";

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
    this.__properties = config.getProperties()
    this.__privateActionSelect = new PrivateActionSelectItemBuilder(this.__componentContext.dispatcher()).init()

    this.__publicActionSelect = new PublicActionSelectItemBuilder(this.__componentContext.dispatcher()).init()
    this.__publicActionSelected = new PublicActionSelectedItemBuilder(this.__componentContext.dispatcher()).init()
    this.__publicActionUnselected = new PublicActionUnselectedItemBuilder(this.__componentContext.dispatcher()).init()

    this.__selectedItemsIds = []
    this.__unselectedItemsIds = []

    this.__storeState = new StoreState(this.__componentContext)
    this.__initStoreState()
    this.__handleEventsFromView()
    this._handleUpdateFromProxyStore()
  }

  __initStoreState() {
    let store = new MapItemState()
    this.__proxyStore.state().data.forEach((item) => {
      // console.log(item)
      let storeStateItem = new StoreStateItemBuilder()
        .itemId(item.id())
        .selected(item.selected())
        .disabled(item.disabled())
        .visible(item.visible())
        .build()

      store.set(item.id(), storeStateItem)
    })

    this.__storeState.getStore().set(store)
  }

  /**
   * @return {Action<PublicActionSelectItemPayload>}
   */
  getPublicActionSelect() {
    return this.__publicActionSelect
  }

  /**
   * @return {Action<PublicActionSelectedItemPayload>}
   */
  getPublicActionSelected() {
    return this.__publicActionSelected
  }

  /**
   * @return {Action<PublicActionUnselectedItemPayload>}
   */
  getPublicActionUnselected() {
    return this.__publicActionUnselected
  }

  initView() {
    let config = new ViewContainerSelectConfig()
      .withParentNode(this.__parentNode)
      .withProxyStore(this.__proxyStore)
      .withStateStore(this.__storeState.getStorePublic())
      .withComponentContext(this.__componentContext)
      .withActionSelect(this.__privateActionSelect)
      .withViewItemBuilder(this.__viewItemBuilder)
      .withProperties(this.__properties)

    this.__viewContainer = new ViewContainerSelect(config)
    this.__viewContainer.createViewItems()
    this.__viewContainer.renderAndMount()
  }

  __handleEventsFromView() {
    this.__privateActionSelect.listenWithCallback(
      (payload) => {
        this.__performSelectEvent(payload.item())
      }
    )
  }

  __performSelectEvent(item) {
    if (this.__properties.multiple) {
      this.__performMultipleSelectEvent(item)
    } else {
      this.__performUniqueSelectEvent(item)
    }

    this.__dispatchPublicEvents(item)
  }

  __dispatchPublicEvents(item) {
    this.__publicActionSelect.dispatch(new PublicActionSelectItemPayloadBuilder().itemId(item.id()).build())
    let id = this.__unselectedItemsIds.pop()
    while (id !== undefined) {
      this.__publicActionUnselected.dispatch(new PublicActionUnselectedItemPayloadBuilder().itemId(id).build())
      id = this.__unselectedItemsIds.pop()
    }

    id = this.__selectedItemsIds.pop()
    while (id !== undefined) {
      this.__publicActionSelected.dispatch(new PublicActionSelectedItemPayloadBuilder().itemId(id).build())
      id = this.__selectedItemsIds.pop()
    }
  }

  __performMultipleSelectEvent(item) {
    let stateItems = new MapItemState()
    let data = this.__storeState.getStore().state().data
    data.forEach((state) => {
      let storeStateItem = this.__buildStateItemMatch(item, state, !state.selected(), state.selected())
      stateItems.set(state.itemId(), storeStateItem)
    })
    this.__storeState.getStore().set(stateItems)
  }

  __performUniqueSelectEvent(item) {
    this.__selectedItemsIds.push(item.id())

    let stateItems = new MapItemState()
    let data = this.__storeState.getStore().state().data
    data.forEach((state) => {
      if (state.selected()) {
        this.__unselectedItemsIds.push(state.itemId())
      }
      let storeStateItem = this.__buildStateItemMatch(item, state, true, false)
      stateItems.set(state.itemId(), storeStateItem)
    })
    this.__storeState.getStore().set(stateItems)
  }

  _handleUpdateFromProxyStore() {
    this.__proxyStore.subscribe(
      EventListenerOrderedBuilder
        .listen(STORE_CHANGED)
        .callback((payload) => {
          this.__initStoreState()
        })
        .build()
    )
  }

  /**
   * Build a state item and set selected value by value if item match with state
   * Or set set selected value by defaultValue
   */
  __buildStateItemMatch(item, state, valueIfMatch, defaultValue) {
    let storeStateItemBuilder = new StoreStateItemBuilder()
      .itemId(state.itemId())
      .disabled(state.disabled())
      .visible(state.visible())

    if (item.id() === state.itemId()) {
      storeStateItemBuilder.selected(valueIfMatch)
    } else {
      storeStateItemBuilder.selected(defaultValue)
    }
    return storeStateItemBuilder.build()
  }

  getSelectedItemsId() {
    let ids = []
    this.__storeState.getStorePublic().data().forEach((state) => {
      if (state.selected()) {
        ids.push(state.itemId())
      }
    })
    return ids
  }

  getSelectedItems() {
    let items = []
    this.getSelectedItemsId().forEach((id) => {
      this.__proxyStore.data().forEach((item) => {
        if (id === item.id()) {
          items.push(item)
        }
      })
    })

    return items
  }
}
