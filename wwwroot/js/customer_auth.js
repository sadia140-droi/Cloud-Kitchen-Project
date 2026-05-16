document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("customerSignupForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const fullName = document.getElementById("fullName").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const city = document.getElementById("city").value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Demo: save to localStorage
            const user = { fullName, email, phone, password, city };
            localStorage.setItem("customer", JSON.stringify(user));

            // Redirect to customer dashboard or kitchen list
            window.location.href = "/Customer/Dashboard";
        });
    }
});
