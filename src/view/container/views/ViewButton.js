import {e, ElementEventListenerBuilder, EventListenerOrderedBuilder, View, ViewPublicEventHandler} from "hotballoon";
import containerStyle from "./css/container.css";
import inputStyle from "./css/input.css";

const CLICK_EVENT = 'CLICK_EVENT'
const NO_SELECTED_LABEL_INPUT = 'Choisir ...'

export class ViewButton extends View {
  /**
   * @param {ViewButtonConfig} config
   */
  constructor(config) {
    super(config.getViewContainer())

    this.__proxyStore = config.getDataStore()
    this.__stateStore = config.getStateStore()

    this.subscribeToStore(this.__proxyStore)
    this.subscribeToStore(this.__stateStore)

    this.__idButtonDiv = 'container'
    this.__idButton = 'button'
  }

  template() {
    return this.html(
      e('div#' + this.__idButtonDiv)
        .childNodes(
          this.__button()
        ).className(
        containerStyle.container
      )
    )
  }

  __button() {
    return this.html(
      e('input#' + this.__idButton)
        .attributes({
          'autocomplete': 'off',
          'readonly': '',
          'value': this.__makeInputLabel()
        })
        .className(inputStyle.input)
        .listenEvent(
          ElementEventListenerBuilder
            .listen('click')
            .callback((event) => {
              this.dispatch(CLICK_EVENT, event)
            })
            .build()
        )
    )
  }

  /**
   * Make the label of input field, according to selected elements
   * @return {string}
   */
  __makeInputLabel() {
    let selectedItem = null
    let cpt = 0
    this.__proxyStore.state().data.forEach((item) => {
      let state = this.__stateStore.data().get(item.id())
      if (state.selected() && state.visible()) {
        cpt++
      }

      if (selectedItem === null && state.selected() && state.visible()) {
        selectedItem = item
      }
    })

    switch (cpt) {
      case 0:
        return NO_SELECTED_LABEL_INPUT
      case 1:
        return selectedItem.label()
      default:
        return cpt + ' éléments selectionnés'
    }
  }

  /**
   * @returns {ViewButtonEvent}
   */
  on() {
    return new ViewButtonEvent((a) => {
      return this._on(a)
    })
  }
}


class ViewButtonEvent extends ViewPublicEventHandler {
  openList(clb) {
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(CLICK_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }
}
