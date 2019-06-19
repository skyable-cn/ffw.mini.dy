// pages/scan/scan.js
Component({
  data: {
    shopid: null
  },
  properties: {

  },
  methods: {
    onLoad: function (options) {
      if (options.shopid) {
        this.setData({
          shopid: options.shopid
        })

        console.log(options.shopid)
        this.scanOperator();
      }
    },
    scanOperator:function (){
      var that = this;
      tt.scanCode({
        success (res) {
            console.log(`${res.result}`);
             var path = 'https://fanfan.skyable.cn/appdy/orders/verification?openid=' + app.globalData.user.openid ;
                    tt.navigateTo({
                    url: '../webview/webview?path=' + encodeURIComponent(path)
                    })
        },
        fail (res) {
            console.log(`scanCode调用失败`);
        }
    });
    }
  }
})