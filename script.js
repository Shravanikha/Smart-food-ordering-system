console.log("Foodie JavaScript is running!");
const API_URL = "http://localhost:8080/api/foods";

let foods = [];
let cart = [];

const foodList = document.getElementById("food-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const orderMessage = document.getElementById("order-message");
function getEmoji(name) {
    const emojis = {
        pizza: "🍕",
        burger: "🍔",
        pasta: "🍝",
        sandwich: "🥪",
        
    };

    return emojis[name.toLowerCase()] || "🍽️";
}
function displayFoods() {
    foodList.innerHTML = foods.map(food => `
        <article class="food-card">
           <div class="food-emoji">${getEmoji(food.name)}</div>
            <h3>${food.name}</h3>
            <p class="food-category">${food.category}</p>

            <div class="food-bottom">
                <span class="food-price">
                    ₹${Number(food.price).toFixed(2)}
                </span>

                <button class="add-btn"
                    onclick="addToCart(${food.id})"
                    ${food.available ? "" : "disabled"}>
                    ${food.available ? "Add +" : "Unavailable"}
                </button>
            </div>
        </article>
    `).join("");
}
async function loadFoods() {
    foodList.innerHTML = "<p>Loading menu...</p>";

    try {
        console.log("1. Requesting food menu...");

        const response = await fetch("http://localhost:8080/api/foods");

        console.log("2. API response status:", response.status);

        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }

        const data = await response.json();
        foods = data;
        displayFoods();

    } catch (error) {
        console.error("Menu loading error:", error);

        foodList.innerHTML = `
            <p style="color: red;">
                Menu failed to load. Check the browser console.
            </p>
        `;
    }
}

function addToCart(id) {
    console.log("Add button clicked! Food ID:", id);
    if (sessionStorage.getItem("loggedIn") !== "true") {
    alert("Please log in first to place your order!");
    return;
}
    const food = foods.find(item => item.id === id);

    if (!food || !food.available) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...food, quantity: 1 });
    }

    updateCart();
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();
}

function updateCart() {
    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = totalPrice.toFixed(2);
    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <p>₹${Number(item.price).toFixed(2)} each</p>
            </div>

            <div>
                <button onclick="changeQuantity(${item.id}, -1)">−</button>
                <strong>${item.quantity}</strong>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join("");
}

checkoutBtn.addEventListener("click", async function () {
    if (sessionStorage.getItem("loggedIn") !== "true") {
        document.getElementById("login-warning").style.display = "block";
        return;
    }
    if (cart.length === 0) return;


checkoutBtn.disabled = true;
checkoutBtn.textContent = "Placing Order...";
orderMessage.textContent = "";

try {
    const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            items: cart,
            total: cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            )
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error("Order failed");
    }

    orderMessage.textContent =
    `${data.message} Your Order ID: ${data.orderId}`;
    cart = [];
    updateCart();

} catch (error) {
    console.error("Order error:", error);
    orderMessage.textContent =
        "Could not place order. Please try again.";
} finally {
    checkoutBtn.textContent = "Place Order";
    checkoutBtn.disabled = cart.length === 0;
}


});

loadFoods();







