import {e, View} from "hotballoon";

export class ViewSelect extends View {
  /**
   *
   * @param {ViewContainer} viewContainer
   * @param {StoreInterface<*>} dataStorePublic
   * @param {Map<string,function>} accessors
   */
  constructor(viewContainer, dataStorePublic, accessors) {
    super(viewContainer)

    this.__dataStorePublic = dataStorePublic
    this.__accessors = accessors
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
    this.__dataStorePublic.state().data.forEach((state) => {
      items.push(this.__createItem(state))
    })
    return items
  }

  __createItem(state) {
    let item = this.html(
      e('option')
    )
    this.__accessors.forEach((accessor, name) => {
      item.innerHTML += name + ' => ' + accessor(state)
    })
    return item
  }
}
