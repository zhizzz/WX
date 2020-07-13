
Page({
  data: {
    detailInfo: true,
    data: "",
    totalMoney: 0,
    outMoney: 0,
    outNumber: 0,
    inMoney: 0,
    inNumber: 0,
    detailOut: 'out',
    detailIn: 'in',
    
  },
  Edit: function () {
    wx.navigateTo({
      url: '../jizhangben/edit/edit'
    })
  },
  onShow: function () {
    // 页面显示
    this.dataShow();
    this.count();
  },
 
 dataShow: function () {
    var value = wx.getStorageSync('key2'); //用不了异步
    if (value == "") {
      this.setData({
        detailInfo: false
      })
    } else {
      this.setData({
        detailInfo: true,
        data: value
      })
    }
  },
  count: function () {
    console.log("开始计算")
    console.log(this.data)
    var totalMoney = 0, outMoney = 0, outNumber = 0, inMoney = 0, inNumber = 0;
    var data = this.data.data;
    for (var i = 0; i < data.length; i++) {
      if (data[i].radioGroup == "-") {
        outNumber++;
        outMoney += parseFloat(data[i].inputMoney);
      } else {
        inNumber++;
        inMoney += parseFloat(data[i].inputMoney);
      }
    }

    totalMoney = inMoney - outMoney;
    inMoney = inMoney.toFixed(1);
    outMoney = outMoney.toFixed(1);
    totalMoney = totalMoney.toFixed(1)
    this.setData({
      totalMoney: totalMoney,
      outMoney: outMoney,
      outNumber: outNumber,
      inMoney: inMoney,
      inNumber: inNumber
    })
    console.log(inNumber)
  },
  deleteRow :function(e){//删除数据
    var midData = this.data.data;
    var deleteId = e.currentTarget.dataset.deleteid;
    midData.splice(deleteId, 1)
    wx.setStorageSync("key2", midData)
    this.setData({
      data: midData
    })
  }
})