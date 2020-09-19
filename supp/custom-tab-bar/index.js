const app = getApp();
Component({
  data: {
    index:0,
    index1:0,
    mui: 0,
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: []
  },
  attached() {
    // var list = [{
    //   pagePath: "index",
    //   iconPath: "/image/icon_component.png",
    //   selectedIconPath: "/image/icon_component_HL.png",
    //   text: "首页"
    // }, {
    //   pagePath: "OrderIn",
    //   iconPath: "/image/icon_API.png",
    //   selectedIconPath: "/image/icon_API_HL.png",
    //   text: "入库单",
    //   badge: app.data.userInfo.dkp
    // }, {
    //   pagePath: "OrderPur",
    //   iconPath: "/image/icon_API.png",
    //   selectedIconPath: "/image/icon_API_HL.png",
    //   text: "采购单",
    //   badge: app.data.userInfo.dqr
    // }, {
    //   pagePath: "userInfo",
    //   iconPath: "/image/icon_API.png",
    //   selectedIconPath: "/image/icon_API_HL.png",
    //   text: "个人信息"
    // }];
    // this.setData({
    //   list:list
    // })
  }, 
  ready(){
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      var url = data.path;
      url = "../" + url + "/" + url;
      wx.switchTab({
        url
      });
      var mui = this.data.mui++;
      this.setData({
        selected: data.index
      })
      this.setData({
        mui: mui
      });
    }
  }
})