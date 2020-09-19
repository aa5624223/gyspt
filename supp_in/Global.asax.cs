using log4net.Config;
using supp_in.App_Start;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace changfazl
{
    public class MvcApplication : System.Web.HttpApplication
    {
        log4net.ILog Log = log4net.LogManager.GetLogger(typeof(MvcApplication));
        /// <summary>
        /// 
        /// @author ��� 
        /// @Datetime 2017-05-10
        /// </summary>
        protected void Application_Start()
        {
            try
            {
                //����mvc
                AreaRegistration.RegisterAllAreas();
                RouteConfig.RegisterRoutes(RouteTable.Routes);
                //������־�ļ�
                FileInfo configFile = new FileInfo(AppDomain.CurrentDomain.BaseDirectory + "log4net.config");
                XmlConfigurator.ConfigureAndWatch(configFile);
            }
            catch (Exception _e)
            {
                Log.Error(" �����ʼ������,����:" + System.Reflection.MethodBase.GetCurrentMethod().DeclaringType.Name, _e);
            }

        }
    }
}
