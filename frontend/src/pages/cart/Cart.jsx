import React, { useState } from 'react';
import './Cart.scss';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', quantity: 1, price: 20, image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Item 2', quantity: 2, price: 15, image: 'https://via.placeholder.com/50' },
    // Add more items as needed
  ]);

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleIncrement = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrement = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleCheckout = () => {
    // Implement checkout functionality here
    alert('Proceeding to checkout!');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <>
    <section className='cartt'>
    <div className="cart-page">
      <h1>Items Added to the Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Row</th>
            <th>Image</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td><img src={item.image} alt={item.name} className="item-image" /></td>
              <td>{item.name}</td>
              <td>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item.id)} className="quantity-button">-</button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)} className="quantity-button">+</button>
                </div>
              </td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <button onClick={() => handleRemove(item.id)} className="remove-button">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <h2>Total: ${calculateTotal().toFixed(2)}</h2>
        <button onClick={handleCheckout} className="checkout-button">Checkout</button>
      </div>
    </div>
    </section>
    </>
    
  );
};

export default Cart;
