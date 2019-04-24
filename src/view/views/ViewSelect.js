import {e, View} from "hotballoon";

export class ViewSelect extends View {
  /**
   *
   * @param {ViewContainer} viewContainer
   * @param {ProxyStoreInterface} proxyStore
   * @param {} viewItemBuilder
   */
  constructor(viewContainer, proxyStore, viewItemBuilder) {
    super(viewContainer)

    this.__proxyStore = proxyStore
    this.__viewItemBuilder = viewItemBuilder
  }

  template() {
    let items = this.__createItems()
    return this.html(
      e('select')
        .childNodes(...items)
    )
  }

  __createItems() {
    let items = []
    this.__proxyStore.state().data.forEach((state) => {
      items.push(this.__viewItemBuilder.createView(state.value(), state.label()))
    })
    return items
  }
}
