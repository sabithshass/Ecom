import React, { useState } from 'react'
import { Baseurl, product } from '../utils/BaseUrl';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductDetail() {
const [products,setProducts]=useState()
const { id } = useParams();
  const fetchSingleProducts=async()=>{
    try{
        const response = await axios.get(`${Baseurl + product}`, {
            params: { id }, 
          });
        console.log("response",response);
        
        if (response.status === 200) {
            setProducts(response.data.data); 
        }
    }catch(error){
        console.log("error fetching products",error);
        
    }
}
console.log("product.product,product",products);

useEffect(()=>{
  fetchSingleProducts()
},[])
    // // Dummy product details (replace with API call or state later)
    // const product = {

    //   name: 'HP AMD Ryzen 3',
    //   price: '$529.99',
    //   stock: '34 in stock',
    //   ramOptions: ['4 GB', '8 GB', '16 GB'],
    //   image: '/ttt.jpg',
    // };
  return (
    <>
         <div className="container my-4 ">
      <div className="row ">
        <div className="col-md-6 ">
          <img src={`http://localhost:3002/${products?.image}`} className="img-fluid" style={{ height: '335px',width:"582px" }} alt={products?.title} />
          <div className="mt-3 d-flex">
            {/* Additional images if any */}
            <img src={`http://localhost:3002/${products?.image}`} className="img-thumbnail  me-2" style={{ height: '97px',width:"180px" }} alt="Thumbnail" />
            <img src={`http://localhost:3002/${products?.image}`} className="img-thumbnail " style={{ height: '77px',width:"180px"  }} alt="Thumbnail" />
          </div>
        </div>
        <div className="col-md-6">
          <h2 style={{color:"#003F62"}}>{products?.title}</h2>
          <p className="text-muted">${products?.variants[0]?.price}</p>
          <p>{products?.stock||0}</p>
          <h5>RAM:</h5>
          <div className="btn-group mb-3">
          {products?.variants.map((ram, index) => (
  <button key={index} className="btn btn-outline-primary">
    {ram.ram}
  </button>
))}
          </div>
          <div>
            <button className="btn btn-warning me-2">Edit Product</button>
            <button className="btn btn-warning">Buy It Now</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetail
