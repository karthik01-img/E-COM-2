import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

  async function fetchData() {
    const result = await fetch("https://fakestoreapi.com/products");
    const myResult = await result.json();
    setData(myResult);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function addToCart(myItem) {
    const existingItem = cart.find((cartItem) => cartItem.id === myItem.id);
    if (!existingItem) {
      setCart([...cart, { ...myItem, quantity: 1 }]);
    } else {
      alert("Item already exists in the cart");
    }
  }

  function removeCart(myItem) {
    const newCart = cart.filter((item) => item.id !== myItem.id);
    setCart(newCart);
  }

  function increaseQuantity(id) {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  function getTotalPrice() {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  }

  function handleBuyNow(item) {
    setCart([{ ...item, quantity: 1 }]); // Only the clicked item
    setShowPayment(true);
  }

  function handleCheckout() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowPayment(true);
  }

  function handleConfirmPayment() {
    setShowPayment(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setCart([]); // Clear cart after order success
    }, 3000);
  }

  return (
    <div id="main">
      <div className="products">
        {data.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} />
            <h1 className="title">{item.title}</h1>
            <h2>${item.price}</h2>
            <p>{item.category}</p>
            <p className="rating">{item.rating.rate}⭐</p>

            <div className="btn-group">
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <button className="buy-btn" onClick={() => handleBuyNow(item)}>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-container">
        <h1>🛒 Shopping Cart</h1>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                <button onClick={() => removeCart(item)}>🗑 Remove</button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="checkout-section">
            <h2>Order Summary</h2>
            <p>Total Items: {cart.length}</p>
            <h3>Total Price: ${getTotalPrice()}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="payment-modal">
          <div className="payment-content">
            <h3>Select Payment Method</h3>
            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) => setSelectedPayment(e.target.value)}
              />{" "}
              UPI
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Credit/Debit Card"
                onChange={(e) => setSelectedPayment(e.target.value)}
              />{" "}
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                onChange={(e) => setSelectedPayment(e.target.value)}
              />{" "}
              Cash on Delivery
            </label>

            <button
              className="confirm-btn"
              disabled={!selectedPayment}
              onClick={handleConfirmPayment}
            >
              Confirm Payment
            </button>
            <button
              className="cancel-btn"
              onClick={() => setShowPayment(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="success-popup">
          <h3>✅ Order Successful!</h3>
          <p>Thank you for shopping with us!</p>
        </div>
      )}
    </div>
  );
}

export default Home;
