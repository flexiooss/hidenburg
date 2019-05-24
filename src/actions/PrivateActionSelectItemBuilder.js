import {ActionBuilder, ActionParams, ActionTypeParam} from "@flexio-oss/hotballoon";
import {isNull} from "flexio-jshelpers";
import {PrivateActionSelectItemPayload} from "../generated/io/flexio/component_select/actions/PrivateActionSelectItemPayload";

export class PrivateActionSelectItemBuilder {
  /**
   *
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   *
   * @returns {Action<PrivateActionSelectItemPayload>}
   */
  init() {
    return ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
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
