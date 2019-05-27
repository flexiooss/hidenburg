import {StoreStateItemBuilder} from "../../generated/io/flexio/component_select/types/StoreStateItem";
import {PublicActionSelectItemPayloadBuilder} from "../../generated/io/flexio/component_select/actions/PublicActionSelectItemPayload";
import {PublicActionUnselectedItemPayloadBuilder} from "../../generated/io/flexio/component_select/actions/PublicActionUnselectedItemPayload";
import {PublicActionSelectedItemPayloadBuilder} from "../../generated/io/flexio/component_select/actions/PublicActionSelectedItemPayload";
import {PublicActionSelectItemBuilder} from "../../actions/PublicActionSelectItemBuilder";
import {PublicActionSelectedItemBuilder} from "../../actions/PublicActionSelectedItemBuilder";
import {PublicActionUnselectedItemBuilder} from "../../actions/PublicActionUnselectedItemBuilder";
import {StoreState} from "../../stores/StoreState";
import {MapItemState} from "../MapItemState";
import {SearcherValueInItems} from "./SearcherValueInItems";

export class AbstractListManager {
  constructor(componentContext) {
    this.__componentContext = componentContext
    this.__publicActionSelect = new PublicActionSelectItemBuilder(this.__componentContext.dispatcher()).init()
    this.__publicActionSelected = new PublicActionSelectedItemBuilder(this.__componentContext.dispatcher()).init()
    this.__publicActionUnselected = new PublicActionUnselectedItemBuilder(this.__componentContext.dispatcher()).init()

    this.__selectItemsIds = []
    this.__selectedItemsIds = []
    this.__unselectedItemsIds = []

    this._stateStore = new StoreState(this.__componentContext)
    this._dataStore = null

    this.__searcher = new SearcherValueInItems()
  }

  /**
   * @param {...String} item
   * @protected
   */
  _addSelectItems(...item) {
    // console.log('select', ...item)
    this.__selectItemsIds.push(...item)
  }

  /**
   * @param {...String} item
   * @protected
   */
  _addSelectedItems(...item) {
    // console.log('selected', ...item)
    this.__selectedItemsIds.push(...item)
  }

  /**
   * @param {...String} item
   * @protected
   */
  _addUnselectedItems(...item) {
    // console.log('unselected', ...item)
    this.__unselectedItemsIds.push(...item)
  }

  /**
   * @protected
   */
  _dispatchPublicEvents() {
    let id = this.__selectItemsIds.shift()
    while (id !== undefined) {
      this.__publicActionSelect.dispatch(new PublicActionSelectItemPayloadBuilder().itemId(id).build())
      id = this.__selectItemsIds.shift()
    }

    id = this.__unselectedItemsIds.shift()
    while (id !== undefined) {
      this.__publicActionUnselected.dispatch(new PublicActionUnselectedItemPayloadBuilder().itemId(id).build())
      id = this.__unselectedItemsIds.shift()
    }

    id = this.__selectedItemsIds.shift()
    while (id !== undefined) {
      this.__publicActionSelected.dispatch(new PublicActionSelectedItemPayloadBuilder().itemId(id).build())
      id = this.__selectedItemsIds.shift()
    }
  }

  /**
   * @param {StoreInterface} dataStore
   */
  initStore(dataStore) {
    this._dataStore = dataStore
    this._checkDataStore()
    let store = new MapItemState()
    this._dataStore.state().data.forEach((item) => {
      // console.log(item)
      let storeStateItem = new StoreStateItemBuilder()
        .itemId(item.id())
        .selected(item.selected())
        .disabled(item.disabled())
        .visible(item.visible())
        .searchFiltered(false)
        .build()

      store.set(item.id(), storeStateItem)
    })

    this._stateStore.getStore().set(store)

    this.__searcher.setDataStore(this._dataStore).setStateStore(this._stateStore)
  }

  _checkDataStore() {
    throw new Error('Must be implemented')
  }

  /**
   * @return {String[]}
   */
  getSelectedItemsId() {
    let ids = []
    this._stateStore.getStorePublic().data().forEach((state) => {
      if (state.selected()) {
        ids.push(state.itemId())
      }
    })
    return ids
  }

  /**
   * @return {Item[]}
   */
  getSelectedItems() {
    let items = []
    this.getSelectedItemsId().forEach((id) => {
      this._dataStore.data().forEach((item) => {
        if (id === item.id()) {
          items.push(item)
        }
      })
    })

    return items
  }

  /**
   * @param {string} value
   */
  performSearch(value) {
    this.__searcher.setDataStore(this._dataStore).searchAndUpdateStateStore(value)
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
    return this._stateStore.getStorePublic()
  }
}
