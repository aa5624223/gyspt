// pages/Test/Test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '提示',
      content: '打开文档测试',
      success (res) {
        console.log('打开测试');
        wx.showModal({
          title: '提示',
          content: '下载前',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        wx.downloadFile({
          url: 'http://srmfn.changfanz.net:807/upload/200924812187.xls',
          success:function(res){
            const filePath = res.tempFilePath;
            wx.openDocument({
              filePath: filePath,
              success: function (res) {
                console.log('打开文档成功')
                wx.showModal({
                  title: '提示',
                  content: '打开文档成功',
                  success (res) {
                    console.log('打开文档成功')
                  }
                })
              
              },
              fail:function(error){
                wx.showModal({
                  title: '提示',
                  content: '打开文档成功',
                  success (res) {
                    console.log('打开文档失败111111,'+error.errMsg)
                  }
                })
              }
            })
          },
          fail:function(error){
            wx.showModal({
              title: '提示',
              content: '下载失败'+error.errMsg,
              success (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                }
              }
            })
          }
        })
      }
    })
    //http://srmfn.changfanz.net:807/upload/200924812187.xls
    
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