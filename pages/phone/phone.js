// pages/phone/phone.js
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
    phone: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (options) {
      if (options.phone) {
        this.setData({
          phone: options.phone
        })

        console.log(options.phone)
        this.phoneOperator();
      }
  },

  phoneOperator:function (){
    var that = this;
    tt.showActionSheet({
      itemList: ['拨打电话', '复制号码'],
      success: function (res) {
        if (res.tapIndex === 0) {
          // 呼叫号码
          tt.makePhoneCall({
            phoneNumber: that.data.phone,
          })
        }else if (res.tapIndex == 1) {
          // 复制到粘贴板
          tt.setClipboardData({
            data: that.data.phone,
            success(res) {
             
            }
          })
        }
      }
    })
  },
  }
})
