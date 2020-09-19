using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace supp_in.Entity
{
    /// <summary>
    /// 入库单操作记录表
    /// </summary>
    public class RkdEvent
    {
        /// <summary>
        /// 操作时间
        /// </summary>
        public string Czsj { get; set; }

        /// <summary>
        /// 操作名称
        /// </summary>
        public string Event { get; set; }

        /// <summary>
        /// 操作员
        /// </summary>
        public string cUserName { get; set; }

        /// <summary>
        /// 入库单号
        /// </summary>
        public string MainID { get; set; }

        /// <summary>
        /// 发票号
        /// </summary>
        public string Fph { get; set; }
    }
}