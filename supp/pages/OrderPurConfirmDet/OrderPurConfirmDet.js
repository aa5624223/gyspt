// pages/OrderPurConfirmDet/OrderPurConfirmDet.js
const app = getApp();
var _this;
var btn_UpdataFlg = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QrArriveDate:'',
    qrsl:0,
    bz:'',
    dataSet:{},
    errormsg:"",
    successmsg:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    if(options.QrIquantity==""){
      options.QrIquantity=options.cIquantity;

    }
    if(options.QrArriveDate==""){
      options.QrArriveDate = options.cDArriveDate;
    }
    var dataSet ={
      cId:options.cId,
      cCpoid:options.cCpoid,
      cInvname:options.cInvname,
      cIquantity:options.cIquantity,
      cDpodate:options.cDpodate,
      cDArriveDate:options.cDArriveDate,
    };
    this.setData({
      dataSet:dataSet,
      QrArriveDate:options.QrArriveDate,
      qrsl:options.QrIquantity,
      bz:options.bz
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
  btn_Updata:function(){
    if(btn_UpdataFlg){
      return;
    }
    var cId = _this.data.dataSet.cId;
    //_this.data.qrsl
    //_this.data.QrArriveDate
    //_this.data.bz
    btn_UpdataFlg = true;
    wx.request({
      url: app.data.serverAddress + 'GetAppData/OrderPur_updata',
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      data:{
        aid: app.data.appid,
        id:cId,
        qrsl:_this.data.qrsl,
        QrArriveDate: _this.data.QrArriveDate,
        bz:_this.data.bz,
      },
      success:function(res){
        if(res.data.msg=="OK"){
          //successmsg
          _this.setData({
            successmsg:'修改成功,即将返回采购单页面'
          })
          setTimeout(() => {
            app.data.Apptemp.method = 1;
            wx.switchTab({
              url: '../OrderPur/OrderPur',
            })
          }, 2000);
        }else{
          //errormsg
          _this.setData({
            successmsg:'修改失败'
          })
        }
      },
      error:function(){
        _this.setData({
          successmsg:'网络错误'
        })
      },
      complete:function(){
        btn_UpdataFlg = false;
      }
    })
  },
  qrslChange:function(e){
    _this.setData({
      qrsl: e.detail.value,
    })
  },
  bindDateChange1(e){
    _this.setData({
      QrArriveDate: e.detail.value,
    })
  },
  bzChange:function(e){
    _this.setData({
      bz: e.detail.value,
    })
  },
  
})