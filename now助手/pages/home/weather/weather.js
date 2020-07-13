// weather.js
const app = getApp();
var baseUrl =  "http://api.k780.com/?app=weather.future&appkey=49869&sign=b85e16ac0a4d3569d618a444599fa0b3&format=json&weaid="
var baseUrl2 =  "http://api.k780.com/?app=weather.today&appkey=49869&sign=b85e16ac0a4d3569d618a444599fa0b3&format=json&weaid="
var QQMap = require('qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js')
var qqmapsdk
var latitude,longitude,city,district,province,isShow
Page({
  data: {
    weatherTodayList:"",
    weatherlist:"",
    updateTime:1,
    updateTime2:"",
    city: '',
    district:'',
    latitude: '',
    longitude: '',
    isShow:false
  },
onLoad:function(e){
  var that = this 
  qqmapsdk = new QQMap({
    key: 'HEOBZ-4FF2G-I45QQ-I6IX3-JWUYO-ZPFJV' //这里自己的key秘钥进行填充
  }) 
  that.getLocation();
},
// 微信获得经纬度
getLocation: function () {
  var that = this;
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log(res)
      latitude = res.latitude
      longitude = res.longitude
      that.getLocal(latitude,longitude)
    },
    fail: function (res) {
      console.log('fail' + (res))
    }
  })
},
//获取当前地理位置
getLocal: function (latitude, longitude) {
  var that = this;
  qqmapsdk.reverseGeocoder({
    location: {
      latitude: latitude,
      longitude: longitude
    },
    success: function (res) {
      console.log(res);
       province = res.result.ad_info.province
       city = res.result.ad_info.city
       district = res.result.ad_info.district
      that.setData({
        province: province,
        city: city,
        district:district,
        latitude: latitude,
        longitude: longitude
      })
      var descCity = city.substring(city.length-1,0)
      that.getNowWeather(descCity);
      that.getsevenWeather(descCity);
    },
    fail: function (res) {
      console.log(res);
    }
  });
},
getNowWeather:function(city){
  var that = this
  wx.request({
    url: baseUrl2 + city,
    success: (res2) => {
      console.log(res2),
       that.weatherTodayList = res2.data.result
       that.updateTime = Number(res2.header.Date.substring(17,19)) +8
       that.updateTime2 = res2.header.Date.substring(19,25)
      this.setData({
         weatherTodayList:that.weatherTodayList,
         updateTime :that.updateTime,
         updateTime2 :that.updateTime2
      })
    }
  })
},
getsevenWeather:function(city){
  var that = this
  wx.request({
    url: baseUrl + city,
    success: (res) => {
      console.log(res),
      that.weatherlist = res.data.result
      this.setData({
        weatherlist:that.weatherlist,
      })
    }
  })
  
},

inputText:function(e){
  var that = this
  if(e.detail.value){
    city = e.detail.value
    that.isShow = true
  }else{
    that.isShow = false
  }
  
},
changeCity:function(e){
    var that = this
     that.getNowWeather(city)
     that.getsevenWeather(city) 
     this.setData({
      city:city,
      isShow:that.isShow
    })
},

})
