import {AbstractCloseStrategy} from "./AbstractCloseStrategy";

export class CloseUnique extends AbstractCloseStrategy {
  /**
   * @return {boolean}
   */
  canClose() {
    return true
  }
}
