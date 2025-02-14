
// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("login-form");
//     const loginMessage = document.getElementById("login-message");
    
//     // Add filled class to inputs on typing
//     form.querySelectorAll("input").forEach(input => {
//         input.addEventListener("input", function() {
//             if (this.value.trim()) {
//                 this.classList.add("filled");
//             } else {
//                 this.classList.remove("filled");
//             }
//         });
//     });

//     form.addEventListener("submit", async function(event) {
//         event.preventDefault();

//         // Validate all fields
//         const inputs = form.querySelectorAll("input");
//         let isValid = true;
//         inputs.forEach(input => {
//             if (!input.value.trim()) {
//                 input.classList.add("error-shake");
//                 isValid = false;
//             }
//         });

//         if (!isValid) {
//             await new Promise(resolve => setTimeout(resolve, 500));
//             inputs.forEach(input => input.classList.remove("error-shake"));
//             return;
//         }

//         // Proceed with form submission
//         const email = document.getElementById("email").value;
//         const password = document.getElementById("password").value;

//         try {
//             const response = await fetch("http://127.0.0.1:8000/api/login", { 
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ email, password })
//             });

//             if (!response.ok) {
//                 throw new Error('Login failed');
//             }

//             const result = await response.json();
//             localStorage.setItem("token", result.access_token);
            
//             loginMessage.textContent = "Login successful! Redirecting...";
//             loginMessage.classList.add("success");
//             setTimeout(() => {
//                 window.location.href = "dashboard.html";
//             }, 2000);
            
//         } catch (error) {
//             loginMessage.textContent = "Invalid email or password";
//             loginMessage.classList.add("error");
//         }

//         // Hide message after 5 seconds
//         setTimeout(() => {
//             loginMessage.textContent = "";
//             loginMessage.classList.remove("success", "error");
//         }, 5000);
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
    
    function addFilledClass(input) {
        input.classList.toggle("filled", input.value.trim() !== "");
    }

    form.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => addFilledClass(input));
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const inputs = form.querySelectorAll("input");
        let isValid = true;
        inputs.forEach(input => {
            addFilledClass(input);
            if (!input.value.trim()) {
                input.classList.add("error-shake");
                isValid = false;
            } else {
                input.classList.remove("error-shake");
            }
        });

        if (!isValid) {
            setTimeout(() => {
                inputs.forEach(input => input.classList.remove("error-shake"));
            }, 500);
            return;
        }

        const email = document.getElementById("email");
        const password = document.getElementById("password");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.value.trim(),
                    password: password.value.trim()
                })
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const result = await response.json();
            localStorage.setItem("token", result.access_token);
            
            showLoginMessage("success", "Login successful! Redirecting...");
            setTimeout(() => window.location.href = "dashboard.html", 2000);
            
        } catch (error) {
            showLoginMessage("error", "Invalid email or password");
        }

        setTimeout(() => {
            loginMessage.textContent = "";
            loginMessage.className = "";
        }, 5000);
    });

    function showLoginMessage(type, message) {
        if (type === "success") {
            loginMessage.textContent = message;
            loginMessage.className = "success";
        } else if (type === "error") {
            loginMessage.textContent = message;
            loginMessage.className = "error";
        }
    }
});