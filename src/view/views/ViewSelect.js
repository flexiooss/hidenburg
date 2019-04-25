import {e, ElementEventListenerBuilder, View} from "hotballoon";
import listStyle from './css/itemList.css'
import inputStyle from './css/input.css'


export class ViewSelect extends View {
  /**
   *
   * @param {ViewContainer} viewContainer
   * @param {StoreInterface} proxyStore
   * @param {View} viewItemBuilder
   */
  constructor(viewContainer, proxyStore, viewItemBuilder) {
    super(viewContainer)

    this.__viewContainer = viewContainer

    this.__proxyStore = proxyStore
    this.__viewItemBuilder = viewItemBuilder

    this.__idSelectDiv = 'selectHB'
    this.__idSelectInput = 'inputHB'
    this.__idSelectList = 'listHB'

    this.subscribeToStore(proxyStore)
  }

  template() {
    let items = this.__createViews()
    console.log(items)
    return this.html(
      e('div#' + this.__idSelectDiv)
        .childNodes(
          this.__inputSelect(),
          this.html(
            e('div#' + this.__idSelectList)
              .className(listStyle.itemList)
              .views(...items)
          )
        )
    )
  }

  __createViews() {
    let views = []
    this.__proxyStore.state().data.forEach((state) => {
      let itemView = this.__viewItemBuilder.createView(this.__viewContainer, state)
      let view = this.addView(itemView)
      views.push(view)
    })

    views.forEach((view) => {
      view.on().selectItem((item) => {
        this.__hideItems()
      })
    })
    return views
  }

  __showItems(event) {
    this.nodeRef(this.__idSelectList).style.display = 'block'
    this.__manageOutsideClick()
  }

  __hideItems() {
    this.nodeRef(this.__idSelectList).style.display = 'none'
  }

  __manageOutsideClick() {
    let listener = (event) => {
      // console.log(event)
      let p = '#' + this.nodeRef(this.__idSelectInput).id
      // console.log(p)
      // console.log(event.target.closest(p))
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
          'value': this.__proxyStore.state().data[0].label(),
          'autocomplete': 'off',
          'readonly': ''
        })
        .className(inputStyle.input)
        .listenEvent(
          ElementEventListenerBuilder
            .listen('click')
            .callback((event) => {
              this.__showItems(event)
            })
            .build()
        )
    )
  }
}
