import {DefaultViewItem} from "./DefaultViewItem";

export class DefaultViewItemBuilder {
  constructor(viewContainer) {
    this.__viewContainer = viewContainer
  }

  /**
   *
   * @param {string} value
   * @param {string} label
   * @returns {DefaultViewItem}
   */
  createView(value, label) {
    return new DefaultViewItem(this.__viewContainer, value, label)
  }
}
