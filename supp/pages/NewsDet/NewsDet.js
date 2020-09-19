// pages/OrderInOpt/OrderInOpt.js
const app = getApp();
var _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    loadShow:true,
    NewsDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    
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
    var id = app.data.NewsId;
    this.setData({
      title:app.data.NewsTitle
    })
    this.getInfo(id);
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
  backtoIndex(id){
    wx.switchTab({
      url:"../index/index",
    })
  },
  getInfo(id){
    wx.request({
      url:app.data.serverAddress + 'GetAppData/getNewsDetailInfo',
      dataType: 'json',
      method: 'POST',
      data:{
        id:id,
        aid:app.data.appid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success:function(res){
        if(res.data.msg == "OK"){
          _this.setData({
            NewsDetail:res.data.data[0],
            loadShow:false
          });
        }
      },
      fail:function(){
        _this.setData({
          NewsDetail:[],
          loadShow:true
        });
      }
    })
  },
  filedownLoad(e){
    var url = e.currentTarget.dataset.url;
    //app.data.downloadAdd+url
    wx.downloadFile({
      url: app.data.downloadAdd+url,
      //url: app.data.downloadAdd+'/upload/200924812187.xls',
      success:function(res){
        const filePath = res.tempFilePath;
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
    })
  }
})