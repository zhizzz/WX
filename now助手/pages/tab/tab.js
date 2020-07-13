// pages/studynote/index.js 7c84705858134824b17db8abac4b3e83
 var List
var baseUrl =  "http://api.k780.com/?app=weather.future&appkey=49869&sign=b85e16ac0a4d3569d618a444599fa0b3&format=json&weaid="
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    List:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this
    var city = '惠州'
    wx.request({
      url: baseUrl+city,
      success:(res)=>{
        console.log(res)
        that.List = res.data.result
        this.setData({
          List:that.List
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})