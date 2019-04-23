import {assertType, FLEXIO_IMPORT_OBJECT, isNode, isNull} from 'flexio-jshelpers'
import {ActionBuilder, ActionParams, ActionTypeParam, TypeCheck} from 'hotballoon'

const ActionInitialize = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_bootstrap.actions.ActionInitialize

export class ActionInitializeUtils {
  /**
   *
   * @param {Dispatcher} dispatcher
   * @param {HotBalloonApplication} application
   * @param {Element} parentElement
   */
  constructor(dispatcher, application, parentElement) {
    assertType(TypeCheck.isDispatcher(dispatcher),
      'ActionInitializeUtils:constructor: `dispatcher` should be a Dispatcher'
    )
    assertType(TypeCheck.isHotballoonApplication(application),
      'ActionInitializeUtils:constructor: `application` should be a HotBalloonApplication'
    )
    assertType(isNode(parentElement),
      'ActionInitializeUtils:constructor: `parentElement` should be an Element'
    )
    this.__dispatcher = dispatcher
    this.__action = null
    this.__application = application
    this.__parentElement = parentElement
  }

  init() {
    this.__action = ActionBuilder.build(
      new ActionParams(
        new ActionTypeParam(
          ActionInitialize,
          /**
           *
           * @param {ActionInitialize} data
           * @return {ActionInitialize}
           */
          (data) => {
            if (isNull(data.message())) {
              return data.withMessage('Default message')
            }
            return data
          },
          /**
           *
           * @param {ActionInitialize} payload
           * @return {boolean}
           */
          (payload) => {
            return !isNull(payload.message())
          }
        ),
        this.__dispatcher
      )
    )
    console.log(this.__action)
    return this
  }

  listen() {
    assertType(!isNull(this.__action),
      'ActionInitializeUtils:listen: action should be initialize before using it'
    )
    this.__action.listenWithCallback(
      /**
       *
       * @param {ActionInitialize} payload
       */
      (payload) => {
        // const severities = new ComponentSeverities(this.__application.addComponentContext(), this.__parentElement)
        // severities.initViews()
      }
    )
    return this
  }

  action() {
    return this.__action
  }
}
