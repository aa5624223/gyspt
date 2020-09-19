using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.IO;

namespace supp_in.Util
{
    public class Lw_Utils
    {
        #region 验证相关

        /// <summary>
        ///  验证微信小程序的appid
        ///  req 里面必须有 post提交的aid
        ///  使用前要在web.xml配置
        /// appSettings
        ///   add key = "appid" value="wxc73b6246871bc36c"
        /// appSettings
        /// </summary>
        /// <param name="appid"></param>
        /// <param name="req"></param>
        /// <returns></returns>
        public static bool WeChartCertify(string appid2)
        {
            //没有权限的
            //string appid = System.Configuration.ConfigurationManager.AppSettings["appid"];
            string appid = System.Configuration.ConfigurationManager.AppSettings["appid"];
            if (string.IsNullOrEmpty(appid2) || appid != appid2)
            {
                return false;
            }
            else if (appid.Equals(appid2))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        #endregion

        #region 地图相关
        private const double EARTH_RADIUS = 6378.137;//地球半径
        /// <summary>
        /// 计算整个路 每个路段的距离
        /// 单位 米
        /// </summary>
        /// <param name="paths"></param>
        /// <returns></returns>
        //public static double GetDistance(List<List<Locate>> paths)
        //{
        //    /**
        //     * double radLat1 = rad(lat1);
        //     * double radLat2 = rad(lat2);
        //     * double a = radLat1 - radLat2;
        //     * double b = rad(lng1) - rad(lng2);
        //     * double s = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) +
        //     * Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2)));
        //     * s = s * EARTH_RADIUS;
        //     * s = Math.Round(s * 10000) / 10000;
        //     * double c = 0.0;
        //     */
        //    //路径
        //    double disCount = 0;
        //    for (var i=0;i<paths.Count;i++) {
        //        if (paths[i].Count==1) {
        //            continue;
        //        }
        //        double dis = 0;
        //        for (var j=0;j<paths[i].Count-1;j++) {
        //            double radLat1 = rad((double)paths[i][j].lat);
        //            double radLat2 = rad((double)paths[i][j+1].lat);
        //            double radlng1 = rad((double)paths[i][j].lng);
        //            double radlng2 = rad((double)paths[i][j+1].lng);
        //            double a = radLat1 - radLat2;
        //            double b = radlng1 - radlng2;
        //            double c = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) +
        //            Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2)));
        //            c = c * EARTH_RADIUS;
        //            c = Math.Round(c * 10000) / 10000;
        //            dis += c;
        //        }
        //        disCount += dis;
        //        dis = 0;
        //    }
        //    return disCount*1000;
        //}
        ///// <summary>
        ///// 获取一段路的距离
        ///// 单位 米
        ///// </summary>
        ///// <param name="path"></param>
        ///// <returns></returns>
        //public static double GetDistance(List<Locate> path)
        //{
        //    /**
        //     * double radLat1 = rad(lat1);
        //     * double radLat2 = rad(lat2);
        //     * double a = radLat1 - radLat2;
        //     * double b = rad(lng1) - rad(lng2);
        //     * double s = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) +
        //     * Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2)));
        //     * s = s * EARTH_RADIUS;
        //     * s = Math.Round(s * 10000) / 10000;
        //     * double c = 0.0;
        //     */
        //    //路径
        //    double disCount = 0;
        //    if (path.Count<=1 ) {
        //        return 0;
        //    }
        //    for (var i = 0; i < path.Count-1; i++)
        //    {
        //        double radLat1 = rad((double)path[i].lat);
        //        double radLat2 = rad((double)path[i+1].lat);
        //        double radlng1 = rad((double)path[i].lng);
        //        double radlng2 = rad((double)path[i+1].lng);
        //        double a = radLat1 - radLat2;
        //        double b = radlng1 - radlng2;
        //        double c = 2 * Math.Asin(Math.Sqrt(Math.Pow(Math.Sin(a / 2), 2) +
        //        Math.Cos(radLat1) * Math.Cos(radLat2) * Math.Pow(Math.Sin(b / 2), 2)));
        //        c = c * EARTH_RADIUS;
        //        c = Math.Round(c * 10000) / 10000;
        //        disCount += c;
        //    }
        //    return disCount*1000;
        //}
        //private static double rad(double d)
        //{
        //    return d * Math.PI / 180.0;
        //}

        #endregion

        #region 加密解密相关

        /// <summary> 
        /// 加密数据 
        /// </summary> 
        /// <param name="Text"></param> 
        /// <param name="sKey">加密Key</param> 
        /// <returns></returns> 
        public static string Encrypt(string Text, string sKey)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] inputByteArray;
            inputByteArray = Encoding.Default.GetBytes(Text);
            des.Key = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
            des.IV = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            StringBuilder ret = new StringBuilder();
            foreach (byte b in ms.ToArray())
            {
                ret.AppendFormat("{0:X2}", b);
            }
            return ret.ToString();
        }

