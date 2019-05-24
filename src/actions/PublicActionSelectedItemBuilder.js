import {ActionBuilder, ActionParams, ActionTypeParam} from "@flexio-oss/hotballoon";
import {isNull} from "flexio-jshelpers";
import {PublicActionSelectedItemPayload} from "../generated/io/flexio/component_select/actions/PublicActionSelectedItemPayload";

export class PublicActionSelectedItemBuilder {
  /**
   *
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   *
   * @returns {Action<PublicActionSelectedItemPayload>}
   */
  init() {
    return ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          PublicActionSelectedItemPayload,
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
