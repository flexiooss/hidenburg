import {ActionBuilder, ActionParams, ActionTypeParam} from "@flexio-oss/hotballoon"
import {isNull} from "flexio-jshelpers"
import {PrivateActionItemListVisibility} from "../../generated/io/flexio/hidenburg/actions/PrivateActionItemListVisibility"

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
    return ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
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
