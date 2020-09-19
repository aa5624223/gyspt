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
    public class CertifyController : Controller
    {
        // GET: Certify
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// 登录验证 返回用户的unionid
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpPost]
        public string getopenid()
        {
            string appid = this.Request.Form["appid"];
            string code = this.Request.Form["code"];
            //GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
            JObject msg = new JObject();
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                string secret = System.Configuration.ConfigurationManager.AppSettings["secret"];
                string QQurl = string.Format("https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code", appid, secret, code);
                string result = Lw_Utils.HttpGet(QQurl);
                JObject data = (JObject)JsonConvert.DeserializeObject(result);
                msg.Add("msg", "OK");
                msg.Add("data", data);
            }
            return msg.ToString();
        }
        /// <summary>
        /// 1.若登录已经绑定账号 直接登录
        /// 2.若未绑定账号 获取登录页面的数据
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string getLoginData() {
            JObject msg = new JObject();
            string appid = this.Request.Form["appid"];
            string openid = this.Request.Form["openid"];
            if (!Lw_Utils.WeChartCertify(appid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                //1.尝试登录
                //JArray UInfo = (JArray)JsonConvert.DeserializeObject(client.GetUinfo(Factory, Year, userName, null, null, password));
                //if (UInfo.LongCount()!=0) {
                //    //1.将登录信息返回和页面
                //    JObject jo = (JObject)UInfo.First();
                //    msg.Add("msg", "LOGIN");
                //    jo.Add("openid", openid);
                //    msg.Add("data", jo);
                //}
                //else
                //{
                    //2.获取登录页面的数据
                    JArray ztJson = (JArray)JsonConvert.DeserializeObject(client.Ddl_Zt());
                    msg.Add("msg","NOLOGIN");
                    msg.Add("zt", ztJson);
                //}
            }
            return msg.ToString();
        }
        /// <summary>
        /// 登录
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string login() {
            JObject msg = new JObject();
            string userName = this.Request.Form["userName"];
            string password = this.Request.Form["password"];
            string appid = this.Request.Form["aid"];
            string Factory = this.Request.Form["Factory"];
            string Year = this.Request.Form["Year"];
            string openid = this.Request.Form["openid"];
            if (!Lw_Utils.WeChartCertify(appid) || string.IsNullOrEmpty(openid))
            {
                msg.Add("msg", "APPIDERROR");
            }
            else
            {
                WebReference.WebService1 client = Lw_Utils.getServiceMethod();
                JArray UInfo = (JArray)JsonConvert.DeserializeObject(client.GetUinfo(Factory,Year,userName,null,null,password));
                if (UInfo.LongCount()==0) {//账号密码错误
                    msg.Add("msg","NOTFOUNT");
                }
                else
                {
                    JObject jo = (JObject)UInfo.First();
                    //string cRole = jo["cRole"].ToString();
                    //string cUserName = jo["cUserName"].ToString();
                    //string gysCode = jo["gysCode"].ToString();
                    //string dqr = jo["dqr"].ToString();
                    //string dkp = jo["dkp"].ToString();
                    //绑定账号和微信
                    bool flg = client.UpdateWxh(userName, openid,"");
                    msg.Add("msg", "OK");
                    jo.Add("openid",openid);
                    jo.Add("Factory",Factory);
                    jo.Add("Year",Year);
                    jo.Add("UserName",userName);
                    msg.Add("data", jo);

                }
            }
            return msg.ToString();
        }
    }
}