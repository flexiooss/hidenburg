import {DefaultViewItem} from "./DefaultViewItem";

export class DefaultViewItemBuilder {
  /**
   * @param {ViewContainer} viewContainer
   * @param {string} value
   * @param {string} label
   * @returns {DefaultViewItem}
   */
  createView(viewContainer, value, label) {
    return new DefaultViewItem(viewContainer, value, label)
  }
}
