App({

  onLaunch: function () {

    var that = this
    tt.login({
      success: res => {
        if (res.code) {
          tt.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              that.globalData.userInfo = res.userInfo;
            }
          });
          var d = that.globalData;//这里存储了appid、secret、token串  
          tt.request({
            url: 'https://fanfan.skyable.cn/appdy/toutiao/user?CODE='+res.code,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
            // header: {}, // 设置请求的 header  
            success: function (res) {
              console.log(res.data)
              var obj =  res.data;
              that.globalData.user = obj;
            }
          });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

    // 获取用户信息
    tt.getSetting({
      success: res => {
        console.log("scope.userInfo="+res.authSetting['scope.userInfo'])
        if(res.authSetting['scope.userInfo'] == undefined){
          this.globalData.permissionFlag = 0
        }else if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          tt.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
            }
          })
          this.globalData.permissionFlag = 1
        }else{
          this.globalData.permissionFlag = 2
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    user: null,
    permissionFlag:null,
    market_id:1
  }
})