        /// <summary> 
        /// 解密数据 
        /// </summary> 
        /// <param name="Text"></param> 
        /// <param name="sKey"></param> 
        /// <returns></returns> 
        public static string Decrypt(string Text, string sKey)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            int len;
            len = Text.Length / 2;
            byte[] inputByteArray = new byte[len];
            int x, i;
            for (x = 0; x < len; x++)
            {
                i = Convert.ToInt32(Text.Substring(x * 2, 2), 16);
                inputByteArray[x] = (byte)i;
            }
            des.Key = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
            des.IV = ASCIIEncoding.ASCII.GetBytes(System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(sKey, "md5").Substring(0, 8));
            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            CryptoStream cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);
            cs.Write(inputByteArray, 0, inputByteArray.Length);
            cs.FlushFinalBlock();
            return Encoding.Default.GetString(ms.ToArray());
        }

        #endregion

        #region 时间相关

        #region  创建时间戳
        public static long CreatenTimestamp()
        {
            Random ra = new Random(1000000000);
            int r = ra.Next();
            return (DateTime.Now.ToUniversalTime().Ticks / 10000) + r;
        }

        #endregion
        #endregion

        #region 文件相关
        /// <summary>
        /// 通过文件名 获取文件的后缀
        /// 没有后缀的返回null
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public static string GetFileSuf(string fileName)
        {
            if (fileName.IndexOf(".") >= 0)
            {
                int SufIndex = fileName.LastIndexOf(".");
                string NameSuf = fileName.Substring(SufIndex);
                return NameSuf;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 读取Json文件
        /// 必须是.json文件！
        /// </summary>
        /// <returns></returns>
        public static JObject GetJsonFileToJson(string FilePath)
        {
            System.IO.StreamReader file = System.IO.File.OpenText(FilePath);
            JsonTextReader reader = null;
            JObject jo = null;
            try
            {
                reader = new JsonTextReader(file);
                jo = (JObject)JToken.ReadFrom(reader);
            }
            catch (Exception _e)
            {

                reader.Close();
                throw;
            }
            finally
            {
                if (file != null)
                {
                    file.Close();
                }
            }
            return jo;
        }
        /// <summary>
        /// 读取Json文件
        /// 必须是.json文件！
        /// </summary>
        /// <returns></returns>
        public static JArray GetJsonFileToJArray(string FilePath)
        {
            System.IO.StreamReader file = System.IO.File.OpenText(FilePath);
            JsonTextReader reader = null;
            JArray ja = null;
            try
            {
                reader = new JsonTextReader(file);
                ja = (JArray)JToken.ReadFrom(reader);
            }
            catch (Exception _e)
            {

                reader.Close();
                throw;
            }
            finally
            {
                if (file != null)
                {
                    file.Close();
                }
            }
            return ja;
        }

        #endregion

        #region JSON 相关
        /// <summary>
        /// 对象转为Json str
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string ObjectToJsonStr(Object obj)
        {
            if (obj == null)
            {
                return null;
            }
            else
            {
                return JsonConvert.SerializeObject(obj);
            }
        }
        /// <summary>
        /// 对象转为json 必须传入的是单个实体类
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static JObject ObjectToJson(Object obj)
        {
            if (obj == null)
            {
                return (JObject)JsonConvert.DeserializeObject("{}");
            }
            else
            {
                return (JObject)JsonConvert.DeserializeObject(Lw_Utils.ObjectToJsonStr(obj));
            }
        }
        /// <summary>
        /// 数组对象转为JArray
        /// </summary>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static JArray ObjectToJArray(Object obj)
        {
            if (obj == null)
            {
                return (JArray)JsonConvert.DeserializeObject("[]");
            }
            else
            {
                return (JArray)JsonConvert.DeserializeObject(Lw_Utils.ObjectToJsonStr(obj));
            }
        }

        #endregion

        #region 网络请求

        /// <summary>
        /// HTTP GET方式请求数据.
        /// </summary>
        /// <param name="url">URL.</param>
        /// <returns></returns>
        public static string HttpGet(string url)
        {
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(url);
            request.Method = "GET";
            //request.ContentType = "application/x-www-form-urlencoded";
            request.Accept = "*/*";
            request.Timeout = 15000;
            request.AllowAutoRedirect = false;

            WebResponse response = null;
            string responseStr = null;

            try
            {
                response = request.GetResponse();

                if (response != null)
                {
                    StreamReader reader = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                    responseStr = reader.ReadToEnd();
                    reader.Close();
                }
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                request = null;
                response = null;
            }
            return responseStr;
        }
        #endregion

        #region 当前项目相关
        public static WebReference.WebService1 getServiceMethod() {
            WebReference.WebService1 client = new WebReference.WebService1();
            WebReference.MySoapHeader myHeader = new WebReference.MySoapHeader();
            myHeader.UserName = "admin";
            myHeader.PassWord = "admincc";
            client.MySoapHeaderValue = myHeader;
            return client;
        }
        #endregion
    }
}