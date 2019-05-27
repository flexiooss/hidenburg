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

    this._stateStore = new StoreState(this.__componentContext)
    this._dataStore = null
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
    console.log('Perform search => ' + value)
    let stateItems = new MapItemState()

    this._dataStore.state().data.forEach((item) => {
      let state = this._stateStore.getStore().state().data.get(item.id())

      if (value.length === 0 || this.__itemIncludesValue(value, item)) {
        state = state.withSearchFiltered(false)
      } else {
        state = state.withSearchFiltered(true)
      }

      stateItems.set(item.id(), state)
    })

    this._stateStore.getStore().set(stateItems)
  }

  __itemIncludesValue(value, item) {
    let values = []
    let label = item.label().toLowerCase()
    values.push(label)
    values.push(item.value().toLowerCase())

    // Remove accents
    let labelWithoutAccent = item.label().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
    if (labelWithoutAccent !== label)
      values.push(labelWithoutAccent)

    value = value.toLowerCase()
    return values.some((val) => {
      return val.includes(value)
    })
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
