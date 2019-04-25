import {e, View} from "hotballoon";

export class ViewSelect extends View {
  /**
   *
   * @param {ViewContainer} viewContainer
   * @param {StoreInterface} proxyStore
   * @param {View} viewItemBuilder
   */
  constructor(viewContainer, proxyStore, viewItemBuilder) {
    super(viewContainer)

    this.__viewContainer = viewContainer

    this.__proxyStore = proxyStore
    this.__viewItemBuilder = viewItemBuilder

    this.subscribeToStore(proxyStore)
  }

  template() {
    let items = this.__createItems()
    console.log(items)
    return this.html(
      e('select')
        .views(...items)
    )
  }

  __createItems() {
    let items = []
    this.__proxyStore.state().data.forEach((state) => {
      let itemView = this.__viewItemBuilder.createView(this.__viewContainer, state.value(), state.label())
      items.push(this.addView(itemView))
    })
    return items
  }
}
