// pages/OrderIn/OrderIn.js
var app = getApp();
var _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gysCode:app.data.userInfo.gysCode,
    Role:'',
    Status: [
      {
        value:0,
        text:'获取中',
      }
    ],
    BeginDate: '',
    EndDate: '',
    StIndex: 0,
    slideButtons:[],
    OrderList:[],
    error:"",
    GysCodeTemp:"",
    loadShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app = getApp();
    _this = this;
    var slideButtons = [
      // {
      //   text: '明细',
      // },
      {
        text: '记录'
      }
    ];
    _this.setData({
      slideButtons:slideButtons
    });
    _this.getStatus();
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
    _this.setData({
      gysCode:app.data.userInfo.gysCode,
      Role:app.data.userInfo.cRole
    })
    
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      var list = app.setTabs();
        this.getTabBar().setData({
          selected: 1,
          list:list
        })
    }
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D1 = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var Count =0;
    var M2;
    var Y2;
    var D2;
    var DayCount;
    //获得当月有多少天
    switch(date.getMonth()+1){
        case 1:
          DayCount=31;
         break;
        case 3:
          if(Y%4==0){
            DayCount=29;
          }else{
            DayCount=28;
          }
          break;
        case 5:case 7:case 10:case 12:
          DayCount=30;
          break;
        case 4:case 6:case 8:case 9:case 11:
          DayCount=31;
          break;
    }
    D2 = date.getDate()-2;
    if(D2<=0){
      if(date.getMonth()+1==1){
        Y2 = Y-1;
        M2 = 12;
        D2 = DayCount+D2<10?'0'+DayCount+D2:DayCount+D2;
      }else{
        Y2 = Y;
        M2 = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth();
        D2 = DayCount+D2<10?'0'+DayCount+D2:DayCount+D2;
      }
    }else{
      M2 = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth();
      Y2 = Y;
      D2 = D2<10?'0'+D2:D2;
    }
    this.setData({
      EndDate:Y+'-'+M+"-"+D1,
      BeginDate:Y2+'-'+M2+"-"+D2
    });
    
    //查找数据
    //this.getData();
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

  },
  getStatus:function(){
    wx.request({
      url: app.data.serverAddress + 'GetAppData/getOrderStatus',
      method:'POST',
      data:{
        aid: app.data.appid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success:function(res){
        res.data.data[0].text = "全部";
        _this.setData({
          Status:res.data.data
        })
      },
      fail:function(){

      }
    })
  },
  getData: function () {
    //测试数据
    var t1 = _this.data.BeginDate;
    var t2 = _this.data.EndDate;
    var status = _this.data.StIndex;
    var gysCode = _this.data.gysCode;
    if(gysCode==undefined || gysCode=="" ){
      this.setData({
        error: '请输入供应商编码'
      })
      return;
    }
    if(status==0){
      status="";
    }
    if(status==undefined ){
      this.setData({
        error: '请选择状态'
      })
      return;
    }

    if(t1==undefined || t1=="" ){
      this.setData({
        error: '请选择开始日期'
      })
      return;
    }
    if(t2==undefined || t2=="" ){
      this.setData({
        error: '请选择结束日期'
      })
      return;
    }
    _this.setData({
      loadShow:true
    });
    wx.request({
      url: app.data.serverAddress + 'GetAppData/getOrderInInfo',
      dataType: 'json',
      method: 'POST',
      data: {
        aid: app.data.appid,
        Factory: app.data.userInfo.Factory,
        Year: app.data.userInfo.Year,
        BeginData: t1,
        EndData: t2,
        cRole: app.data.userInfo.cRole,
        UserName: app.data.userInfo.UserName,
        Status: status,
        gysCode: gysCode
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        if(res.data.msg=="OK"){
          
          _this.setData({
            OrderList:res.data.data,
            GysCodeTemp:gysCode,
            loadShow:false
          });
        }else{
          _this.setData({
            error: '没有查到入库单',
            GysCodeTemp:gysCode,
            OrderList:[]
          })
        }
      },
      fail: function (error) {
        wx.showModal({
          title: '提示',
          content: "服务器无响应,请联系管理员!",
        });
      },
      complete:function(){
        _this.setData({
          loadShow:false
        })
      }
    })
  },
  bindStatus(e) {
    _this.setData({
      StIndex: e.detail.value
    });
  },
  bindDateChange1(e) {
    //BeginDate
    _this.setData({
      BeginDate: e.detail.value,
    })
  },
  bindDateChange2(e) {
    //EndDate
    _this.setData({
      EndDate: e.detail.value,
    })
  },
  slideButtonTap(e){

    var id = e.currentTarget.dataset.id; //获取id
    var gys = _this.data.GysCodeTemp;
    // if(e.detail.index==0){//明细
    //   wx.navigateTo({
    //     url: '../OrderIn_Det/OrderIn_Det?id='+id+'&gys='+gys,
    //   })
    // }else{//操作记录
    //   wx.navigateTo({
    //     url: '../OrderIn_Rec/OrderIn_Rec?id='+id+'&gys='+gys,
    //   })
    // }
    wx.navigateTo({
      url: '../OrderIn_Rec/OrderIn_Rec?id='+id+'&gys='+gys,
    })
  },
  CodeChange(e){
    this.data.gysCode = e.detail.value;
  }
})