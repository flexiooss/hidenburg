import {e, View} from "hotballoon";

export class ViewSelect extends View {
  /**
   * @param {ViewContainer} viewContainer
   */
  constructor(viewContainer, dataStorePublic, accessors) {
    super(viewContainer)

    this.__dataStorePublic = dataStorePublic
    this.__accessors = accessors
  }

  template() {
    let items = __createItems()

    return this.html(
      e('select')
        .childNodes()
    )
  }

  __createItems() {
    let items = []
    this.__dataStorePublic.state().data.forEach((state) => {
      items.push(createItem(state))
    })
  }

  __createItem(state) {
    let item = this.html(
      e('option')
    )
    this.__accessors.forEach((accessor, name) => {
      item.innerHTML += name + ' => ' + accessor(state)
    })
  }
}
