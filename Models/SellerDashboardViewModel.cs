    using System;
    using System.Collections.Generic;

    namespace Cloud_Kitchen_web_App.Models
    {
      
    public class SellerDashboardViewModel
    {
        public string SellerName { get; set; }
        public string KitchenName { get; set; }
        public string StoreStatus { get; set; }
        public List<Order> RecentOrders { get; set; } = new();
        public int TotalOrders => RecentOrders.Count;
        public int OrdersThisWeek => RecentOrders.FindAll(o => o.PlacedAt >= DateTime.Now.AddDays(-7)).Count;
        public int ActiveOrders => RecentOrders.FindAll(o => o.Status == "Preparing" || o.Status == "Out for Delivery").Count;
        public decimal TodayEarnings => RecentOrders.FindAll(o => o.PlacedAt.Date == DateTime.Now.Date && o.Status == "Delivered").Sum(o => o.Total);
    }

}


