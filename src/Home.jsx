import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

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

  function getTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
              <button className="buy-btn">Buy Now</button>
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
                  <p>{item.category}</p>
                  <span>{item.rating.rate}⭐</span>
                </div>
                <button onClick={() => removeCart(item)}>🗑 Remove</button>
              </div>
            ))
          )}
        </div>

        {/* Checkout Section */}
        {cart.length > 0 && (
          <div className="checkout-section">
            <h2>Order Summary</h2>
            <p>Total Items: {cart.length}</p>
            <h3>Total Price: ${getTotalPrice()}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
