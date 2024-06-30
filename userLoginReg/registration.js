document.addEventListener("DOMContentLoaded", () => {
    // Clear form inputs on page load
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
});

let nameIn = document.getElementById("name");
let emailIn = document.getElementById("email");
let passIn = document.getElementById("password");
let regform = document.getElementById("regForm");

function register() {
    return fetch(`https://sarthi-api.onrender.com/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: nameIn.value,
            email: emailIn.value,
            password: passIn.value
        })
    })
    .then((res) => {
        return res.json();
    });
}

regform.addEventListener("submit", function(e) {
    e.preventDefault();

    if (passIn.value.length !== 6) {
        alert("Password must be exactly 6 characters long.");
        return; // Stop further execution if the password length is not 6
    }

    // Check if the email is from Gmail or Yahoo domain
    let emailValue = emailIn.value.trim().toLowerCase();
    if (!emailValue.endsWith("@gmail.com") && !emailValue.endsWith("@yahoo.com")) {
        alert("Please enter a valid Gmail or Yahoo email address.");
        return;
    }

    fetch(`https://sarthi-api.onrender.com/users`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            let found = false;
            data.forEach((el) => {
                if (el.email === emailIn.value) {
                    found = true;
                }
            });

            if (found) {
                alert("Email already exists");
            } else {
                register()
                    .then(() => {
                        alert("Registered Successfully");
                        window.location.href = "login.html";
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});
