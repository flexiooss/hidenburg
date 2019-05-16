export class AbstractCloseStrategy {

  constructor() {

  }

  canClose() {
    throw new Error('Implements function')
  }
}
