//index.js
//获取应用实例
const app = getApp()

Page({
 data: {
    logo:'../images/logo.jpg',
    type:null,
    datakey:null,
    fromopenid:null,
    motto: '欢迎使用西安美食推荐',
    userInfo: {},
    hasUserInfo: false,
    interval1:null,
    interval2:null
  },
  onLoad: function (options) {

    console.log("index:" + JSON.stringify(options))

    if (options.type) {
      this.setData({
        type: options.type
      })
    }

    if (options.fromopenid) {
      this.setData({
        fromopenid: options.fromopenid
      })
    }

    if (options.datakey) {
      this.setData({
        datakey: options.datakey
      })
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      tt.getUserInfo({
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
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo != undefined){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  onShow: function () {
    this.init();
  },
  init: function () {
    this.data.interval1 = setInterval(this.goIndex,1000);
    this.data.interval2 = setInterval(this.goPermission,1000);
  },
  goIndex:function (){
    var that = this;
    if (that.data.hasUserInfo && app.globalData.user != null){
      console.log(app.globalData.user)
      console.log(app.globalData.location)
      console.log(that.data.userInfo)
      if (that.data.userInfo == undefined){
        return;
      }
      tt.request({
        url: 'https://fanfan.skyable.cn/appdy/system/init', //仅为示例，并非真实的接口地址
        data: {          //参数为json格式数据
          FROMWXOPEN_ID: that.data.fromopenid,
          WXOPEN_ID: app.globalData.user.openid,
          PHOTO: that.data.userInfo.avatarUrl,
          SEX: that.data.userInfo.gender,
          NICKNAME: that.data.userInfo.nickName,
          MARKET_ID:app.globalData.market_id
        },
        header: {
          //设置参数内容类型为json
          'content-type': 'application/json'
        },
        success: function (res) {
          if (that.data.type){
            if (that.data.type =='lottery'){
              tt.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/appdy/lottery/info?LOTTERY_ID=' + that.data.datakey + '&openid=' + app.globalData.user.openid)
              }) 
            } else if (that.data.type == 'goods'){
              tt.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/appdy/goods/info?GOODS_ID=' + that.data.datakey+'&openid=' + app.globalData.user.openid+'&fromopenid='+that.data.fromopenid)
              }) 
            } else if (that.data.type == 'friends'){
              tt.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/appdy/index?openid=' + app.globalData.user.openid)
              })
            } else if (that.data.type == 'vipinfo'){
              tt.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/appdy/member?openid=' + app.globalData.user.openid)
              })
            }else{
              tt.navigateTo({
                url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/appdy/index?openid=' + app.globalData.user.openid)
              })
              }
          }else{
            tt.navigateTo({
              url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/appdy/index?openid=' + app.globalData.user.openid)
            })
          }
          
        }
      })

      clearInterval(this.data.interval1);
    }else{
      console.log("wait for user . . . ")
    }
  },
  goPermission:function(){
    var that = this;
    if (app.globalData.permissionFlag != null && app.globalData.permissionFlag == '0'){
      tt.showToast({
        title: '检测授权',
        icon: 'loading',
        duration: 3000
      })
      clearInterval(that.data.interval2);
    } else if (app.globalData.permissionFlag != null && app.globalData.permissionFlag == '1'){
      clearInterval(that.data.interval2);
    } else if (app.globalData.permissionFlag != null && app.globalData.permissionFlag == '2'){
      tt.hideLoading()
      tt.showToast({
        title: '等待授权',
        icon: 'loading',
        duration: 3000
      })
            tt.openSetting({
              success(res) {
                console.log(res.authSetting)
                if(res.authSetting['scope.userInfo']){
                  app.globalData.permissionFlag = 1
                  //that.data.interval2 = setInterval(that.goPermission,500);
                  tt.getUserInfo({
                    success: res => {
                      app.globalData.userInfo = res.userInfo
                      that.setData({
                        userInfo : res.userInfo,
                        hasUserInfo : true
                      })
                      //that.data.interval1 = setInterval(that.goIndex,500);
                    }
                  })
                }
              }
            })
      clearInterval(that.data.interval2);
    }else{
      console.log('wait for perission . . . ')
    }
  },
  onShareAppMessage: function () {
      return {
        title: '测试抖音分享',
        imageUrl: '../images/logo.jpg',
        query: 'k1=v1&k2=v2',
        success() {
          console.log('分享成功')
        },
        fail(e) {
          console.log('分享失败', e)
        }
      }
    }
})