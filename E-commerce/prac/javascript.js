document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".add-to-cart");

    cartButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const name = this.getAttribute("data-name");
            const price = this.getAttribute("data-price");
            const img = this.getAttribute("data-img");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name, price, img, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const closeModal = document.querySelector(".close");
    const toggleSignup = document.getElementById("toggleSignup");
    let isUserLoggedIn = localStorage.getItem("loggedInUser") || false;

    function showLoginModal() {
        loginModal.style.display = "block";
    }

    closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

 
    loginBtn.addEventListener("click", () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (email && password) {
            localStorage.setItem("loggedInUser", email);
            alert("Login Successful!");
            loginModal.style.display = "none";
        } else {
            alert("Please enter valid details!");
        }
    });


    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            if (!localStorage.getItem("loggedInUser")) {
                showLoginModal();
                return;
            }

            let name = this.getAttribute("data-name");
            let price = this.getAttribute("data-price");
            let img = this.getAttribute("data-img");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name, price, img, quantity: 1 });

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Item added to cart!");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const closeModal = document.querySelector(".close");
    const authBtn = document.getElementById("authBtn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const signupToggle = document.getElementById("toggleSignup");
    const modalTitle = document.getElementById("modal-title");
    const cartIcon = document.querySelector("#navbar li a[href='cart.html']");
    
    let isSignup = false;
    let users = JSON.parse(localStorage.getItem("users")) || {}; 
    let userLoggedIn = localStorage.getItem("userLoggedIn");

    cartIcon.addEventListener("click", (e) => {
        if (!userLoggedIn) {
            e.preventDefault();
            loginModal.style.display = "block";
        }
    });

    signupToggle.addEventListener("click", () => {
        isSignup = !isSignup;
        modalTitle.innerText = isSignup ? "Sign Up" : "Login";
        authBtn.innerText = isSignup ? "Sign Up" : "Login";
        signupToggle.innerHTML = isSignup 
            ? 'Already have an account? <span>Login</span>' 
            : 'New User? <span>Sign Up</span>';
    });

    authBtn.addEventListener("click", () => {
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        if (isSignup) {
            if (users[email]) {
                alert("User already exists! Please login.");
            } else {
                users[email] = password;
                localStorage.setItem("users", JSON.stringify(users));
                alert("Signup successful! You can now login.");
                isSignup = false;
                modalTitle.innerText = "Login";
                authBtn.innerText = "Login";
            }
        } else {
            if (users[email] && users[email] === password) {
                localStorage.setItem("userLoggedIn", email);
                alert("Login Successful!");
                loginModal.style.display = "none";
                location.reload();
            } else {
                alert("Invalid credentials!");
            }
        }
    });

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    };
});
document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const closeModal = document.querySelector(".close");
    const loginButton = document.createElement("button");
    loginButton.id = "loginButton";
    loginButton.innerText = "Login";
    document.body.appendChild(loginButton);
    
    const authBtn = document.getElementById("authBtn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const cartItems = document.querySelectorAll(".add-to-cart");
    const signupToggle = document.getElementById("toggleSignup");
    const modalTitle = document.getElementById("modal-title");
    const cartCount = document.getElementById("cart-count");

    let isSignup = false;
    let users = JSON.parse(localStorage.getItem("users")) || {};
    let userLoggedIn = localStorage.getItem("userLoggedIn");

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCount.innerText = cart.length;
    }

    if (userLoggedIn) {
        loginButton.innerText = "Logout";
        loginButton.addEventListener("click", () => {
            localStorage.removeItem("userLoggedIn");
            location.reload();
        });
    } else {
        loginButton.addEventListener("click", () => {
            loginModal.style.display = "block";
        });
    }

    closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    signupToggle.addEventListener("click", () => {
        isSignup = !isSignup;
        modalTitle.innerText = isSignup ? "Sign Up" : "Login";
        authBtn.innerText = isSignup ? "Sign Up" : "Login";
        signupToggle.innerHTML = isSignup 
            ? 'Already have an account? <span>Login</span>' 
            : 'New User? <span>Sign Up</span>';
    });

    authBtn.addEventListener("click", () => {
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        if (isSignup) {
            if (users[email]) {
                alert("User already exists! Please login.");
            } else {
                users[email] = password;
                localStorage.setItem("users", JSON.stringify(users));
                alert("Signup successful! You can now login.");
                isSignup = false;
                modalTitle.innerText = "Login";
                authBtn.innerText = "Login";
            }
        } else {
            if (users[email] && users[email] === password) {
                localStorage.setItem("userLoggedIn", email);
                alert("Login Successful!");
                loginModal.style.display = "none";
                loginButton.innerText = "Logout";
                location.reload();
            } else {
                alert("Invalid credentials!");
            }
        }
    });

    cartItems.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();

            if (!localStorage.getItem("userLoggedIn")) {
                loginModal.style.display = "block";
                return;
            }

            let name = item.getAttribute("data-name");
            let price = item.getAttribute("data-price");
            let img = item.getAttribute("data-img");
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            
            cart.push({ name, price, img });
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${name} added to cart!`);
        });
    });

    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    };

    updateCartCount();
});
