using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace supp_in.Entity
{
    /// <summary>
    /// 采购单列表
    /// </summary>
    public class POlist1
    {
        /// <summary>
        /// 
        /// </summary>
        public string cId { get; set; }

        /// <summary>
        /// 采购单号
        /// </summary>
        public string cCpoid { get; set; }

        /// <summary>
        /// 订单日期
        /// </summary>
        public string cDpodate { get; set; }

        /// <summary>
        /// 数量
        /// </summary>
        public string cIquantity { get; set; }

        /// <summary>
        /// 物料名称
        /// </summary>
        public string cInvname { get; set; }
    }
}