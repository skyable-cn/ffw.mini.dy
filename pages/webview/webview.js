// pages/webview/webview.js
Component({
  data: {
    path:'https://fanfan.skyable.cn/appdy/index'
  },
  properties: {

  },
  methods: {
    onLoad: function (options) {
          if (options.path) {
            this.setData({
              path: decodeURIComponent(options.path)
            })

            console.log("webview="+decodeURIComponent(options.path))
          }
    }
  }
})