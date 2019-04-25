import {DefaultViewItem} from "./DefaultViewItem";

export class DefaultViewItemBuilder {
  /**
   * @param {ViewContainer} viewContainer
   * @param {Item} item
   * @returns {DefaultViewItem}
   */
  createView(viewContainer, item) {
    return new DefaultViewItem(viewContainer, item)
  }
}
