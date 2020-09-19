using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace supp_in.Entity
{
    /// <summary>
    /// 信息明细
    /// </summary>
    public class NewsDetail
    {
        /// <summary>
        /// 内容
        /// </summary>
        public string Contents { get; set; }

        /// <summary>
        /// 发布日期
        /// </summary>
        public string EditDate { get; set; }
        /// <summary>
        /// 是否有附件 0：无；1：有
        /// </summary>
        public string FileLoad { get; set; }
    }
}