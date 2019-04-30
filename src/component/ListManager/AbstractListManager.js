import {StoreStateItemBuilder} from "../../generated/io/flexio/component_select/types/StoreStateItem";
import {PublicActionSelectItemPayloadBuilder} from "../../generated/io/flexio/component_select/actions/PublicActionSelectItemPayload";
import {PublicActionUnselectedItemPayloadBuilder} from "../../generated/io/flexio/component_select/actions/PublicActionUnselectedItemPayload";
import {PublicActionSelectedItemPayloadBuilder} from "../../generated/io/flexio/component_select/actions/PublicActionSelectedItemPayload";
import {PublicActionSelectItemBuilder} from "../../actions/PublicActionSelectItemBuilder";
import {PublicActionSelectedItemBuilder} from "../../actions/PublicActionSelectedItemBuilder";
import {PublicActionUnselectedItemBuilder} from "../../actions/PublicActionUnselectedItemBuilder";
import {StoreState} from "../../stores/StoreState";
import {MapItemState} from "../MapItemState";

export class AbstractListManager {
  constructor(componentContext) {
    this.__componentContext = componentContext
    this.__publicActionSelect = new PublicActionSelectItemBuilder(this.__componentContext.dispatcher()).init()
    this.__publicActionSelected = new PublicActionSelectedItemBuilder(this.__componentContext.dispatcher()).init()
    this.__publicActionUnselected = new PublicActionUnselectedItemBuilder(this.__componentContext.dispatcher()).init()

    this._selectItemsIds = []
    this._selectedItemsIds = []
    this._unselectedItemsIds = []

    this._storeState = new StoreState(this.__componentContext)
  }

  _buildStateItemMatch(item, state, valueIfMatch, defaultValue) {
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

  dispatchPublicEvents(item) {
    let id = this._selectItemsIds.pop()
    while (id !== undefined) {
      this.__publicActionSelect.dispatch(new PublicActionSelectItemPayloadBuilder().itemId(id).build())
      id = this._selectItemsIds.pop()
    }

    id = this._unselectedItemsIds.pop()
    while (id !== undefined) {
      this.__publicActionUnselected.dispatch(new PublicActionUnselectedItemPayloadBuilder().itemId(id).build())
      id = this._unselectedItemsIds.pop()
    }

    id = this._selectedItemsIds.pop()
    while (id !== undefined) {
      this.__publicActionSelected.dispatch(new PublicActionSelectedItemPayloadBuilder().itemId(id).build())
      id = this._selectedItemsIds.pop()
    }
  }

  initStateStore(proxyStore) {
    this.__dataStore = proxyStore
    let store = new MapItemState()
    this.__dataStore.state().data.forEach((item) => {
      // console.log(item)
      let storeStateItem = new StoreStateItemBuilder()
        .itemId(item.id())
        .selected(item.selected())
        .disabled(item.disabled())
        .visible(item.visible())
        .build()

      store.set(item.id(), storeStateItem)
    })

    this._storeState.getStore().set(store)
  }

  getSelectedItemsId() {
    let ids = []
    this._storeState.getStorePublic().data().forEach((state) => {
      if (state.selected()) {
        ids.push(state.itemId())
      }
    })
    return ids
  }

  getSelectedItems() {
    let items = []
    this.getSelectedItemsId().forEach((id) => {
      this.__dataStore.data().forEach((item) => {
        if (id === item.id()) {
          items.push(item)
        }
      })
    })

    return items
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
}
