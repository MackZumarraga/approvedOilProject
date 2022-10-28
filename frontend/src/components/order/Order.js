import React, { useEffect, useState } from "react";
import './order.css';
import axios from 'axios';
import moment from 'moment';

function Order() {
  const [orders, setOrders] = useState([]);

  const [customerId, setCustomerId] = useState(undefined);
  const [productId, setProductId] = useState(undefined);
  const [quantity, setQuantity] = useState(undefined);
  const [purchaseDate, setPurchaseDate] = useState(undefined);

  const [editMode, setEditMode] = useState([false, null])

  const [forceRender, setForceRender] = useState(0);

  const fetchOrders = async () => {
    const response = await axios.get('/api/orders/');
    return response.data
  }
  
  const postOrder = async () => {
    const newOrder = {
      customerId: customerId,
      productId: productId,
      quantity: quantity,
      purchaseDate: purchaseDate
    }
    

    try {
      const response = await axios.post('api/orders/newOrder', newOrder);
      return response.data;
    } catch (error) {
      console.log(error.response.data.customer);      
    }
  };



  const updateOrder = async () => {
    const updatedOrder = {
      customerId: customerId,
      productId: productId,
      quantity: quantity,
      purchaseDate: purchaseDate
    }

    try {
      const response = await axios.patch(`api/orders/updateOrder/${editMode[1]}`, updatedOrder);
      setForceRender(forceRender + 1);
      setEditMode([false, null]);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }


    const deleteOrder = async (orderId) => {
        try {
        const response = await axios.delete(`api/orders/deleteOrder/${orderId}`);
        
        if (response) {
            setForceRender(forceRender + 1)
            return response.data;
        }

        } catch (error) {
        console.log(error);
        }
    };

  useEffect(() => {
    const getOrders = async () => {
      const allOrders = await fetchOrders();

      if (allOrders) {
        setOrders(allOrders);
      } 
    };
    
    getOrders();
  }, [forceRender])
  

  return (
    <div>
      <div className="data">
        {orders.map((item) => 
        <div>
          <ul key={item._id}>
            <li>
              Order ID: {item._id}
            </li>
            <li>
              Customer ID: {item.customerId}
            </li>
            <li>
              Product ID: {item.productId}
            </li>
            <li>
              Quantity: {item.quantity}
            </li>
            <li>
              Purchase Date: {moment(item.purchaseDate).utc().format('YYYY-MM-DD')}
            </li>
          </ul>
          <button className="defocus"></button>
          <button onClick={() => setEditMode([!editMode[0], !editMode[0] ? item._id : null])}>{editMode[0] && editMode[1] === item._id ? "Cancel Edit" : "Edit"}</button>
          <button onClick={() => deleteOrder(item._id)}>Delete</button>
        </div>
        )}
      </div>

      <form className="order-form" onSubmit={editMode[0] ? updateOrder : postOrder}>
        <label>Customer ID
          <input type="text" onChange={e => setCustomerId(e.target.value)} required={!editMode[0]}></input>
        </label>

        <label>Product ID
          <input type="text" onChange={e => setProductId(e.target.value)} required={!editMode[0]}></input>
        </label>

        <label>Quantity
          <input type="number" onChange={e => setQuantity(e.target.value)} required={!editMode[0]}></input>
        </label>

        <label>Purchase Date
          <input type="date" onChange={e => setPurchaseDate(e.target.value)} required={!editMode[0]}></input>
        </label>
        
        <div className="button-container">
          <button type="submit">{editMode[0] ? "Edit Order" : "Add Order"}</button>
        </div>
      </form>
    </div>
  );
}

export default Order;
