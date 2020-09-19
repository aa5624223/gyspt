// pages/userInfo/userInfo.js
var app = getApp();
var _this;
var changePasFlg = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    error:"",
    success:"",
    pas0:"",
    pas1:"",
    pas2:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    this.setData({
      userInfo:app.data.userInfo
    });
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      var list = app.setTabs();
        this.getTabBar().setData({
          selected: 3,
          list:list
        })
    }

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
  pas0Change(e){
    this.data.pas0 = e.detail.value;
  },
  pas1Change(e){
    this.data.pas1 = e.detail.value;
  },
  pas2Change(e){
    this.data.pas2 = e.detail.value;
  },
  changePas(){
    if(changePasFlg){
      return;
    }
    if(this.data.pas1!=this.data.pas2){
      _this.setData({
        pas1:"",
        pas2:"",
        error:'两次密码输入不同'
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确定更改密码吗？',
      success(res) {
        if(res.confirm){
          changePasFlg = true;
          wx.request({
            method:'POST',
            url: app.data.serverAddress + 'GetAppData/passwordChange',
            data:{
              aid: app.data.appid,
              Factory: app.data.userInfo.Factory,//测试数据 之后要改
              Year: app.data.userInfo.Year,// **
              UserName:app.data.userInfo.UserName,
              password1:_this.data.pas0,  
              password2:_this.data.pas1
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' //修改此处即可
            },
            success:function(res){
              if(res.data.msg=="OK"){
                _this.setData({
                  pas0:"",
                  pas1:"",
                  pas2:"",
                  success:'成功修改密码'
                })
              }else{
                _this.setData({
                  error:'原始密码输入错误'
                })
              }
            },
            complete:function(){
              changePasFlg = false;
            }
          })
        }else{

        }
      }
    })
  },
  Relogin(){
    //var userInfo = wx.getStorageSync('userInfo');
    wx.setStorageSync('userInfo', "");
    wx.navigateTo({
      url: '../login/login',
    })
  }
})