// pages/share/share.js
Component({
  data: {
    type:null,
    fromopenid:null,
    image: null,
    title:null,
    datakey:null,
    url:null
  },
  properties: {

  },
  methods: {

    onLoad: function (options) {

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

      if (options.image) {
        this.setData({
          image: options.image
        })
      }

      if (options.title) {
        this.setData({
          title: options.title
        })

        tt.setNavigationBarTitle({
          title: this.data.title
        })
      }

      if (options.datakey) {
        this.setData({
          datakey: options.datakey
        })
      }

      if (options.url) {
        this.setData({
          url: options.url
        })
      }
      console.log("share:" + JSON.stringify(options))

    },

    onShareAppMessage: function () {
      var returnData = {
        title: this.data.title,
        path: "/pages/index/index?type=" + this.data.type + "&fromopenid=" + this.data.fromopenid + "&datakey=" + this.data.datakey,
        success: function (res) {
          tt.navigateBack({
            delta: 1
          })
        }
      }

      console.log("shareMessage:" + JSON.stringify(returnData))

      return returnData;
    }
  }
})