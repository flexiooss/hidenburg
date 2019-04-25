import {e, ElementEventListenerBuilder, EventListenerOrderedBuilder, View, ViewPublicEventHandler} from "hotballoon";
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
    return this.html(
      e('div')
        .attributes({'data-value': this.__item.value()})
        .text(this.__item.label())
        .attributes({
          'role': 'option',
          'selected': this.__item.seleted()
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
    )
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
          console.log(payload)
          clb(payload)
        })
        .build()
    )
  }
}
