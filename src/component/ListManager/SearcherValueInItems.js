import {MapItemState} from "../MapItemState";

export class SearcherValueInItems {
  constructor() {
    this.__dataStore = null
    this.__stateStore = null
  }

  /**
   * @param dataStore
   * @return {SearcherValueInItems}
   */
  setDataStore(dataStore) {
    this.__dataStore = dataStore
    return this
  }

  /**
   * @param stateStore
   * @return {SearcherValueInItems}
   */
  setStateStore(stateStore) {
    this.__stateStore = stateStore
    return this
  }

  /**
   * @param {string} value
   */
  searchAndUpdateStateStore(value) {
    console.log('Perform search => ' + value)
    let stateItems = new MapItemState()

    this.__dataStore.state().data.forEach((item) => {
      let state = this.__stateStore.getStore().state().data.get(item.id())

      if (value.length === 0 || this.__itemIncludesValue(value, item)) {
        state = state.withSearchFiltered(false)
      } else {
        state = state.withSearchFiltered(true)
      }

      stateItems.set(item.id(), state)
    })

    this.__stateStore.getStore().set(stateItems)
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
}
