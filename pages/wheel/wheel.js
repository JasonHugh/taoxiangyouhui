import Wheel from '../../components/wheel/wheel.js'

const app = getApp()
const AV = require('../../utils/av-live-query-weapp-min');

Page({
    data: {
      mode: 1,
      awards: [5, 10, 5, 5, 10, 5, 5, 100],
      userInfo: {}
    },

    onLoad () {
      //获取用户信息
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo
        }),
        console.log(this.data.userInfo)
      }
      const self = this
      this.wheel = new Wheel(this, {
          areaNumber: 8,
          speed: 16,
          awardNumers: [0,2,3,5,6],
          mode: 2,
          callback: (idx) => {
            var gold = this.data.awards[idx];
            wx.showModal({
              title: '提示',
              content: '恭喜您，中了 ' + gold + " 积分",
              showCancel: false,
              confirmText: '立即领取',
              success: res => {
                  self.wheel.reset()
                  if (res.confirm) {
                    //用户加积分
                    var GoldLog = AV.Object.extend('GoldLog');
                    // 新建一个 Todo 对象
                    var goldLog = new GoldLog();
                    console.log(this.data.userInfo)
                    goldLog.set('username', this.data.userInfo.username);
                    goldLog.set('gold', gold);
                    goldLog.set('action', 1);
                    goldLog.set('status', 3);
                    goldLog.save().then(function (todo) {
                      // 成功保存之后，执行其他逻辑.
                      console.log('New object created with objectId: ' + goldLog.id);
                    }, function (error) {
                      // 异常处理
                      console.error('Failed to create new object, with error message: ' + error.message);
                    });
                  }
              }
            })
          }
      })
    },

    onReady () {
        console.log('onReady')
    },

    onSwitchMode (event) {
        const mode = event.currentTarget.dataset.mode
        this.setData({ mode })
        this.wheel.switch(mode)
    }

})
