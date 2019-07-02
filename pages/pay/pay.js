// pages/pay/pay.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    type:null,
    id:null,
    sn:null,
    original:null,
    derate:null,
    money:null,

    typegoods:false,
    typeproduct:false,

    state:'等待支付'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      console.log(options)
      if (options.type) {
        this.setData({
          type: options.type
        })

        if (options.type == 'goods'){
          this.setData({
            typegoods: true
          })
        } else if (options.type == 'product'){
          this.setData({
            typeproduct: true
          })
        }else{

        }
      }
      if (options.id) {
        this.setData({
          id: options.id
        })
        this.pay();
      }
      if (options.sn) {
        this.setData({
          sn: options.sn
        })
      }
      if (options.original) {
        this.setData({
          original: options.original
        })
      }
      if (options.derate) {
        this.setData({
          derate: options.derate
        })
      }
      if (options.money) {
        this.setData({
          money: options.money
        })
      }
    },

    pay:function(){
      var that = this;
      var url = null;
      if (that.data.type == 'goods') {
        url = "my";
      } else if (that.data.type == 'product') {
        url = "member";
      } else {

      }
      wx.request({
        url: 'https://fanfan.skyable.cn/appdy/dyPay?openid='+app.globalData.user.openid,
        data: {
          TYPE: that.data.type,
          ID: that.data.id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (res.data.STATEFLAG=='OK'){
          tt.requestPayment({
            data: {
              app_id: res.data.app_id,
              method: 'tp.trade.confirm',
              sign: res.data.sign,
              sign_type: 'MD5',
              timestamp: res.data.timestamp,
              trade_no: res.data.trade_no,
              merchant_id: res.data.merchant_id,
              uid: res.data.uid,
              total_amount: parseInt(res.data.total_amount),
              pay_channel: 'ALIPAY_NO_SIGN',
              pay_type: 'ALIPAY_APP',
              params: JSON.stringify({
                url: res.data.url
              }),
              risk_info:JSON.stringify({
                ip:res.data.ip,
                device_id:"10001"
              })
              },
              success (res) {
                console.log(res);
                tt.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 3000,
                success: function(){
                   setTimeout(function(){
                      tt.navigateTo({
                        url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/appdy/my?openid=' + app.globalData.user.openid)
                      })
                    },2000);
                }
              });
              console.log("支付成功")
              },
              fail (res) {
                console.log(res);
                tt.showToast({
                title: '支付失败',
                icon: 'success',
                duration: 3000,
                success: function(){
                    setTimeout(function(){
                      tt.navigateTo({
                        url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/appdy/my?openid=' + app.globalData.user.openid)
                      })
                    },2000); 
                }
              });
              console.log("支付失败")
              }
            })
          }else{
            tt.showModal({
              title: '系统提示',
              content: '该订单参数错误或已经支付',
              success(res) {
                tt.navigateTo({
                  url: '../webview/webview?path=' + encodeURIComponent('https://fanfan.skyable.cn/appdy/' + url + '?openid=' + app.globalData.user.openid)
                })
              },
              showCancel:false
            })
          }
        }
      })
    }
  }
})