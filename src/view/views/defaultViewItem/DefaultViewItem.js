import {
  e,
  ElementEventListenerBuilder,
  EventListenerOrderedBuilder,
  RECONCILIATION_RULES,
  View,
  ViewPublicEventHandler
} from "hotballoon";
import style from '../css/item.css'

const SELECT_EVENT = 'SELECT_EVENT'

export class DefaultViewItem extends View {
  /**
   *
   * @param {ViewContainer} viewContainer
   * @param {Item} item
   */
  constructor(viewContainer, item) {
    super(viewContainer)
    this.__item = item
  }

  template() {
    let html = this.html(
      e('div#item-' + this.__item.id())
        .attributes({'data-value': this.__item.value()})
        .text(this.__item.label())
        .attributes({
          'role': 'option',
          'selected': '' + this.__item.selected()
        })
        .className(style.item)
        .listenEvent(
          ElementEventListenerBuilder
            .listen('click')
            .callback((event) => {
              this.dispatch(SELECT_EVENT, this.__item)
            })
            .build()
        )
        .reconciliationRules(
          RECONCILIATION_RULES.BYPASS_LISTENERS
        )
    )
    // console.log(html)
    return html
  }

  /**
   *
   * @returns {ViewSelectItemEvent}
   */
  on() {
    return new ViewSelectItemEvent((a) => {
      return this._on(a)
    })
  }
}

class ViewSelectItemEvent extends ViewPublicEventHandler {
  selectItem(clb) {
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(SELECT_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }
}
