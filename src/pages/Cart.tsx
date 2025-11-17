import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/order-success');
  };
  
  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-secondary mb-6">Your Cart is Empty</h1>
          <p className="text-textLight text-xl mb-8">Add some beautiful items to your cart!</p>
          <Link to="/party-wear">
            <button className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-semibold">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center text-secondary mb-12">Shopping Cart</h1>
        
        <div className="max-w-4xl mx-auto">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col md:flex-row items-center gap-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-secondary">{item.name}</h3>
                <p className="text-textLight text-lg">₹{item.price.toLocaleString()}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-secondary">Total:</h3>
              <p className="text-3xl font-bold text-primary">₹{total.toLocaleString()}</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={clearCart}
                className="flex-1 px-6 py-3 bg-gray-200 text-secondary rounded-lg hover:bg-gray-300 transition-colors font-semibold"
              >
                Clear Cart
              </button>
              <button 
                onClick={handleCheckout}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-semibold"
              >
                Place Order 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
