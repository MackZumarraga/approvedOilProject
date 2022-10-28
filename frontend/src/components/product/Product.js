import React, { useEffect, useState } from "react";
import './product.css';
import axios from 'axios';
import moment from 'moment';
import { types } from "./product-types";

function Product() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState(undefined);
  const [type, setType] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [expiration, setExpiration] = useState(undefined);

  const [editMode, setEditMode] = useState([false, null])

  const [forceRender, setForceRender] = useState(0);

  const fetchProducts = async () => {
    const response = await axios.get('/api/products/');
    return response.data
  }
  
  const postProduct = async () => {
    const newProduct = {
      name: name,
      type: type,
      price: price,
      expiration: expiration
    }

    try {
      const response = await axios.post('api/products/newProduct', newProduct);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };



  const updateProduct = async () => {
    const updatedProduct = {
      name: name,
      type: type,
      price: price,
      expiration: expiration
    }

    try {
      const response = await axios.patch(`api/products/updateProduct/${editMode[1]}`, updatedProduct);
      setForceRender(forceRender + 1);
      setEditMode([false, null]);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`api/products/deleteProduct/${productId}`);
      
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
    const getProducts = async () => {
      const allProducts = await fetchProducts();

      if (allProducts) {
        setProducts(allProducts);
      } 
    };
    
    getProducts();
  }, [forceRender])
  

  return (
    <div>
      <div className="data">
        {products.map((item) => 
        <div>
          <ul key={item._id}>
            <li>
              ID: {item._id}
            </li>
            <li>
              Name: {item.name}
            </li>
            <li>
              Type: {types[item.type]}
            </li>
            <li>
              Price: {item.price.$numberDecimal}
            </li>
            <li>
              Expiration Date: {moment(item.expiration).utc().format('YYYY-MM-DD')}
            </li>
          </ul>
          <button className="defocus"></button>
          <button onClick={() => setEditMode([!editMode[0], !editMode[0] ? item._id : null])}>{editMode[0] && editMode[1] === item._id ? "Cancel Edit" : "Edit"}</button>
          <button onClick={() => deleteProduct(item._id)}>Delete</button>
        </div>
        )}
      </div>

      <form className="product-form" onSubmit={editMode[0] ? updateProduct : postProduct}>
        <label>Name
          <input type="text" onChange={e => setName(e.target.value)}  required={!editMode[0]}></input>
        </label>

        <label>Type
          <select onChange={e => setType(e.target.value)} required={!editMode[0]}>
              <option value="" selected>Select a Type</option>
              {Object.entries(types).map(([k, v]) => 
                <option key={k} value={k}>{v}</option>
              )}
          </select>
          
        </label>

        <label>Price
          <input type="number" step="0.01" onChange={e => setPrice(e.target.value)} required={!editMode[0]}></input>
        </label>

        <label>Expiration Date
          <input type="date" min={new Date().toISOString().split("T")[0]} onChange={e => setExpiration(e.target.value)} required={!editMode[0]}></input>
        </label>
        
        <div className="button-container">
          <button type="submit">{editMode[0] ? "Edit Product" : "Add Product"}</button>
        </div>
      </form>
    </div>
  );
}

export default Product;
