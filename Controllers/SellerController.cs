using Microsoft.AspNetCore.Mvc;
using Cloud_Kitchen_web_App.Models;
using System;
using System.Collections.Generic;

namespace Cloud_Kitchen_web_App.Controllers
{
    public class SellerController : Controller
    {
        public IActionResult SellerDashboard()
        {
            var vm = new SellerDashboardViewModel
            {
                SellerName = "Amna Ramzan",
                KitchenName = "Amna's Kitchen",
                StoreStatus = "Open",
                RecentOrders = new List<Order>
                {
                    new Order
                    {
                        Id = "ORD1001",
                        Customer = "Ali",
                        Phone = "03001234567",
                        Address = "Street 5, Lahore",
                        Items = new List<OrderItem>
                        {
                            new OrderItem { Name = "Chicken Biryani", Qty = 2, Price = 350 }
                        },
                        Total = 700,
                        PlacedAt = DateTime.Now.AddHours(-5),
                        Status = "New"
                    },
                    new Order
                    {
                        Id = "ORD1002",
                        Customer = "Sara",
                        Phone = "03007654321",
                        Address = "Block B, Islamabad",
                        Items = new List<OrderItem>
                        {
                            new OrderItem { Name = "Beef Karahi", Qty = 1, Price = 450 }
                        },
                        Total = 450,
                        PlacedAt = DateTime.Now.AddHours(-10),
                        Status = "Preparing"
                    },
                    new Order
                    {
                        Id = "ORD1003",
                        Customer = "Hassan",
                        Phone = "03111223344",
                        Address = "Gulberg",
                        Items = new List<OrderItem>
                        {
                            new OrderItem { Name = "Chicken Roll", Qty = 3, Price = 150 }
                        },
                        Total = 450,
                        PlacedAt = DateTime.Now.AddHours(-20),
                        Status = "Out for Delivery"
                    }
                }
            };
            return View(vm);
        }
        public IActionResult MenuManage()
        {
            var vm = new MenuViewModel
            {
                KitchenName = "Amna's Kitchen",
                Items = new List<MenuItem>
                {
                    new MenuItem { Name = "Chicken Biryani", Category = "Entrees", Price = 350, Available = true },
                    new MenuItem { Name = "Beef Karahi", Category = "Entrees", Price = 450, Available = true },
                    new MenuItem { Name = "Gulab Jamun", Category = "Desserts", Price = 120, Available = true }
                }
            };
            return View(vm);
        }

        public IActionResult ManageOrders()
        {
            var vm = new OrdersViewModel
            {
                SellerName = "Amna Ramzan",
                KitchenName = "Amna's Kitchen",
                StoreStatus = "Open",
                Orders = new List<Order>
                {
                    new Order
                    {
                        Id = "ORD1001",
                        Customer = "Ali",
                        Phone = "03001234567",
                        Address = "Street 5, Lahore",
                        Items = new List<OrderItem>{ new OrderItem{ Name="Chicken Biryani", Qty=2, Price=350 } },
                        Total=700,
                        PlacedAt = DateTime.Now.AddHours(-5),
                        Status = "New"
                    },
                    new Order
                    {
                        Id = "ORD1002",
                        Customer = "Sara",
                        Phone = "03007654321",
                        Address = "Block B, Islamabad",
                        Items = new List<OrderItem>{ new OrderItem{ Name="Beef Karahi", Qty=1, Price=450 } },
                        Total=450,
                        PlacedAt = DateTime.Now.AddHours(-10),
                        Status = "Preparing"
                    }
                }
            };
            return View(vm);
        }

        public IActionResult Notification()
        {
            var vm = new NotificationViewModel
            {
                Notifications = new List<Notification>
                {
                    new Notification { Id="N1", Title="New order received", Body="2x Biryani from Ali", Time=DateTime.Now.AddMinutes(-20), Status="unread", Link="ManageOrders" },
                    new Notification { Id="N2", Title="Payment received", Body="Rs. 450 from Sara (JazzCash)", Time=DateTime.Now.AddHours(-2), Status="read", Link="MenuManage" }
                }
            };
            return View(vm);
        }
        public IActionResult SellerProfile()
        {
            var vm = new SellerProfileViewModel
            {
                Name = "Amna Ramzan",
                Shop = "Amna's Kitchen",
                Phone = "0300-0000000",
                Email = "amna@example.com",
                Address = "Lahore, Pakistan",
                Photo = "/images/profile.png"
            };
            return View(vm);
        }

        public IActionResult Setting()
        {
            var vm = new SettingViewModel
            {
                SellerName = "Amna Ramzan",
                KitchenName = "Amna's Kitchen",
                NotificationsEnabled = true
            };
            return View(vm);
        }
    }
}
