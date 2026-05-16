document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // frontend demo redirect
            window.location.href = "/Kitchen/Create";
        });
    }
});
