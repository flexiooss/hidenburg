import {ActionBuilder, ActionParams, ActionTypeParam} from "@flexio-oss/hotballoon"
import {isNull} from "flexio-jshelpers"
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
    return ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
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
