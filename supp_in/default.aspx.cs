using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using supp_in.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace supp_in
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            JObject msg = new JObject();

            //WebReference.WebService1 client = Lw_Utils.getServiceMethod();
            //JArray UInfo = (JArray)JsonConvert.DeserializeObject(client.GetUinfo(Factory, Year, userName, null, null, password));


        }
    }
}