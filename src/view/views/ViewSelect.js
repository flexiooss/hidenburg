import { e, ElementEventListenerBuilder, RECONCILIATION_RULES, View } from 'hotballoon'
import listStyle from './css/itemList.css'
import inputStyle from './css/input.css'
import { ActionSelectItemPayloadBuilder } from '../../generated/io/flexio/component_select/actions/ActionSelectItemPayload'
import { ItemBuilder } from '../../generated/io/flexio/component_select/types/Item'

const NO_SELECTED_LABEL_INPUT = 'Choisir ...'

export class ViewSelect extends View {
  /**
   *
   * @param {ViewSelectConfig} config
   */
  constructor(config) {
    super(config.getViewContainer())

    this.__viewContainer = config.getViewContainer()
    this.__proxyStore = config.getProxyStore()
    this.__stateStore = config.getStateStore()
    this.__viewItemBuilder = config.getViewItemBuilder()
    this.__actionSelect = config.getActionSelect()

    this.__idSelectDiv = 'selectHB'
    this.__idSelectInput = 'inputHB'
    this.__idSelectList = 'listHB'

    this.subscribeToStore(this.__proxyStore)
    this.subscribeToStore(this.__stateStore)
  }

  template() {
    let views = this.__createViews()
    return this.html(
      e('div#' + this.__idSelectDiv)
        .childNodes(
          this.__inputSelect(),
          this.html(
            e('div#' + this.__idSelectList)
              .className(listStyle.itemList)
              .views(...views)
              .reconciliationRules(
                RECONCILIATION_RULES.FORCE
              )
          )
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

  __handleEventFromView(view) {
    view.on().selectItem((item) => {
      this.__hideItems()
      this.__actionSelect.dispatch(
        new ActionSelectItemPayloadBuilder().item(item).build()
      )
    })
  }

  __showItems() {
    this.nodeRef(this.__idSelectList).style.display = 'block'
    this.__manageOutsideClick()
  }

  __hideItems() {
    this.nodeRef(this.__idSelectList).style.display = 'none'
  }

  __manageOutsideClick() {
    let listener = (event) => {
      let p = '#' + this.nodeRef(this.__idSelectInput).id
      if (event.target.closest(p) === null) {
        this.__hideItems()
        document.removeEventListener('click', listener)
      }
    }
    document.addEventListener('click', listener)
  }

  __inputSelect() {
    return this.html(
      e('input#' + this.__idSelectInput)
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
              this.__showItems()
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
}
