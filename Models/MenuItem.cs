using System;

namespace Cloud_Kitchen_web_App.Models
{
    public class MenuItem
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public bool Available { get; set; } = true;
        public string Image { get; set; }
    }

   
}
