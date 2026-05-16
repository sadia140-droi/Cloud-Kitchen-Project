using Microsoft.AspNetCore.Mvc;
using Cloud_Kitchen_web_App.Models;
using System.Collections.Generic;

namespace Cloud_Kitchen_web_App.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
