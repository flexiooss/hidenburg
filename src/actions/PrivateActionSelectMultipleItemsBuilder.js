import {ActionBuilder, ActionParams, ActionTypeParam} from "@flexio-oss/hotballoon";
import {isNull} from "flexio-jshelpers";
import {PrivateActionSelectMultipleItemsPayload} from "../generated/io/flexio/component_select/actions/PrivateActionSelectMultipleItemsPayload";

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
    return ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
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
