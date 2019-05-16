import {AbstractCloseStrategy} from "./AbstractCloseStrategy";

export class CloseMultiple extends AbstractCloseStrategy {
  constructor(component) {
    super()
    this.__component = component
  }

  /**
   * @return {boolean}
   */
  canClose() {
    return this.__component.getSelectedItemsId().length == 0
  }
}
