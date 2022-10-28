import './App.css';

import Customer from './components/customer/Customer';
import Order from './components/order/Order';
import Product from './components/product/Product';

function App() { 

  return (
    <div>
      <div className='main-container'>
        <label className='model-label'>
          <h2>Customer Section</h2>
          <Customer />
        </label>
        
        <label className='model-label'>
          <h2>Product Section</h2>
          <Product />
        </label>
        
        <label className='model-label'>
          <h2>Order Section</h2>
          <Order />
        </label>
      </div>
    </div>
  );
}

export default App;
