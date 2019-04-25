import {ItemList} from "./ItemList";
import {ItemBuilder} from "../generated/io/flexio/component_select/types/Item";

export class ItemListBuilder {
  constructor() {
    this.__itemList = new ItemList()
  }

  /**
   *
   * @param {string} value
   * @param {string} label
   * @param {boolean} [visible=true]
   * @param {boolean} [selected=false]
   * @param {boolean} [disabled=false]
   * @returns {ItemListBuilder}
   */
  addItem(value, label, visible = true, selected = false, disabled = false) {
    this.__itemList.push(new ItemBuilder().value(value).label(label)
      .seleted(selected).disabled(disabled).visible(visible).build())
    return this
  }

  build() {
    return this.__itemList
  }
}
