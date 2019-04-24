export class ProxyStoreInterface {
  /**
   *
   * @param {StoreInterface<*>}store
   */
  constructor(store) {
    this.__store = store
  }

  /**
   *
   * @param state
   * @returns {string}
   */
  label(state) {
    return ''
  }

  /**
   *
   * @returns {string}
   */
  value() {
    return ''
  }
}
