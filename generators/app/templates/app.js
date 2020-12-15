import { baseUrl, http, _get, _post } from './utils/http.js'
import { isEmptyObject, _share, strip_tags_all } from './utils/func.js'
import WeAppRedux from './redux/index.js';
import createStore from './redux/createStore.js';
import reducer from './store/reducer.js';
const { Provider } = WeAppRedux;
const store = createStore(reducer)

App(
  Provider(store)({
    globalData: {
      host: baseUrl
    },
    onLaunch: function () {
      // 判断是否可以使用更新接口
      if (wx.canIUse("getUpdateManager")) {
        let updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          if (res.hasUpdate) {
            updateManager.onUpdateReady(function () {
              wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，请重启应用~",
                showCancel: false,
                confirmColor: '#FC9541',
                success(res) {
                  if (res.confirm) {
                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                    updateManager.applyUpdate();
                  }
                }
              });
            });
            updateManager.onUpdateFailed(function () {
              // 新的版本下载失败
              wx.showModal({
                title: "已经有新版本了哟~",
                showCancel: false,
                confirmColor: '#FC9541',
                content: "新版本已经上线啦~，请您删除当前小程序，重新搜索 “憧橙” 打开哟~"
              });
            });
          }
        });
      }
    },
    http,
    _get,
    _post,
    isEmptyObject,
    _share,
    _stripTagsAll:strip_tags_all,
    _toast: function (title) {
      wx.showToast({
        title,
        icon: 'none'
      })
    },
    modal: function ({
      title,
      content,
      confirmText = '确定',
      confirmColor = '#FC9541',
      showCancel = true,
      cancelText = '取消',
      cancelColor = '',
      success = function () {},
      fail = function () {}
    }) {
      let params = {}
      title && (params.title = title)
      content && (params.content = content)
      params.showCancel = showCancel
      params.cancelColor = cancelColor
      params.cancelText = cancelText
      params.confirmColor = confirmColor
      params.confirmText = confirmText
      params.success = success
      params.fail = fail
      console.log(params)
      wx.showModal(params)
    }
  })
)