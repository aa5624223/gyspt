// pages/OrderIn_Rec/OrderIn_Rec.js
var app = getApp();
var _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ccode:'',
    gys:'',
    DataList:[],
    loadShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    this.setData({
      ccode:options.id,
      gys:options.gys
    })
    this.getData(options.id);

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
  getData:function(id){
    _this.setData({
      loadShow:true
    })
    wx.request({
      url: app.data.serverAddress + 'GetAppData/getOrderOptInfo',
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      data:{
        aid: app.data.appid,
        Factory: app.data.userInfo.Factory,
        Year: app.data.userInfo.Year,
        ccode:id
      },
      success:function(res){
        if(res.data.msg=="OK"){
          
          _this.setData({
            DataList:res.data.data
          });
        }else{

        }
      },
      fail:function(){
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
  }
})