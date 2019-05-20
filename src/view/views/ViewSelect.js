import {
  e,
  ElementEventListenerBuilder,
  EventListenerOrderedBuilder,
  RECONCILIATION_RULES,
  View,
  VIEW_MOUNTED,
  VIEW_UPDATED
} from 'hotballoon'
import listStyle from './css/itemList.css'
import inputStyle from './css/input.css'
import {PrivateActionSelectItemPayloadBuilder} from '../../generated/io/flexio/component_select/actions/PrivateActionSelectItemPayload'
import {ItemBuilder} from '../../generated/io/flexio/component_select/types/Item'
import {PrivateActionSelectMultipleItemsPayloadBuilder} from "../../generated/io/flexio/component_select/actions/PrivateActionSelectMultipleItemsPayload";
// import {ComponentAtmosphereLayersBuilder} from "atmosphere-layers";

const NO_SELECTED_LABEL_INPUT = 'Choisir ...'

export class ViewSelect extends View {
  /**
   *
   * @param {ViewSelectConfig} config
   */
  constructor(config) {
    super(config.getViewContainer())

    this.__component = config.getComponent()
    this.__viewContainer = config.getViewContainer()
    // this.__layers = config.getLayers()
    this.__proxyStore = config.getDataStore()
    this.__stateStore = config.getStateStore()
    this.__viewItemBuilder = config.getViewItemBuilder()

    this.__actionSelect = config.getActionSelect()
    this.__component = config.getComponent()
    this.__actionMultipleSelect = config.getActionMultipleSelect()

    this.__idSelectDiv = 'selectHB'
    this.__idSelectInput = 'inputHB'
    this.__idSelectList = 'listHB'

    this.subscribeToStore(this.__proxyStore)
    this.subscribeToStore(this.__stateStore)

    this.__closeStrategy = config.getCloseStrategy()

    this.__clbOutside = null
    this.__hideOn(VIEW_MOUNTED, VIEW_UPDATED)
  }

  template() {
    let rect = this.__viewContainer.parentNode.getBoundingClientRect()

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
        ).styles(inputStyle.container)
        .listenEvent(
          ElementEventListenerBuilder
            .listen('focusin')
            .callback((event) => {
              this.__openList()
            })
            .build()
        ).listenEvent(
        ElementEventListenerBuilder
          .listen('focusout')
          .callback((event) => {
            if (event.relatedTarget !== null) {
              this.__closeList()
            }
          })
          .build()
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
      this.__actionSelect.dispatch(
        new PrivateActionSelectItemPayloadBuilder().item(item).build()
      )
    })
    view.on().selectMultipleItems((item) => {
      this.__actionMultipleSelect.dispatch(
        new PrivateActionSelectMultipleItemsPayloadBuilder().itemTo(item).build()
      )
    })
  }

  __openList() {
    this.nodeRef(this.__idSelectList).style.display = 'block'
    if (this.__clbOutside === null) {
      this.__clbOutside = this.__manageOutsideClick.bind(this)
      document.addEventListener('click', this.__clbOutside);
    }
  }

  __closeList() {
    // console.log('close', this.nodeRef(this.__idSelectList).id)
    this.nodeRef(this.__idSelectList).style.display = 'none'
    document.removeEventListener('click', this.__clbOutside);
    this.__clbOutside = null
  }

  __manageOutsideClick(event) {
    let el = '#' + this.nodeRef(this.__idSelectDiv).id
    if (event.target.closest(el) === null) {
      this.__closeList()
    }
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
              this.__openList()
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

  __hideOn(...event) {
    this._on(
      EventListenerOrderedBuilder
        .listen(...event)
        .callback(() => {
          if (this.__closeStrategy.canClose()) {
            // console.log('hide')
            this.__closeList()
          }
          }
        )
        .build()
    )
  }
}
