// pages/pay/pay.js
Component({
  data: {

  },
  properties: {

  },
  methods: {
        onLoad: function (options) {

            tt.requestPayment({
                data: {
                    app_id: '800026433243',
                    method: 'tp.trade.confirm',
                    sign: '553589ba4a3e08c291a3a448cd7ec1be',
                    sign_type: 'MD5',
                    timestamp: '1559449320538',
                    trade_no: 'SP2019060122035729155865732751',
                    merchant_id: '1900002643',
                    uid: 'tgqY0ikgQEUkKkc1',
                    total_amount: 120,
                    pay_channel: 'ALIPAY_NO_SIGN',
                    pay_type: 'ALIPAY_APP',
                    params: JSON.stringify({
                        url: 'app_id=800026433243&biz_content=%7B%22subject%22%3A%22test%22%2C%22out_trade_no%22%3A%2220190601012234123%22%2C%22total_amount%22%3A120%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&charset=utf-8&format=JSON&method=alipay.trade.app.pay&notify_url=https%3A%2F%2Ffanfan.skyable.cn%2Fnotice&sign=KSYMLFIFBSL2pD1eblHkdSqxDvEmsSlrh%2F5Mn3YlowqqkMU4dQTTSC7s6sVtJugm5DDPiRz1NZDuCIzsi1PauB18DMPrw3fPyPmIu05FgY5q8agVPrIOkz9QTgTVkUReL5ne0Me2g0YRbCtI70EeZxlLOo2dD96uDxyU7y%2BElP0%3D&sign_type=RSA&timestamp=1559449320538&version=1.0'
                    }),
                    risk_info:JSON.stringify({
                        ip:"123.123.123.1",
                        device_id:"1234"
                    })
                },
                success (res) {
                    console.log(res);
                },
                fail (res) {
                    console.log(res);
                }
            })
   
        }
    }
})