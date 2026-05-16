using Microsoft.AspNetCore.Mvc;

namespace Cloud_Kitchen_web_App.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

    }
}
