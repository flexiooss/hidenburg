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

      if (value.length === 0) {
        state = state.withSearchFiltered(false)
      } else {
        if (this.__itemIncludesValue(item, value)) {
          state = state.withSearchFiltered(false)
        } else {
          state = state.withSearchFiltered(true)
        }
      }

      stateItems.set(item.id(), state)
    })

    this.__stateStore.getStore().set(stateItems)
  }

  __itemIncludesValue(item, value) {
    value = value.toLowerCase()
    let label = item.label().toLowerCase()
    if (this.__includes(label, value)){
      return true
    }
    label = item.value().toLowerCase()
    if (this.__includes(label, value)){
      return true
    }

    // Remove accents
    let labelWithoutAccent = item.label().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
    if (labelWithoutAccent !== label){
      if (this.__includes(label, value)){
        return true
      }
    }
    return false
  }

  __includes(str, val){
    return str.indexOf(val) !== -1
  }
}
