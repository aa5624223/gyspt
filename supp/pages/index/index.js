// pages/index/index.js
const app = getApp();
var _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    loadShow:true,
    activeTab: 0,
    NewsList1:[],
    NewsLiST2:[],
    NewsLiST3:[],
    NewsLiST4:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    const tabs = [{
      title:'公共信息'
    },{
      title:'私有信息'
    },{
      title:'月度冻结计划'
    },{
      title:'月度锁定计划'
    }];
    this.setData({ tabs });
    this.getInfo();
    
  },
  fileTest:function(){
    wx.downloadFile({
      //url: 'https://api.changfa.net/CFFNSupply_Webservice/1.xls', //仅为示例，并非真实的资源
      url:'https://srmfn.changfanz.net:808/upload/200924812187.xls',
      success (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        console.log("打开成功");
        const filePath = res.tempFilePath;
        wx.openDocument({
          filePath: filePath,
          success: function (res) { 技能
            console.log('打开文档成功')
          }
        })
      },
      fail:function(res){
        console.log(res);
      }
    });
    // wx.downloadFile({
    //   //url: app.data.downloadAdd+url,
    //   url: app.data.downloadAdd+'/upload/200924812187.xls',
    //   header:{},
    //   success:function(res){
        // const filePath = res.tempFilePath;
        // wx.openDocument({
        //   filePath: filePath,
        //   success: function (res) {
        //     console.log('打开文档成功')
        //   }
        // })
    //   },fail:function(res){
    //     console.log(res);
    //   }

    // })
    
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
          selected: 0,
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
  onTabClick(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },
  onChange(e) {
    const index = e.detail.index
    this.setData({ 
      activeTab: index 
    })
  },
  //获得数据信息
  getInfo(){
    //工厂，年度，用户，权限
    //app.data.userInfo.Factory;
    //app.data.userInfo.Year;
    //app.data.
    wx.request({
      url:app.data.serverAddress + 'GetAppData/getInfo',
      dataType: 'json',
      method: 'POST',
      data:{
        aid:app.data.appid,
        Factory:app.data.userInfo.Factory,
        UserName:app.data.userInfo.cUserName,
        Year:app.data.userInfo.Year,
        cRole:app.data.userInfo.cRole,
        gysCode:app.data.userInfo.gysCode,
        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success:function(res){
        if(res.data.msg=="OK"){
          //NewsList1 NewsList2 NewsList3 NewsList4
          _this.setData({
            NewsList1:res.data.News1,
            NewsList2:res.data.News2,
            NewsList3:res.data.News3,
            NewsList4:res.data.News4,
            loadShow:false
          })
        }else if(res.data.msg=="NOTFOUNT"){
          //没有找到信息
          _this.setData({
            loadShow:false
          })
        }
      }
    })
  },
  //转向消息页面
  NewsDetil(e){
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    app.data.NewsId = id;
    app.data.NewsTitle = title;
    wx.navigateTo({
      url: '../NewsDet/NewsDet?id='+id,
    })
  }
})