// pages/OrderPur/OrderPur.js
const app = getApp();
var _this;
var OrderConfirmFlg = false;
var OrderCancelFlg = false;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gysCode: '',
    gysCode2: '',
    gysCode3: '',
    Role: '',
    tabs: [],
    BeginDate: '',
    BeginDate2: '',
    BeginDate3: '',
    EndDate: '',
    EndDate2: '',
    EndDate3: '',
    loadShow: false,
    error: '',
    success: '',
    OrderBz: '', //订单取消的备注
    ConfirmCheck: false,
    CancelCheck: false,
    Status: [{
        value: 0,
        text: '全部',
      },
      {
        value: 1,
        text: '待确认',
      },
      {
        value: 2,
        text: '已确认',
      }
    ],
    StIndex: 0,
    activeTab: 0,
    DataList0: [],
    DataList1: [],
    DataList2: [],
    ConfirmList: [],
    CancelList: [],
    Halfshow: false,
    Halfbuttons: [{
        type: 'default',
        className: '',
        text: '辅助操作',
        value: 0
      },
      {
        type: 'primary',
        className: '',
        text: '主操作',
        value: 1
      }
    ]
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
    this.setData({
      gysCode: app.data.userInfo.gysCode,
      gysCode2: app.data.userInfo.gysCode,
      gysCode3: app.data.userInfo.gysCode,
      Role: app.data.userInfo.cRole
    });
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      var list = app.setTabs();
      this.getTabBar().setData({
        selected: 2,
        list: list
      })
    }

    const tabs = [{
      title: '采购单查询'
    }, {
      title: '采购单确认'
    }, {
      title: '采购单取消确认'
    }];
    this.setData({
      tabs
    });
    if (this.data.Role == "GYS") {
      this.data.tabs.pop();
      this.setData({
        tabs: this.data.tabs
      });
    }
    if (app.data.Apptemp.method == 1) {
      this.setData({
        activeTab: 1
      })
      app.data.Apptemp.method = 0;

      this.getData(1);
      return;
    }
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y = date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D1 = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var Count = 0;
    var M2;
    var Y2;
    var D2;
    var DayCount;
    //获得当月有多少天
    switch (date.getMonth() + 1) {
      case 1:
        DayCount = 31;
        break;
      case 3:
        if (Y % 4 == 0) {
          DayCount = 29;
        } else {
          DayCount = 28;
        }
        break;
      case 5:
      case 7:
      case 10:
      case 12:
        DayCount = 30;
        break;
      case 4:
      case 6:
      case 8:
      case 9:
      case 11:
        DayCount = 31;
        break;
    }
    D2 = date.getDate() - 2;
    if (D2 <= 0) {
      if (date.getMonth() + 1 == 1) {
        Y2 = Y - 1;
        M2 = 12;
        D2 = DayCount + D2 < 10 ? '0' + DayCount + D2 : DayCount + D2;
      } else {
        Y2 = Y;
        M2 = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
        D2 = DayCount + D2 < 10 ? '0' + DayCount + D2 : DayCount + D2;
      }
    } else {
      M2 = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth();
      Y2 = Y;
      D2 = D2 < 10 ? '0' + D2 : D2;
    }
    this.setData({
      EndDate: Y + '-' + M + "-" + D1,
      EndDate2: Y + '-' + M + "-" + D1,
      EndDate3: Y + '-' + M + "-" + D1,
      BeginDate: Y2 + '-' + M2 + "-" + D2,
      BeginDate2: Y2 + '-' + M2 + "-" + D2,
      BeginDate3: Y2 + '-' + M2 + "-" + D2,
    });
    this.getData(-1);
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
    if (index == 0) {
      //var i = 0;
    } else if (index == 1) {
      this.getData(1);
    } else {
      //this.getData(2);
    }
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
  bindDateChange3(e) {
    _this.setData({
      BeginDate2: e.detail.value,
    })
  },
  bindDateChange4(e) {
    _this.setData({
      EndDate2: e.detail.value,
    })
  },
  bindDateChange5(e) {
    _this.setData({
      BeginDate3: e.detail.value,
    })
  },
  bindDateChange6(e) {
    _this.setData({
      EndDate3: e.detail.value,
    })
  },
  gysChange2(e) {
    _this.setData({
      gysCode2: e.detail.value,
    })
  },
  gysChange3(e) {
    _this.setData({
      gysCode3: e.detail.value,
    })
  },
  btnSearch() {
    _this.getData(0);
  },
  btnSearch2() {
    _this.getData(1);
  },
  btnSearch3() {
    _this.getData(2);
  },
  getData(TabIndex) {
    //测试数据
    var t1;
    var t2;
    var ccode;
    var Status;
    if (TabIndex == 0 || TabIndex == -1) {
      Status = _this.data.Status[_this.data.StIndex].text;
      t1 = _this.data.BeginDate;
      t2 = _this.data.EndDate;
      ccode = _this.data.gysCode;
    } else if (TabIndex == 1) {
      Status = _this.data.Status[1].text;
      t1 = _this.data.BeginDate3;
      t2 = _this.data.EndDate3;
      ccode = app.data.userInfo.gysCode;
      ccode = _this.data.gysCode2;
    } else {
      Status = _this.data.Status[2].text;
      t1 = _this.data.BeginDate2;
      t2 = _this.data.EndDate2;
      ccode = app.data.userInfo.gysCode;
      ccode = _this.data.gysCode3;
    }
    var UserName = "";
    if (ccode == "" && TabIndex == 0) {
      this.setData({
        error: '请输入供应商编码'
      })
      return;
    }
    _this.setData({
      loadShow: true
    })
    //ccode = "602057";
    wx.request({
      url: app.data.serverAddress + 'GetAppData/getOrderPurInfo',
      dataType: 'json',
      method: 'POST',
      data: {
        aid: app.data.appid,
        Factory: app.data.userInfo.Factory,
        Year: app.data.userInfo.Year,
        BeginData: t1,
        EndData: t2,
        cRole: this.data.Role,
        gysCode: ccode,
        Status: Status,
        UserName: UserName
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        if (res.data.msg == "OK") {
          var res1 = [];
          // var res2 = res.data.data;
          // var res3 = res.data.data;
          // res2.forEach(function(item){
          //   res1.push(item);
          // })
          // res3.forEach(function(item){
          //   res1.push(item);
          // })
          //var newDate=/\d{4}-\d{1,2}-\d{1,2}/g.exec(date)
          res.data.data.forEach(function (item) {
            var temp = item.cDpodate;
            if (item.cDpodate != null && item.cDpodate.length >= 12&&item.cDpodate.indexOf('/')) {
              item.cDpodate = item.cDpodate.substring(0, 8);
            }else if(item.cDpodate != null && item.cDpodate.length >= 13&&item.cDpodate.indexOf('/')){
              item.cDpodate = item.cDpodate.substring(0, 9);
            }
            if (item.QrArriveDate != null && item.QrArriveDate.length >= 12&&item.QrArriveDate.indexOf('/')) {
              item.QrArriveDate = item.QrArriveDate.substring(0, 8);
            }else if(item.QrArriveDate != null && item.QrArriveDate.length >= 13&&item.QrArriveDate.indexOf('/')){
              item.QrArriveDate = item.QrArriveDate.substring(0, 9);
            }
            res1.push(item);
          })
          if (TabIndex == 0) {
            _this.setData({
              DataList0: res1
            });
          } else if (TabIndex == 1) {
            _this.setData({
              DataList1: res1
            });
          } else {
            _this.setData({
              DataList2: res1
            });
          }

        } else {
          if (TabIndex == 0) {
            _this.setData({
              DataList0: [],
            });
          } else if (TabIndex == 1) {
            _this.setData({
              DataList1: [],
            });
          } else {
            _this.setData({
              DataList2: [],
            });
          }
        }
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: "服务器无响应,请联系管理员!",
        });
      },
      complete: function () {
        _this.setData({
          loadShow: false
        })
      }
    })
  },
  checkboxChange1(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    //ConfirmList CancelList
    if (e.detail.value.length == 0) { //从选中到未选中
      _this.data.ConfirmList = _this.data.ConfirmList.filter(function (item) {
        if (item.id == id) {
          return false;
        } else {
          return true;
        }
      });
      _this.setData({
        ConfirmList: _this.data.ConfirmList
      })
    } else { //从未选中到选中
      _this.data.ConfirmList.push({
        id: id
      })
      _this.setData({
        ConfirmList: _this.data.ConfirmList
      })
    }
  },
  checkboxChange2(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    //ConfirmList CancelList
    if (e.detail.value.length == 0) { //从选中到未选中
      _this.data.CancelList = _this.data.CancelList.filter(function (item) {
        if (item.id == id) {
          return false;
        } else {
          return true;
        }
      });
      _this.setData({
        CancelList: _this.data.CancelList
      })
    } else { //从未选中到选中
      _this.data.CancelList.push({
        id: id
      });
      _this.setData({
        CancelList: _this.data.CancelList
      })
    }
  },
  OrderConfirm() {
    if (OrderConfirmFlg) {
      return;
    }
    //^(([0-1]?\d)|(2[0-4])):[0-5]?\d$
    //获取需要确定的订单
    //_this.data.ConfirmList
    var ccode = _this.data.gysCode;
    OrderConfirmFlg = true;
    wx.request({
      url: app.data.serverAddress + 'GetAppData/OrderPurConfirm',
      dataType: 'json',
      method: 'POST',
      data: {
        aid: app.data.appid,
        Factory: app.data.userInfo.Factory, //测试数据 之后要改
        Year: app.data.userInfo.Year, // **
        gysCode: ccode,
        OrderBz: _this.data.OrderBz,
        ConfirmList: JSON.stringify(_this.data.ConfirmList)
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        if (res.data.msg == "OK") {
          _this.setData({
            success: '确认订单成功'
          });
          //将成功确认的订单从界面上移除
          if (app.data.userInfo.cRole == "GYS") {
            app.data.userInfo.dqr = app.data.userInfo.dqr - res.data.data.length;
          }
          if (typeof _this.getTabBar === 'function' && _this.getTabBar()) {
            var list = app.setTabs();
            _this.getTabBar().setData({
              selected: 2,
              list: list
            })
          }

          var dataList = _this.data.DataList1.filter(function (item) {
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i] == item.cId) {
                return false;
              }
            }
            return true;
          })
          _this.setData({
            ConfirmCheck: false,
            DataList1: dataList,
            ConfirmList: []
          });
        } else {
          _this.setData({
            error: '确认订单失败'
          });
        }
      },
      complete: function () {
        OrderConfirmFlg = false;
      }
    })
  },
  OrderCancel() {
    if (OrderCancelFlg) {
      return;
    }
    //获取需要确定的订单
    //_this.data.ConfirmList
    //var ccode = "602057";
    var ccode = app.data.userInfo.gysCode;
    wx.showModal({
      title: '提示',
      content: '确定取消订单吗？',
      success(res) {
        if (res.confirm) {
          OrderCancelFlg = true;
          wx.request({
            url: app.data.serverAddress + 'GetAppData/OrderPurCancel',
            dataType: 'json',
            method: 'POST',
            data: {
              aid: app.data.appid,
              Factory: app.data.userInfo.Factory, //测试数据 之后要改
              Year: app.data.userInfo.Year, // **
              gysCode: ccode,
              ConfirmList: JSON.stringify(_this.data.CancelList)
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' //修改此处即可
            },
            success: function (res) {
              if (res.data.msg == "OK") {
                _this.setData({
                  success: '取消订单成功'
                });
                // app.data.userInfo.dqr = app.data.userInfo.dqr +  res.data.data.length;
                // if (typeof _this.getTabBar === 'function' && _this.getTabBar()) {
                //   var list = app.setTabs();
                //     _this.getTabBar().setData({
                //       selected: 2,
                //       list:list
                //     })
                // }

                //将成功确认的订单从界面上移除
                var dataList = _this.data.DataList2.filter(function (item) {
                  for (var i = 0; i < res.data.data.length; i++) {
                    if (res.data.data[i] == item.cId) {
                      return false;
                    }
                  }
                  return true;
                })
                _this.setData({
                  CancelCheck: false,
                  DataList2: dataList,
                  CancelList: []
                });
              } else {
                _this.setData({
                  error: '取消订单失败'
                });
              }
            },
            complete: function () {
              OrderCancelFlg = false;
            }
          })
        }
      }
    })
  },
  Confirm_Det(e) {
    //OrderPurConfirmDet
    //e.currentTarget.dataset.list
    // wx.navigateTo({
    //   url: '../OrderIn_Rec/OrderIn_Rec?id='+id+'&gys='+gys,
    // })
    var dataSet = e.currentTarget.dataset.list;
    var cCpoid = dataSet.cCpoid;
    var bz = dataSet.bz;
    var cInvname = dataSet.cInvname;
    var cIquantity = dataSet.cIquantity;
    var QrIquantity = dataSet.QrIquantity;
    var cDpodate = dataSet.cDpodate;
    var cDArriveDate = dataSet.cDArriveDate;
    var QrArriveDate = dataSet.QrArriveDate;
    var cId = dataSet.cId;
    wx.navigateTo({
      url: '../OrderPurConfirmDet/OrderPurConfirmDet?cId=' + cId + "&cCpoid=" + cCpoid + "&cInvname=" + cInvname + "&cIquantity=" + cIquantity + "&QrIquantity=" + QrIquantity + "&cDpodate=" + cDpodate + "&cDArriveDate=" + cDArriveDate + "&QrArriveDate=" + QrArriveDate + "&bz=" + bz,
    })
  },
  ConfirmAll(e) {
    //
    if (e.detail.value.length == 0) { //全部取消
      _this.setData({
        ConfirmCheck: false
      })
      _this.setData({
        ConfirmList: []
      })
      //ConfirmList
    } else { //全选
      _this.setData({
        ConfirmCheck: true
      })
      //ConfirmList
      /*
      _this.data.ConfirmList.push({id:id})
      _this.setData({
        ConfirmList:_this.data.ConfirmList
      })
      */
      _this.data.DataList1.forEach(function (item) {
        _this.data.ConfirmList.push({
          id: item.cId
        });
      })
      _this.setData({
        ConfirmList: _this.data.ConfirmList
      })
    }
  },
  CancelAll(e) {
    if (e.detail.value.length == 0) {
      _this.setData({
        CancelCheck: false
      })
      _this.setData({
        CancelList: []
      })
    } else {
      _this.setData({
        CancelCheck: true
      })
      _this.data.DataList2.forEach(function (item) {
        _this.data.CancelList.push({
          id: item.cId
        });
      })
      _this.setData({
        CancelList: _this.data.CancelList
      })
    }
  },
  CodeChange(e) {
    this.data.gysCode = e.detail.value;
  },
  CodeChange2(e) {
    this.data.gysCode2 = e.detail.value;
  },
  CodeChange3(e) {
    this.data.gysCode3 = e.detail.value;
  },
  Input_OrderBz(e) {
    this.data.OrderBz = e.detail.value;
  },
  HalfButton_Cancel() {
    _this.setData({
      Halfshow: false
    })
  },
  HalfButton_Confirm() {
    this.OrderConfirm();
    _this.setData({
      Halfshow: false
    })
  },
  Half_Show() {
    _this.setData({
      Halfshow: true
    })
  }
})