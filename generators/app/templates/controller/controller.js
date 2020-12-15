let app = getApp()
let store = app.store

export default class TestController {
  constructor() {
    store.dispatch({
      type: 'Test_Event',
      payload: {
        val1: 'test constructor value1',
        val2: 'test constructor value2'
      }
    })
  }
  test() {
    store.dispatch({
      type: 'Test_Event1',
      payload: {
        val1: 'test test value1',
        val2: 'test test value2'
      }
    })
  }
}