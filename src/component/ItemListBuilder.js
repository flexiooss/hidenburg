import {ItemList} from "./ItemList";
import {ItemBuilder} from "../generated/io/flexio/component_select/types/Item";

export class ItemListBuilder {
  constructor() {
    this.__itemList = new ItemList()
  }

  /**
   * @param {string} id
   * @param {string} value
   * @param {string} label
   * @param {boolean} [visible=true]
   * @param {boolean} [selected=false]
   * @param {boolean} [disabled=false]
   * @returns {ItemListBuilder}
   */
  addItem(id, value, label, visible = true, selected = false, disabled = false) {
    let item = new ItemBuilder()
      .id(id).value(value)
      .label(label).selected(selected)
      .disabled(disabled).visible(visible)
      .build()

    this.__itemList.set(id, item)
    return this
  }

  /**
   * @param {Item} item
   */
  addItemObject(item) {
    this.__itemList.set(item.id(), item)
  }

  /**
   * @return {ItemList}
   */
  build() {
    return this.__itemList
  }
}
