using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using supp_in.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace supp_in.Controllers
{
    public class GetAppDataController : Controller
    {
        // GET: GetAppData
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 获取共有信息、私有信息、月度冻结计划、月度锁定计划
        /// </summary>
        /// <returns></returns>
        public string getInfo()
        {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            string Factory = this.Request.Form["Factory"].Trim();
            string UserName = this.Request.Form["UserName"];
            string Year = this.Request.Form["Year"].Trim();
            string cRole = this.Request.Form["cRole"];

            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray News;
                //3.供应商代码 4.gys 其他""
                if (cRole == "GYS")
                {
                    News = (JArray)JsonConvert.DeserializeObject(client.GetNewsList("001", "2020", UserName, "GYS"));
                }
                else
                {
                    News = (JArray)JsonConvert.DeserializeObject(client.GetNewsList("001", "2020", "", ""));
                }
                if (News.LongCount() == 0)
                {
                    msg.Add("data", new JArray());
                    msg.Add("msg", "NOTFOUNT");
                }
                else
                {
                    JArray News1 = new JArray();
                    JArray News2 = new JArray();
                    JArray News3 = new JArray();
                    JArray News4 = new JArray();
                    //将数据重组
                    foreach (JToken jt in News)
                    {
                        JObject item = (JObject)jt;
                        int Newstype = (int)item["TypeId"];
                        switch (Newstype)
                        {
                            case 1:
                                News1.Add(item);
                                break;
                            case 2:
                                News2.Add(item);
                                break;
                            case 3:
                                News3.Add(item);
                                break;
                            case 4:
                                News4.Add(item);
                                break;
                        }
                    }
                    msg.Add("News1", News1);
                    msg.Add("News2", News2);
                    msg.Add("News3", News3);
                    msg.Add("News4", News4);
                    msg.Add("msg", "OK");
                }
            }
            return msg.ToString();
        }
        /// <summary>
        ///  获得信息详细
        /// </summary>
        /// <returns></returns>
        public string getNewsDetailInfo()
        {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            string id = this.Request.Form["id"];
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray NewsDetail;
                NewsDetail = (JArray)JsonConvert.DeserializeObject(client.GetNewsDetail(id));
                if (NewsDetail.LongCount() == 0)
                {
                    msg.Add("data", new JArray());
                    msg.Add("msg", "NOTFOUNT");
                }
                else
                {
                    foreach (JToken jt in NewsDetail) {
                        JObject item = (JObject)jt;
                        string hasfile = (string)item["FileLoad"];
                        if (hasfile=="1") {
                            JArray FileList = (JArray)JsonConvert.DeserializeObject(client.GetFiles((string)item["id"]));
                            item.Add("FileList", FileList);
                        }
                        else
                        {
                            item.Add("FileList",new JArray());
                        }
                        JArray ja = new JArray();
                        ja.Add(item);
                        msg.Add("data", NewsDetail);
                        msg.Add("msg", "OK");
                    }
                }
                
            }
            return msg.ToString();
        }
        /// <summary>
        /// 获得入库单的状态
        /// </summary>
        /// <returns></returns>
        public string getOrderStatus() {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray StatusList = new JArray();
                //string str = ;
                StatusList = (JArray)JsonConvert.DeserializeObject(client.Rdstatus());
                msg.Add("data", StatusList);
                msg.Add("msg", "OK");
            }
            return msg.ToString();
        }

        /// <summary>
        /// 获得入库单的信息
        /// </summary>
        /// <returns></returns>
        public string getOrderInInfo()
        {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            string Factory = this.Request.Form["Factory"].Trim();
            string Year = this.Request.Form["Year"].Trim();
            string BeginData = this.Request.Form["BeginData"].Trim();
            string EndData = this.Request.Form["EndData"].Trim();
            string cRole = this.Request.Form["cRole"].Trim();
            string gysCode = this.Request.Form["gysCode"].Trim();
            string Status = this.Request.Form["Status"].Trim();
            string UserName = this.Request.Form["UserName"].Trim();
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray OrderInList;

                if (cRole== "ZCB") {
                    //OrderInList = (JArray)JsonConvert.DeserializeObject(client.GetRDlist(Factory, Year, BeginData, EndData, gysCode, UserName, Status));
                    OrderInList = (JArray)JsonConvert.DeserializeObject(client.GetRDlist2(Factory, Year, BeginData, EndData, gysCode, UserName, Status));

                }
                else
                {
                    //gysCode = "S" + gysCode;
                    //OrderInList = (JArray)JsonConvert.DeserializeObject(client.GetRDlist(Factory, Year, BeginData, EndData, gysCode, "", Status));
                    OrderInList = (JArray)JsonConvert.DeserializeObject(client.GetRDlist2(Factory, Year, BeginData, EndData, gysCode, "", Status));
                    //client.GetRDlist2(Factory,Year,BeginData,EndData,"", Status);
                }
                if (OrderInList.LongCount() == 0)
                {
                    msg.Add("data", new JArray());
                    msg.Add("msg", "NOTFOUNT");
                }
                else
                {
                    msg.Add("data", OrderInList);
                    msg.Add("msg", "OK");
                }
                
            }
            return msg.ToString();
        }

        /// <summary>
        /// 获得入库单操作记录
        /// </summary>
        /// <returns></returns>
        public string getOrderOptInfo()
        {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            string id = this.Request.Form["id"];
            string Factory = this.Request.Form["Factory"].Trim();
            string Year = this.Request.Form["Year"].Trim();
            string ccode = this.Request.Form["ccode"].Trim();
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray OrderOptList;
                OrderOptList = (JArray)JsonConvert.DeserializeObject(client.GetRkdEvent(Factory, Year, ccode));
                if (OrderOptList.LongCount() == 0)
                {
                    msg.Add("data", new JArray());
                    msg.Add("msg", "NOTFOUNT");
                }
                else
                {
                    msg.Add("data", OrderOptList);
                    msg.Add("msg", "OK");
                }
            }
            return msg.ToString();
        }

        /// <summary>
        /// 获得入库单操明细
        /// </summary>
        /// <returns></returns>
        public string getOrderDetInfo()
        {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            string id = this.Request.Form["id"];
            string Factory = this.Request.Form["Factory"].Trim();
            string Year = this.Request.Form["Year"].Trim();
            string ccode = this.Request.Form["ccode"].Trim();
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray OrderDetList;
                OrderDetList = (JArray)JsonConvert.DeserializeObject(client.GetRdDetails(Factory, Year, ccode));
                if (OrderDetList.LongCount() == 0)
                {
                    msg.Add("data", new JArray());
                    msg.Add("msg", "NOTFOUNT");
                }
                else
                {
                    msg.Add("data", OrderDetList);
                    msg.Add("msg", "OK");
                }
            }
            return msg.ToString();
        }

        /// <summary>
        /// 获得采购单表
        /// </summary>
        /// <returns></returns>
        public string getOrderPurInfo()
        {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            string Factory = this.Request.Form["Factory"].Trim();
            string Year = this.Request.Form["Year"].Trim();
            string BeginData = this.Request.Form["BeginData"].Trim();
            string EndData = this.Request.Form["EndData"].Trim();
            string gysCode = this.Request.Form["gysCode"].Trim();
            string cRole = this.Request.Form["cRole"].Trim();
            string Status = this.Request.Form["Status"].Trim();
            string UserName = this.Request.Form["UserName"].Trim();
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray OrderPurList;
                if (cRole == "ZCB")
                {
                    OrderPurList = (JArray)JsonConvert.DeserializeObject(client.GetPoList(Factory, Year, BeginData, EndData, gysCode, UserName, Status));
                }
                else
                {
                    OrderPurList = (JArray)JsonConvert.DeserializeObject(client.GetPoList(Factory, Year, BeginData, EndData, gysCode, "", Status));
                }
                if (OrderPurList.LongCount() == 0)
                {
                    msg.Add("data", new JArray());
                    msg.Add("msg", "NOTFOUNT");
                }
                else
                {
                    msg.Add("data", OrderPurList);
                    msg.Add("msg", "OK");
                }
            }
            return msg.ToString();
        }
        /// <summary>
        /// 采购订单确认
        /// </summary>
        /// <returns></returns>
        public string OrderPurConfirm() {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            string Factory = this.Request.Form["Factory"].Trim();
            string Year = this.Request.Form["Year"].Trim();
            string ccode = this.Request.Form["gysCode"].Trim();
            string ListStr = this.Request.Form["ConfirmList"];
            string OrderBz = this.Request.Form["OrderBz"];
            JArray ja = (JArray)JsonConvert.DeserializeObject(ListStr);
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                //做订单的提交
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray ConfirmList = new JArray();//用于存储成功提交的队列
                List<string> ids = new List<string>();
                foreach (JToken jt in ja)
                {
                    JObject item = (JObject)jt;
                    string id = item["id"].ToString();
                    ids.Add(id);
                    ConfirmList.Add(id);
                }
                if (client.PoQr(string.Join(",", ids.ToArray()), OrderBz, Factory, Year, ccode))
                {
                    msg.Add("data", ConfirmList);
                    msg.Add("msg", "OK");
                    
                }
                else
                {
                    msg.Add("data", "");
                    msg.Add("msg", "ERROR");
                }
                
            }
            return msg.ToString();
        }
        /// <summary>
        /// 采购订单取消
        /// </summary>
        /// <returns></returns>
        public string OrderPurCancel()
        {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            string Factory = this.Request.Form["Factory"].Trim();
            string Year = this.Request.Form["Year"].Trim();
            string ccode = this.Request.Form["gysCode"].Trim();
            string ListStr = this.Request.Form["ConfirmList"];
            JArray ja = (JArray)JsonConvert.DeserializeObject(ListStr);
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                //做订单的提交
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray ConfirmList = new JArray();//用于存储成功提交的队列
                List<string> ids = new List<string>();
                foreach (JToken jt in ja)
                {
                    JObject item = (JObject)jt;
                    string id = item["id"].ToString();
                    ids.Add(id);
                    ConfirmList.Add(id);
                }
                if (client.PoQr_qx(string.Join(",", ids.ToArray()), Factory, Year, ccode))
                {
                    msg.Add("data", ConfirmList);
                    msg.Add("msg", "OK");
                }
                else
                {
                    msg.Add("data", "");
                    msg.Add("msg", "ERROR");
                }
                
            }
            return msg.ToString();
        }
        /// <summary>
        /// 采购单修改
        /// </summary>
        /// <returns></returns>
        public string OrderPur_updata() {
            JObject msg = new JObject();
            string appid = this.Request.Form["aid"];
            string id = this.Request.Form["id"].Trim();
            string qrsl = this.Request.Form["qrsl"].Trim();
            string QrArriveDate = this.Request.Form["QrArriveDate"].Trim();
            string bz = this.Request.Form["bz"];
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                if (client.PoQrDetail(id, bz, QrArriveDate, qrsl))
                {
                    msg.Add("msg","OK");
                }
                else
                {
                    msg.Add("msg", "ERROR");
                }
            }
            return msg.ToString();
        }
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <returns></returns>
        public string passwordChange() {
            JObject msg = new JObject();
            //UpdatePwd
            string appid = this.Request.Form["aid"];
            string UserName = this.Request.Form["UserName"];
            string password1 = this.Request.Form["password1"];
            string password2 = this.Request.Form["password2"];
            string Factory = this.Request.Form["Factory"].Trim();
            string Year = this.Request.Form["Year"].Trim();
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray UInfo = (JArray)JsonConvert.DeserializeObject(client.GetUinfo(Factory, Year, UserName, null, null, password1));
                if (UInfo.LongCount() == 0)
                {//账号密码错误
                    msg.Add("msg", "NOTFOUNT");
                }
                else
                {
                    bool flg = client.UpdatePwd(UserName, password2);
                    if(flg==true){
                        msg.Add("msg", "OK");
                    }
                    else
                    {
                        msg.Add("msg", "NOTFOUNT");
                    }
                }
            }
            return msg.ToString();
        }
    }
}