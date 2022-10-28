import React, { useEffect, useState } from "react";
import './customer.css';
import axios from 'axios';


function Customer() {
  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [phone, setPhone] = useState(undefined);

  const [editMode, setEditMode] = useState([false, null])

  const [forceRender, setForceRender] = useState(0);

  const fetchCustomers = async () => {
    const response = await axios.get('/api/customers/');
    return response.data
  }
  
  const postCustomer = async () => {
    const newCustomer = {
      email: email,
      name: name,
      address: address,
      phone: phone
    }

    try {
      const response = await axios.post('api/customers/newCustomer', newCustomer);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomer = async () => {
    const updatedCustomer = {
      email: email,
      name: name,
      address: address,
      phone: phone
    }

    try {
      const response = await axios.patch(`api/customers/updateCustomer/${editMode[1]}`, updatedCustomer);
      setForceRender(forceRender + 1);
      setEditMode([false, null]);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const deleteCustomer = async (customerId) => {
    try {
      const response = await axios.delete(`api/customers/deleteCustomer/${customerId}`);
      
      if (response) {
        setForceRender(forceRender + 1)
        window.location.reload(false);
        return response.data;
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCustomers = async () => {
      const allCustomers = await fetchCustomers();

      if (allCustomers) {
        setCustomers(allCustomers);
      } 
    };
    
    getCustomers();
  }, [forceRender])



  return (
    <div>
      <div className="data">
        {customers.map((item) => 
        <div>
          <ul key={item._id}>
            <li>
              ID: {item._id}
            </li>
            <li>
              Name: {item.name}
            </li>
            <li>
              Email: {item.email}
            </li>
            <li>
              Address: {item.address}
            </li>
            <li>
              Phone: {item.phone}
            </li>
          </ul>
          <button className="defocus"></button>
          <button onClick={() => setEditMode([!editMode[0], !editMode[0] ? item._id : null])}>{editMode[0] && editMode[1] === item._id ? "Cancel Edit" : "Edit"}</button>
          <button onClick={() => deleteCustomer(item._id)}>Delete</button>
        </div>
        )}
      </div>

      <form className="customer-form" onSubmit={editMode[0] ? updateCustomer : postCustomer}>
        <label>Name
          <input type="text" onChange={e => setName(e.target.value)} required={!editMode[0]}></input>
        </label>

        <label>Email
          <input type="text" onChange={e => setEmail(e.target.value)} required={!editMode[0]}></input>
        </label>

        <label>Address
          <input type="text" onChange={e => setAddress(e.target.value)} required={!editMode[0]}></input>
        </label>

        <label>Phone
          <input type="number" onChange={e => setPhone(e.target.value)} required={!editMode[0]}></input>
        </label>
        
        <div className="button-container">
          <button type="submit">{editMode[0] ? "Edit Customer" : "Add Customer"}</button>
        </div>
      </form>
    </div>
  );
}

export default Customer;
