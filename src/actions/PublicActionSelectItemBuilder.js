import {ActionBuilder, ActionParams, ActionTypeParam} from "@flexio-oss/hotballoon"
import {isNull} from "@flexio-oss/assert";
import {PublicActionSelectItemPayload} from "../../generated/io/flexio/hidenburg/actions/PublicActionSelectItemPayload"

export class PublicActionSelectItemBuilder {
  /**
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   * @returns {Action<PublicActionSelectItemPayload>}
   */
  init() {
    return ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          PublicActionSelectItemPayload,
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
