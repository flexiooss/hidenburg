import {AbstractCloseStrategy} from "./AbstractCloseStrategy";

export class CloseUnique extends AbstractCloseStrategy {
  canClose() {
    return true
  }
}
