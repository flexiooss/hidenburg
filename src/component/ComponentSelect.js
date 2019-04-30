import {ViewContainerSelect} from "../view/ViewContainerSelect";
import {ViewContainerSelectConfig} from "../view/ViewContainerSelectConfig";
import {PrivateActionSelectItemBuilder} from "../actions/PrivateActionSelectItemBuilder";
import {StoreState} from "../stores/StoreState";
import {MapItemState} from "./MapItemState";
import {StoreStateItemBuilder} from "../generated/io/flexio/component_select/types/StoreStateItem";
import {EventListenerOrderedBuilder} from "hotballoon";
import {STORE_CHANGED} from "hotballoon/src/js/Store/StoreInterface";

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
    let stateItems = new MapItemState()
    let data = this.__storeState.getStore().state().data
    data.forEach((state) => {
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
