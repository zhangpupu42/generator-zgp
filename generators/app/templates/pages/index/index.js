import { connect } from '../../redux/index.js'
import TestController from '../../controller/controller.js'
const app = getApp()
const store = app.store
let pageConfig = {
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    test:null
  },
  onLoad: function () {
    this.initController()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  initController:function(){
    let test =  new TestController()
    app.globalData.testController = test
    this.setData({test})
  },
  callTestControllerTest:function(){
    this.data.test.test()
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
}
const mapStateToData = (state) => {
  return {
    testVal: state.testVal,
    testVal1: state.testVal1,
    testVal2: state.testVal2,
    testVal3: state.testVal3,
  }
}
const mapDispatchToPage = (dispatch) => ({
  testEvent3: (e) => {
    let vals = e.currentTarget.dataset
    return dispatch({
      type: 'Test_Event3',
      payload:vals
    })
  }
})
const connectedPageConfig = connect(mapStateToData, mapDispatchToPage)(pageConfig)
Page(connectedPageConfig)
