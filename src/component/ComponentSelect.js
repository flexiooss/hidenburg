import {ViewContainerSelect} from "../view/ViewContainerSelect";
import {ViewContainerSelectConfig} from "../view/ViewContainerSelectConfig";
import {DefaultViewItemBuilder} from "../view/views/defaultViewItem/DefaultViewItemBuilder";
import {isNull} from "flexio-jshelpers";
import {ActionSelectItemBuilder} from "../actions/ActionSelectItemBuilder";
import {StoreState} from "../stores/StoreState";
import {MapItemState} from "./MapItemState";
import {StoreStateItemBuilder} from "../generated/io/flexio/component_select/types/StoreStateItem";

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
    this.__actionSelect = new ActionSelectItemBuilder(this.__componentContext.dispatcher()).init()

    this.__storeState = new StoreState(this.__componentContext)
    this.__initStoreState()
    this.__handleEvents()
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
      .withActionSelect(this.__actionSelect)

    if (isNull(this.__viewItemBuilder)) {
      config.withViewItemBuilder(new DefaultViewItemBuilder())
    }

    this.__viewContainer = new ViewContainerSelect(config)
    this.__viewContainer.createViewItems()
    this.__viewContainer.renderAndMount()
  }

  __handleEvents() {
    this.__actionSelect.listenWithCallback(
      (payload) => {
        let item = payload.item()
        let stateItems = new MapItemState()
        let data = this.__storeState.getStore().state().data
        data.forEach((state) => {
          let storeStateItem = this.__buildStateItem(item, state)
          stateItems.set(state.itemId(), storeStateItem)
        })
        this.__storeState.getStore().set(stateItems)
      }
    )
  }

  __buildStateItem(item, state) {
    let storeStateItemBuilder = new StoreStateItemBuilder()
      .itemId(state.itemId())
      .disabled(state.disabled())
      .visible(state.visible())

    if (item.id() === state.itemId()) {
      storeStateItemBuilder.selected(!state.selected())
    } else {
      storeStateItemBuilder.selected(state.selected())
    }
    return storeStateItemBuilder.build()
  }
}
