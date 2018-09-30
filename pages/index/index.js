//index.js
//获取应用实例
const app = getApp()
const User = require('../../services/user');
const AV = require('../../utils/av-live-query-weapp-min');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showModal: false
  },
  onLoad: function () {
    if (this.data.canIUse) {
      //更新leancloud用户信息
      AV.User.loginWithWeapp().then(user => {
        this.setData({
          userInfo: user.toJSON()
        })
      }).catch(console.error);
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          if (e.detail.userInfo) {
            //更新leancloud用户信息
            AV.User.loginWithWeapp().then(user => {
              user.set(res.userInfo).save();
              this.setData({
                userInfo: user.toJSON(),
                hasUserInfo: true
              })
              console.log(this.data.userInfo);
            }).catch(console.error);
          }
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      //登陆leancloud
      AV.User.loginWithWeapp().then(user => {
        user.set(e.detail.userInfo).save();
        this.setData({
          userInfo: AV.User.current().toJSON(),
          hasUserInfo: true
        })
        console.log(this.data.userInfo);
      }).catch(console.error);
    }
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    AV.User.loginWithWeapp().then(user => {
      this.setData({
        userInfo: user.toJSON()
      })
      console.log(this.data.userInfo)
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }).catch(console.error);
  },
  showModal: function(){
    wx.showModal({
      title: '兑换说明',
      content: '您每次使用优惠券淘宝购物，都可以兑换红包，满100金币即可兑换，汇率100金币=1元。可以点击导航栏‘优惠’进入优惠券商城，复制优惠链接去淘宝天猫购买。购买以后添加客服微信，发送订单截图，系统会自动处理。',
      showCancel: false,
      cancelText: '',
      cancelColor: '',
      confirmText: '关闭',
      confirmColor: '',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '我在这里领到了好多金币，送你1次抽奖机会，100%有奖！',
      path: 'pages/wheel/wheel?username=xxxxx',
      imageUrl: "",
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }
})
