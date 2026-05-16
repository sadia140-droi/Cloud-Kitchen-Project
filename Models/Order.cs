using System;
using System.Collections.Generic;

namespace Cloud_Kitchen_web_App.Models
{
    public class Order
    {
        public string Id { get; set; }
        public string Customer { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public List<OrderItem> Items { get; set; } = new();
        public decimal Total { get; set; }
        public DateTime PlacedAt { get; set; }
        public string Status { get; set; }
    }
}
