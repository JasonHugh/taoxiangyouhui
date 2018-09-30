//app.js
const AV = require('./utils/av-live-query-weapp-min');

AV.init({
  appId: 'fN6Uvj8MvNXkHV6T4ivfYiL6-gzGzoHsz',
  appKey: 'MkNRyBI2PArW6MzuxLllAuiD',
});

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    AV.User.loginWithWeapp().then(user => {
      this.globalData.userInfo = user.toJSON()
      console.log(this.globalData.userInfo)
    }).catch(console.error);

  },
  globalData: {
    userInfo: null
  }
})