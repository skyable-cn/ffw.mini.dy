// pages/webview/webview.js
Component({
  data: {
    path:'https://fanfan.skyable.cn/appdy/index'
  },
  properties: {

  },
  methods: {
    onLoad: function (options) {
      console.log("========== onLoad ");
      if (options.path) {
        this.setData({
          path: decodeURIComponent(options.path)
        })

        console.log("webview="+decodeURIComponent(options.path))
      }
    },
    onShow: function(){
      console.log("========== onShow ");
    },
    onReady:function(){
      console.log("========== onReady ");
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
  }
})