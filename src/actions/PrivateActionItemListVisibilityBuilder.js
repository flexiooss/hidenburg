import {ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig} from "@flexio-oss/hotballoon"
import {PrivateActionItemListVisibility} from "../../generated/io/flexio/hidenburg/actions/PrivateActionItemListVisibility"
import {isNull} from "@flexio-oss/assert";

export class PrivateActionItemListVisibilityBuilder {
  /**
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   * @returns {Action<PrivateActionItemListVisibility>}
   */
  init() {
    return ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          PrivateActionItemListVisibility,
          (data) => {
            return data
          },
          (data) => {
            return !isNull(data)
          }
        ), this.__dispatcher
      )
    )
  }
}
