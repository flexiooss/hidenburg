import {ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig} from "@flexio-oss/hotballoon"
import {isNull} from "@flexio-oss/assert";
import {PrivateActionUnselectPayload} from "../../generated/io/flexio/hidenburg/actions/PrivateActionUnselectPayload"

export class PrivateActionUnselectBuilder {
  /**
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   * @returns {Action<PrivateActionUnselectPayload>}
   */
  init() {
    return ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          PrivateActionUnselectPayload,
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
