import {
  e,
  ElementEventListenerBuilder,
  EventListenerOrderedBuilder,
  RECONCILIATION_RULES,
  View,
  ViewPublicEventHandler
} from 'hotballoon'
import listStyle from '../css/itemList.css'
import {ItemBuilder} from '../../../generated/io/flexio/component_select/types/Item'

const CLOSE_EVENT = 'CLOSE_EVENT'
const SELECT_EVENT = 'SELECT_EVENT'
const SELECT_MULTIPLE_EVENT = 'SELECT_MULTIPLE_EVENT'

export class ViewSelect extends View {
  /**
   *
   * @param {ViewButtonConfig} config
   */
  constructor(config) {
    super(config.getViewContainer())

    this.__viewContainer = config.getViewContainer()
    // this.__layers = config.getLayers()
    this.__viewItemBuilder = config.getViewItemBuilder()

    this.__proxyStore = config.getDataStore()
    this.__stateStore = config.getStateStore()

    this.subscribeToStore(this.__proxyStore)
    this.subscribeToStore(this.__stateStore)

    this.__closeStrategy = config.getCloseStrategy()

    this.__selectDiv = 'container_select'
    this.__idSelectList = 'list'
    this.__idselectedItemList = 'selected_items'
    this.__idCloseButton = 'close'
    this.__idInput = 'input'
  }

  template() {
    return this.html(
      e('div#' + this.__selectDiv)
        .childNodes(
          this.__closeButton(),
          this.__selectedItems(),
          this.__searchInput(),
          this.__itemsList()
        )
    )
  }

  __createViews() {
    let views = []
    this.__proxyStore.state().data.forEach((item) => {
      let state = this.__stateStore.data().get(item.id())
      if (state.visible()) {
        let view = this.__createView(item, state)

        if (!state.disabled()) {
          this.__handleEventFromView(view)
        }

        views.push(view)
      }
    })
    return views
  }

  __createView(item, state) {
    let itemTmp = new ItemBuilder()
      .id(item.id()).value(item.value()).label(item.label())
      .visible(state.visible()).selected(state.selected()).disabled(state.disabled())
      .build()

    let itemView = this.__viewItemBuilder.createView(this.__viewContainer, itemTmp)
    return this.addView(itemView)
  }

  __closeButton() {
    return this.html(
      e('div#' + this.__idCloseButton)
        .text('close')
        .listenEvent(
          ElementEventListenerBuilder
            .listen('click')
            .callback((event) => {
              this.dispatch(CLOSE_EVENT, event)
            })
            .build()
        ).reconciliationRules(
        RECONCILIATION_RULES.BYPASS
      )
    )
  }

  __selectedItems() {
    return this.html(
      e('div#' + this.__idselectedItemList)
        .text('selected')
        .reconciliationRules(
          RECONCILIATION_RULES.BYPASS
        )
    )
  }

  __searchInput() {
    return this.html(
      e('input#' + this.__idInput)
        .reconciliationRules(
          RECONCILIATION_RULES.BYPASS
        )
    )
  }

  __itemsList() {
    let views = this.__createViews()
    return this.html(
      e('div#' + this.__idSelectList)
        .className(listStyle.itemList)
        .views(...views)
        .reconciliationRules(
          RECONCILIATION_RULES.FORCE
        )
    )
  }

  __handleEventFromView(view) {
    view.on().selectItem((item) => {
      this.dispatch(SELECT_EVENT, item)
    })
    view.on().selectMultipleItems((item) => {
      this.dispatch(SELECT_MULTIPLE_EVENT, item)
    })
  }

  onShow() {
    console.log('onshow')
    this.__closeClb = this.__eventPress.bind(this)
    document.addEventListener('keyup', this.__closeClb)
  }

  __eventPress(event) {
    console.log(event)
    if (event.key === 'Escape' || event.code === 'Escape') {
      this.dispatch(CLOSE_EVENT, null)
    }
  }

  onHide() {
    console.log('onhide')
    if (this.__closeClb) {
      document.removeEventListener('keypress', this.__closeClb)
    }
  }

  /**
   * @returns {ViewSelectEvent}
   */
  on() {
    return new ViewSelectEvent((a) => {
      return this._on(a)
    })
  }
}

class ViewSelectEvent extends ViewPublicEventHandler {
  close(clb) {
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(CLOSE_EVENT)
        .callback((payload) => {
          console.log('plok')
          clb(payload)
        })
        .build()
    )
  }

  selectItem(clb) {
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(SELECT_EVENT)
        .callback((item) => {
          clb(item)
        })
        .build()
    )
  }

  selectMultipleItems(clb) {
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(SELECT_MULTIPLE_EVENT)
        .callback((item) => {
          clb(item)
        })
        .build()
    )
  }
}
