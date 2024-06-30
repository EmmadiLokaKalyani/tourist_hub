let email = document.getElementById("logemail");
let password = document.getElementById("password");
let loginBtn = document.getElementById("logbtn");
let loginSucessfully = document.getElementById("login--sucessfully");
let clickHereMassageBtn = document.getElementById("Show-here");
let card = document.getElementById("Card");

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let userNameValue = email.value;
    let passwordValue = password.value;

    if (userNameValue == "" && passwordValue == "") {
        alert("Please enter your username and password");
    } else if (userNameValue == "") {
        alert("Please enter your username");
    } else if (passwordValue == "") {
        alert("Please enter your password");
    } else {
        login({
            email: userNameValue,
            password: passwordValue,
        });
    }
});

function login(obj) {
    console.log(obj);
    fetch("https://sarthi-api.onrender.com/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let found = false;
            let status = false;
            let username;

            data.forEach((e) => {
                if (e.email == obj.email && e.password == obj.password) { // Corrected the password key
                    found = true;
                    username = e.name;
                }
            });

            if (found) {
                status = true;
                console.log(status);
                alert("Login successful");

                localStorage.setItem("username", username);
                localStorage.setItem("logStatus", status);
                window.open("../index.html");
            } else {
                console.log(status);
                alert("Wrong username or password");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
