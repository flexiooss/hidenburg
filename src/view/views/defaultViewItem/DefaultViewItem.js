import {e, View} from "hotballoon";

export class DefaultViewItem extends View {
  constructor(viewContainer, value, label) {
    super(viewContainer)
    this.__value = value
    this.__label = label
  }

  template() {
    return this.html(
      e('option')
        .attributes({'value': this.__value})
        .text(this.__label)
    )
  }
}
