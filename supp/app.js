//app.js
var _this;
App({
  data:{
    appid:"wx4e3ff8381587f119",
    userInfo:{
      openid:''
    },
    //serverAddress: 'https://localhost:44316/',
    //https://srmfn.changfanz.net:808/
    serverAddress: "https://api.changfa.net/CFFNSupply_Webservice/",
    downloadAdd:'https://srmfn.changfanz.net:808',
    //app.data.Apptemp.method==1 表示是页面的返回，判断后 设置为0
    Apptemp:{}//用于存放传递的信息
  },
  onLaunch: function () {
    _this = this;
    var openid = wx.getStorageSync("openid");
    if (openid!=""){
      _this.data.userInfo.openid = openid;
    }else{
      wx.login({
        success(res) {
          if (res.code) {
            //openid
            wx.request({
              url: _this.data.serverAddress + 'Certify/getopenid',
              dataType: 'json',
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                code: res.code,
                appid: _this.data.appid
              },
              success: function (res2) {
                if (res2.data.data.openid) {
                  _this.data.userInfo.openid = res2.data.data.openid;
                  wx.setStorageSync('openid', res2.data.data.openid);
                }
              },
              fail: function (error) {
                //未获取到用户信息
              }
            })
          }
        }
      })
      
    }
  },
  globalData: {
    userInfo: null
  },
  setTabs(){
    var list = [{
      pagePath: "index",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: "首页"
    }, {
      pagePath: "OrderIn",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "入库单",
      badge: _this.data.userInfo.dkp
    }, {
      pagePath: "OrderPur",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "采购单",
      badge: _this.data.userInfo.dqr
    }, {
      pagePath: "userInfo",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "个人信息"
    }];
    return list;
  }
})