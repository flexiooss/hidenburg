import {ActionBuilder, ActionParams, ActionTypeParam} from "hotballoon";
import {ActionSelectItemPayload} from "../generated/io/flexio/component_select/actions/ActionSelectItemPayload";
import {isNull} from "flexio-jshelpers";

export class ActionSelectItemBuilder {
  /**
   *
   * @param {Dispatcher} dispatcher
   */
  constructor(dispatcher) {
    this.__dispatcher = dispatcher
  }

  /**
   *
   * @returns {Action<ActionSelectItemPayload>}
   */
  init() {
    return ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ActionSelectItemPayload,
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
