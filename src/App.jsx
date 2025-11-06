import React, { useEffect, useState } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Practice from "./practice"

import Practice from "./practice";
import Home from "./Home";
function App(){
  return(
    <div>
      <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Practice/>}/>
          <Route path="/Home" element={<Home/>} />

      </Routes>
      </BrowserRouter>

    </div>
  )
}
export default App
// import "./App.css";

// function App() {
//   const [data, setData] = useState([]);
//   const [cart, setCart] = useState([]);

//   // Fetch API data
//   async function fetchData() {
//     const result = await fetch("https://fakestoreapi.com/products");
//     const myResult = await result.json();
//     setData(myResult);
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Add to cart
//   function addToCart(myItem) {
//     const existingItem = cart.find((cartItem) => cartItem.id === myItem.id);
//     if (!existingItem) {
//       setCart([...cart, myItem]);
//     } else {
//       alert("Item already exists in the cart");
//     }
//   }

//   // Remove from cart
//   function removeCart(myItem) {
//     const newCart = cart.filter((item) => item.id !== myItem.id);
//     setCart(newCart);
//   }

//   // Calculate total price
//   const totalPrice = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

//   return (
//     <div className="main-container">
//       {/* Product Section */}
//       <div className="product-section">
//         <h1 className="section-title">🛍 Product List</h1>
//         <div className="product-list">
//           {data.map((item) => (
//             <div className="product-card" key={item.id}>
//               <img src={item.image} alt={item.title} />
//               <h3 className="product-title">{item.title}</h3>
//               <p className="product-id">ID: {item.id}</p>
//               <p className="product-price">₹{item.price}</p>
//               <button onClick={() => addToCart(item)}>Add To Cart</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Cart Sidebar */}
//       <div className="cart-sidebar">
//         <h1>🛒 Cart ({cart.length})</h1>
//         {cart.length === 0 ? (
//           <p className="empty-cart">Your cart is empty</p>
//         ) : (
//           <>
//             <div className="cart-items">
//               {cart.map((item) => (
//                 <div className="cart-item" key={item.id}>
//                   <img src={item.image} alt={item.title} />
//                   <div className="cart-details">
//                     <h4>{item.title}</h4>
//                     <p>ID: {item.id}</p>
//                     <p>₹{item.price}</p>
//                   </div>
//                   <button
//                     className="remove-btn"
//                     onClick={() => removeCart(item)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="cart-total">
//               <h3>Total: ₹{totalPrice}</h3>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
