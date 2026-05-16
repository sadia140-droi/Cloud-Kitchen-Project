namespace Cloud_Kitchen_web_App.Models
{
    public class MenuViewModel
    {
        public string KitchenName { get; set; }
        public List<MenuItem> Items { get; set; } = new List<MenuItem>();
    }
}
