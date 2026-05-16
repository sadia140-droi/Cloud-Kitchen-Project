using Microsoft.AspNetCore.Mvc;

namespace Cloud_Kitchen_web_App.Controllers
{
    public class AccountController : Controller
    {
        // LOGIN
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(string Email, string Password)
        {
            // TODO: login logic
            return RedirectToAction("Index", "Home");
        }

        // SIGNUP MAIN PAGE
        public IActionResult Signup()
        {
            return View();
        }

        // SELLER SIGNUP (LOCAL COOK)
        [HttpGet]
        public IActionResult SellerSignup()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult SellerSignup(string fullName, string email, string phone, string password, string city)
        {
            // TODO: Save seller to database

            // Signup successful → redirect to verification page
            return RedirectToAction("Verification");
        }

        // CUSTOMER SIGNUP
        [HttpGet]
        public IActionResult CustomerSignup()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CustomerSignup(string fullName, string email, string phone, string password, string city)
        {
            // TODO: Save customer to database

            // Signup successful → redirect to customer verification page
            return RedirectToAction("CustomerVerification");
        }

        // FORGOT PASSWORD
        public IActionResult Forgot()
        {
            return View();
        }

        // SELLER VERIFICATION PAGE
        public IActionResult Verification()
        {
            return View();
        }

       
    }
}
