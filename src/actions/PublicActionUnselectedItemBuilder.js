import {ActionBuilder, ActionParams, ActionTypeParam} from "@flexio-oss/hotballoon";
import {isNull} from "flexio-jshelpers";
import {PublicActionUnselectedItemPayload} from "../generated/io/flexio/component_select/actions/PublicActionUnselectedItemPayload";

export class PublicActionUnselectedItemBuilder {
  /**
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   * @returns {Action<PublicActionUnselectedItemPayload>}
   */
  init() {
    return ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          PublicActionUnselectedItemPayload,
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
