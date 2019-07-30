import {ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig} from "@flexio-oss/hotballoon"
import {isNull} from "@flexio-oss/assert";
import {PrivateActionSelectMultipleItemsPayload} from "../../generated/io/flexio/hidenburg/actions/PrivateActionSelectMultipleItemsPayload"

export class PrivateActionSelectMultipleItemsBuilder {
  /**
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   * @returns {Action<PrivateActionSelectMultipleItemsPayload>}
   */
  init() {
    return ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          PrivateActionSelectMultipleItemsPayload,
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
