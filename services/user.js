/**
 * 用户相关服务
 */

const app = getApp()
const util = require('../utils/util.js');
const api = require('../config/api.js');
const AV = require('../utils/av-live-query-weapp-min');

/**
 * 调用微信登录
 */
function login(userInfo) {
  AV.User.loginWithWeapp().then(user => {
    user.set(userInfo).save();
    console.log(AV.User.current())
  }).catch(console.error);
}

module.exports = {
  login
};