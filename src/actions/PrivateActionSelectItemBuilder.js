import {ActionDispatcherBuilder, ActionDispatcherConfig, ActionTypeConfig} from "@flexio-oss/hotballoon"
import {isNull} from "@flexio-oss/assert";
import {PrivateActionSelectItemPayload} from "../../generated/io/flexio/hidenburg/actions/PrivateActionSelectItemPayload"

export class PrivateActionSelectItemBuilder {
  /**
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   * @returns {Action<PrivateActionSelectItemPayload>}
   */
  init() {
    return ActionDispatcherBuilder.build(
      new ActionDispatcherConfig(
        new ActionTypeConfig(
          PrivateActionSelectItemPayload,
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
