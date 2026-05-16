public class NotificationViewModel
{
    public List<Notification> Notifications { get; set; }
}

public class Notification
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Body { get; set; }
    public DateTime Time { get; set; }
    public string Status { get; set; }
    public string Link { get; set; }
}
