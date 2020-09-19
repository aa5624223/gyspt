using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace supp_in.Entity
{
    /// <summary>
    /// 入库单进度列表
    /// </summary>
    public class RDlist1
    {
        /// <summary>
        /// 入库单号
        /// </summary>
        public string ccode { get; set; }
        /// <summary>
        /// 状态名称
        /// </summary>
        public string status { get; set; }
        /// <summary>
        /// 操作员
        /// </summary>
        public string czy { get; set; }
        /// <summary>
        /// 供应商编码
        /// </summary>
        public string cvencode { get; set; }
    }
}