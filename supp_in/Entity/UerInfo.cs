using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace supp_in.Entity
{
    public class UerInfo
    {
        /// <summary>
        /// 用户权限
        /// </summary>
        public string cRole { get; set; }
        /// <summary>
        /// 用户名称
        /// </summary>
        public string cUserName { get; set; }
        /// <summary>
        /// 供应商编码
        /// </summary>
        public string gysCode { get; set; }

    }
}