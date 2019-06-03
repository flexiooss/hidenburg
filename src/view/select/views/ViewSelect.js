import {
  e,
  ElementEventListenerBuilder,
  EventListenerOrderedBuilder,
  RECONCILIATION_RULES,
  View,
  ViewPublicEventHandler
} from '@flexio-oss/hotballoon'
import listStyle from '../css/itemList.css'
import itemSelectedStyle from '../css/itemSelected.css'
import inputStyle from '../css/input.css'
import closeStyle from '../css/close.css'
import itemListSelectedStyle from '../css/itemListSelected.css'
import {ItemBuilder} from '../../../../generated/io/flexio/hidenburg/types/Item'

const CLOSE_EVENT = 'CLOSE_EVENT'
const SELECT_EVENT = 'SELECT_EVENT'
const UNSELECT_EVENT = 'UNSELECT_EVENT'
const SELECT_MULTIPLE_EVENT = 'SELECT_MULTIPLE_EVENT'
const SEARCH_EVENT = 'SEARCH_EVENT'

export class ViewSelect extends View {
  /**
   * @param {ViewSelectConfig} config
   */
  constructor(config) {
    super(config.getViewContainer())

    this.__viewContainer = config.getViewContainer()
    // this.__layers = config.getLayers()
    this.__viewItemBuilder = config.getViewItemBuilder()

    this.__dataStore = config.getDataStore()
    this.__stateStore = config.getStateStore()

    this.subscribeToStore(this.__dataStore)
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

  __createItemsViews() {
    let views = []
    this.__stateStore.state().data.forEach((state) => {
      if (state.visible() && !state.selected() && !state.searchFiltered()) {
        let item = this.__dataStore.state().data.get(state.itemId())
        let view = this.__createItemView(item, state)

        if (!state.disabled()) {
          this.__handleEventFromView(view)
        }

        views.push(view)
      }
    })
    return views
  }

  __createItemView(item, state) {
    let builder = new ItemBuilder()
      .id(item.id()).value(item.value()).label(item.label())
      .visible(state.visible()).selected(state.selected()).disabled(state.disabled())

    let itemView = this.__viewItemBuilder.createView(this.__viewContainer, builder.build())
    return this.addView(itemView)
  }

  __closeButton() {
    return this.html(
      e('div#' + this.__idCloseButton)
        .text('X')
        .listenEvent(
          ElementEventListenerBuilder
            .listen('click')
            .callback((event) => {
              this.dispatch(CLOSE_EVENT, event)
            })
            .build()
        ).className(closeStyle.closeButton)
        .reconciliationRules(
          RECONCILIATION_RULES.BYPASS
        )
    )
  }

  __selectedItems() {
    let selectedItems = this.__createSelectedItems()
    return this.html(
      e('div#' + this.__idselectedItemList)
        .childNodes(...selectedItems)
        .className(itemListSelectedStyle.itemListSelected)
        .reconciliationRules(RECONCILIATION_RULES.REPLACE)
    )
  }

  __createSelectedItems() {
    let items = []
    this.__dataStore.state().data.forEach((item) => {
      let state = this.__stateStore.data().get(item.id())
      if (state.selected()) {
        let itemSelected = this.html(
          e('div#' + item.id())
            .text(item.label())
            .className(itemSelectedStyle.itemSelected)
            .listenEvent(
              ElementEventListenerBuilder
                .listen('click')
                .callback((event) => {
                  this.dispatch(UNSELECT_EVENT, item)
                })
                .build()
            )
        )
        items.push(itemSelected)
      }
    })
    return items
  }

  __searchInput() {
    return this.html(
      e('input#' + this.__idInput)
        .className(inputStyle.inputSearch)
        .attributes({
          'placeholder': 'Rechercher...'
        })
        .listenEvent(
          ElementEventListenerBuilder
            .listen('keyup')
            .callback((event) => {
              let value = event.target.value
              this.dispatch(SEARCH_EVENT, value)
            })
            .build()
        )
        .reconciliationRules(
          RECONCILIATION_RULES.BYPASS
        )
    )
  }

  __itemsList() {
    let views = this.__createItemsViews()
    return this.html(
      e('div#' + this.__idSelectList)
        .className(listStyle.itemList)
        .views(...views)
        .reconciliationRules(
          RECONCILIATION_RULES.REPLACE
        )
    )
  }

  __handleEventFromView(view) {
    view.on().selectItem((item) => {
      this.dispatch(SELECT_EVENT, item)
      if (this.__closeStrategy.canClose()) {
        this.dispatch(CLOSE_EVENT, null)
      }
    })
    view.on().selectMultipleItems((item) => {
      this.dispatch(SELECT_MULTIPLE_EVENT, item)
      if (this.__closeStrategy.canClose()) {
        this.dispatch(CLOSE_EVENT, null)
      }
    })
  }

  onShow() {
    this.nodeRef(this.__idInput).focus()
  }

  onHide() {

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
  /**
   * @param {function} clb
   */
  close(clb) {
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(CLOSE_EVENT)
        .callback((payload) => {
          clb(payload)
        })
        .build()
    )
  }

  /**
   * @param {function} clb
   */
  selectItem(clb) {
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(SELECT_EVENT)
        .callback((item) => {
          console.log('SELECT', item)
          clb(item)
        })
        .build()
    )
  }

  /**
   * @param {function} clb
   */
  unselectItem(clb) {
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(UNSELECT_EVENT)
        .callback((item) => {
          console.log('UNSELECT', item)
          clb(item)
        })
        .build()
    )
  }

  /**
   * @param {function} clb
   */
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

  /**
   * @param {function} clb
   */
  search(clb) {
    return this._subscriber(
      EventListenerOrderedBuilder
        .listen(SEARCH_EVENT)
        .callback((value) => {
          clb(value)
        })
        .build()
    )
  }
}
