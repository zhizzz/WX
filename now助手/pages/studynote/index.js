var app = getApp();
var datas;
var finishdatas;
var that;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    haha: 'my var',
    list: [],
    textresult: "sdfsfsdf",
  },

  onLoad: function (options) {
    that = this;//初始化全局变量,指向该对象
  },
  onReady: function () {

  },
  onShow: function () {
    var date = new Date();
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var str = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + week[date.getDay()];
    this.setData({
      date: str
    });
    //要注意.这里取出来的是值的复制
    datas = wx.getStorageSync('key');
    console.log('datas', datas);
    this.calculateRemain(datas);
    
    if (datas) {
      this.setData({ list: datas });
    }
  },
  addPlan: function () {
    var path = '../studynote/add/add';
    wx.navigateTo({
      url: path,
    })
  },

  //点击出现下拉菜单
  tapList: function (event) {
    var id = event.currentTarget.id;
    var flag = !datas[id].isShow;
    for (var i = 0; i < datas.length; i++) {
      datas[i].isShow = false;
    }
    datas[id].isShow = flag;
    this.setData({
      list: datas
    });
  },

  //点击完成任务
  tapFinish: function (event) {
    console.log('event', event)
    this.finish(event.currentTarget.id);
  },

  //点击放弃任务
  tapAbandon: function (event) {
    console.log('tapAbandon');
    this.abandon(event.currentTarget.id);
  },

  calculateRemain: function (list) {
    list.map(function (value, index, array) {
      console.log('value', value);
      console.log('object', array[index]);
      var finishTime = new Date(value.time);//年月日
      var currentTime = new Date();
      var remain = finishTime - currentTime;

      array[index].remainTime = Math.floor(remain / 1000 / 60 / 60 / 24) + 1;
    });

    console.log('list', list);
  },
  //定义完成任务函数
  finish: function (id) {
    wx.showModal({
      title: '完成任务',
      content: '请确认您已经完成了任务，不要作弊哦!',
      success: function (res) {
        if (res.confirm) {
          var data = datas.splice(id, 1);//从待执行任务数组中删除并返回被删除的所有元素(数组形式)

        

          data[0].completeTime = new Date().getDate;//返回月份中的某一天
          var d = new Object();
          d.text = data[0].text;
          d.time = data[0].time;
          var dt = new Date();
          d.completeTime = dt.Format('YYYY-MM-dd');
          console.log('d', d);
          finishdatas.push(d);

          //之前操作的是值的复制品,并没有直接修改缓存里的内容,即不是修改指针指向的内容,所以要进行重新保存
          wx.setStorageSync('key', datas);
       

          //更新页面数据
          that.setData({ list: datas });
        }
      }
    })
  },


  //定义放弃任务函数
  abandon: function (id) {
    wx.showModal({
      title: '放弃任务',
      content: '坚持就是胜利，您真的要放弃该计划吗？',
      success: function (res) {
        if (res.confirm) {
          var data = datas.splice(id, 1);
          wx.setStorageSync('key', datas);

          //更新页面数据
          that.setData({ list: datas })
        }
      }
    })
  }
})
