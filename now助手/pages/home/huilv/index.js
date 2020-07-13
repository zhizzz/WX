
Page({
  data: {
    leftArray: ['CNY', 'USD', 'HKD', 'TWD', 'MOP', 'GBP', 'EUR'],
    rightArray: ['人民币', '美元', '港币', '台币', '澳门币', '英镑', '欧元'],
    selectArray: ['人民币 CNY', '美元 USD', '港币 HKD', '台币 TWD', '澳门币 MOP', '英镑 GBP', '欧元 EUR'],
    index1: '0',
    index2: '1',
    scur: 'CNY',
    tcur: 'USD',
    rate: '',
  },
  //选择第一个货币
  scurSelect1: function (e) {
    var that = this;
    this.setData({
      index1: e.detail.value,
      scur: that.data.leftArray[e.detail.value],
    })
  },
  //选择第二个货币
  scurSelect2: function (e) {
    var that = this;
    this.setData({
      index2: e.detail.value,
      tcur: that.data.leftArray[e.detail.value],
    })
  },

  //转换汇率
  exchange1: function (e) {
    var num;
    var that = this;
    wx.request({
      url: 'https://sapi.k780.com/?app=finance.rate&',
      data: {
        scur: that.data.scur,
        tcur: that.data.tcur,
        appkey: '49869',
        sign: 'b85e16ac0a4d3569d618a444599fa0b3'
      },
      success: function (res) {
        if (res.data.success == 1) {
          num = res.data.result.rate * e.detail.value;
          num = num.toFixed(2);
          that.setData({
            input2: num,
          })
        } else if (res.data.success == 0) {
          console.log("转换失败")
        } else {
          console.log("转换失败")
        }
      }
    })
  },

  exchange2: function (e) {
    var num;
    var that = this;
    wx.request({
      url: 'https://sapi.k780.com/?app=finance.rate&',
      data: {
        scur: that.data.tcur,
        tcur: that.data.scur,
        appkey: '49869',
        sign: 'b85e16ac0a4d3569d618a444599fa0b3'
      },
      success: function (res) {
        if (res.data.success == 1) {
          num = res.data.result.rate * e.detail.value;
          num = num.toFixed(2);
          that.setData({
            input1: num,
          })
        } else if (res.data.success == 0) {
          console.log("转换失败")
        } else {
          console.log("转换失败")
        }
      }
    })
  }

})
