
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");

    function showError(input, message) {
        let errorElement = input.parentNode.querySelector(".error-message");
        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.classList.add("error-message");
            input.parentNode.appendChild(errorElement); // Append after input and label
        }
        errorElement.textContent = message;
        errorElement.style.color = "red";
        input.classList.add("error-border");
    }

    function clearError(input) {
        let errorElement = input.parentNode.querySelector(".error-message");
        if (errorElement) {
            errorElement.textContent = "";
        }
        input.classList.remove("error-border");
    }

    function validateName(input) {
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(input.value.trim())) {
            showError(input, "Only letters are allowed.");
            return false;
        }
        clearError(input);
        return true;
    }

    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Broader email support
        if (!emailRegex.test(input.value.trim())) {
            showError(input, "Enter a valid email address.");
            return false;
        }
        clearError(input);
        return true;
    }

    function validatePassword(input) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(input.value)) {
            showError(input, "Password must be at least 8 characters and have a letter and a number.");
            return false;
        }
        clearError(input);
        return true;
    }

    function validateDOB(input) {
        const dob = new Date(input.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();
        if (age < 15 || (age === 15 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
            showError(input, "You must be at least 15 years old.");
            return false;
        }
        clearError(input);
        return true;
    }

    // Attach blur event listeners
    document.getElementById("first_name").addEventListener("blur", function () {
        validateName(this);
    });
    document.getElementById("last_name").addEventListener("blur", function () {
        validateName(this);
    });
    document.getElementById("email").addEventListener("blur", function () {
        validateEmail(this);
    });
    document.getElementById("password").addEventListener("blur", function () {
        validatePassword(this);
    });
    document.getElementById("date_of_birth").addEventListener("blur", function () {
        validateDOB(this);
    });

    // Input and select event listeners
    form.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", function () {
            clearError(this);
            let label = document.querySelector(`label[for="${this.id}"]`);
            if (this.value.trim()) {
                this.classList.add("filled");
                if (label) label.style.visibility = "hidden";
            } else {
                this.classList.remove("filled");
                if (label) label.style.visibility = "visible";
            }
        });
    });

    // Form submission handling
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const inputs = {
            first_name: validateName(document.getElementById("first_name")),
            last_name: validateName(document.getElementById("last_name")),
            email: validateEmail(document.getElementById("email")),
            password: validatePassword(document.getElementById("password")),
            dob: validateDOB(document.getElementById("date_of_birth"))
        };

        if (!Object.values(inputs).every(valid => valid)) return;

        const gender = document.getElementById("gender");
        try {
            const response = await fetch("http://127.0.0.1:8000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    first_name: document.getElementById("first_name").value,
                    last_name: document.getElementById("last_name").value,
                    date_of_birth: document.getElementById("date_of_birth").value,
                    gender: gender.value,
                    email: document.getElementById("email").value,
                    password: document.getElementById("password").value
                })
            });

            if (response.ok) {
                alert("Signup successful! Redirecting...");
                window.location.href = "login.html";
            } else {
                alert(await response.json().then(data => data.detail || "Error signing up."));
            }
        } catch (error) {
            alert("An error occurred during signup.");
            console.error("Network error:", error);
        }
    });
});