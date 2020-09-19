// pages/login.js
const app = getApp();
var _this;
var btn_ConfirmFlg = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid:app.data.appid,
    openid: app.data.userInfo.openid,
    userInfo:{},
    Fa:[],
    Fayear: [],//账套
    faIndex:0,
    faValue:"",
    yearIndex:0,
    yearValue:"",
    error:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      app.data.userInfo = userInfo;
      wx.switchTab({url:'../index/index'});
    }else{
      this.setUserInfo();
      this.getZt();
    }
    
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

  },
  //获取用户信息
  getUserInfo:function(res){
    var userInfo = JSON.parse(res.detail.rawData);
    _this.setData({
      userInfo: userInfo
    });
  },
  //获取openid
  setUserInfo:function(){
    setTimeout(function (res) {
      if (app.data.userInfo.openid==''){
        // wx.showModal({
        //   title: '提示',
        //   content: "服务器无响应,请联系管理员!",
        // });
      }else{
        _this.setData({
          openid: app.data.userInfo.openid
        })
      }
    }, 2000)
  },
  //登录账号
  btn_Confirm:function(e){
    if(btn_ConfirmFlg){
      return;
    }
    //UserId
    //uName
    var formData = e.detail.value;
    if(formData.userName==""){
      this.setData({
        error: '请输入账号'
      })
      return;
    }
    if(formData.password==""){
      this.setData({
        error: '请输入密码'
      })
      return;
    }
    
    if(JSON.stringify(_this.data.userInfo)=='{}'){
      this.setData({
        error: '请先获取用户信息'
      })
      return;
    }
    formData.Factory = this.data.Fa[this.data.faIndex];
    formData.Year = this.data.Fayear[this.data.yearIndex];
    formData.openid = app.data.userInfo.openid;
    var i = 0;
    btn_ConfirmFlg = true;
    wx.request({
      method: 'POST',
      url: app.data.serverAddress + 'Certify/login',
      data: formData,
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success:function(res){
        if(res.data.msg=="NOTFOUNT"){
          _this.setData({
            error: '账号密码错误'
          })
        }else if(res.data.msg="OK"){
          //跳转到首页
          app.data.userInfo = res.data.data;
          //将信息存储到本地
          wx.setStorageSync('userInfo', res.data.data);
          
          wx.switchTab({url:'../index/index'})
        }
      },
      complete:function(){
        btn_ConfirmFlg = false;
      }
    })
  },
  getZt:function(){
    wx.request({
      data:{
        appid:app.data.appid,
        openid:app.data.userInfo.openid,
      },
      url: app.data.serverAddress + 'Certify/getLoginData',
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success:function(res){
        var zt = res.data.zt;
        var faList = [];
        var yeList = [];
        zt.forEach(function(item){
          if(item.factory!=undefined){
            faList.push(item.factory);
          }
          if(item.year!=undefined){
            yeList.push(item.year);
          }
        });
        _this.setData({
          Fa: faList,
          Fayear:yeList,
          faIndex:0,
          yearIndex:0
        });
      },
      fail:function(error){
        // wx.showModal({
        //   title: '提示',
        //   content: "服务器无响应,请联系管理员!",
        // });
      },
      complete:function(){}
    })
  },
  bindFaChange: function (e) {
    //faValue
    _this.setData({
      faIndex: e.detail.value
    })
  },
  bindYearChange: function (e) {
    //yearValue
    _this.setData({
      yearIndex: e.detail.value
    })
  }
})