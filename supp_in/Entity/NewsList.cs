using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace supp_in.Entity
{
    /// <summary>
    /// 信息类型
    /// </summary>
    public class NewsList
    {
        /// <summary>
        /// 
        /// </summary>
        public string id { get; set; }

        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 信息类别
        /// </summary>
        public string TypeId { get; set; }
    }
}