import {ActionBuilder, ActionParams, ActionTypeParam} from "@flexio-oss/hotballoon";
import {isNull} from "flexio-jshelpers";
import {PrivateActionSearchPayload} from "../generated/io/flexio/component_select/actions/PrivateActionSearchPayload";

export class PrivateActionSearchBuilder {
  /**
   *
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   *
   * @returns {Action<PrivateActionSearchPayload>}
   */
  init() {
    return ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          PrivateActionSearchPayload,
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
