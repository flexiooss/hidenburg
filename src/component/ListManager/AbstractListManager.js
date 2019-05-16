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

    this.__selectItemsIds = []
    this.__selectedItemsIds = []
    this.__unselectedItemsIds = []

    this._storeState = new StoreState(this.__componentContext)
  }

  /**
   * Build state with item. Set selected value by 'valueIfMatch' if item match with state or defaultValue
   * @param item
   * @param state
   * @param valueIfMatch
   * @param defaultValue
   * @return {StoreStateItem}
   * @protected
   */
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

  addSelectItems(...item) {
    this.__selectItemsIds.push(...item)
  }

  addSelectedItems(...item){
    this.__selectedItemsIds.push(...item)
  }

  addUnselectedItems(...item){
    this.__unselectedItemsIds.push(...item)
  }

  dispatchPublicEvents() {
    let id = this.__selectItemsIds.pop()
    while (id !== undefined) {
      this.__publicActionSelect.dispatch(new PublicActionSelectItemPayloadBuilder().itemId(id).build())
      id = this.__selectItemsIds.pop()
    }

    id = this.__unselectedItemsIds.pop()
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

  /**
   * @return {StoreInterface}
   */
  getPublicStateStore() {
    return this._storeState.getStorePublic()
  }
}
