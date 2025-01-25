import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState,useContext } from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import "../style/style.css";
import { FaHeart } from "react-icons/fa";
import { Baseurl, favouritees } from "../utils/BaseUrl";
import axios from "axios";
import { ContextData } from '../Context/context';
function Header() {
  const {fetchFavourites,fav } = useContext(ContextData);
    const [isSideTabOpen, setIsSideTabOpen] = useState(false); 
  //  const [fav,setFav]=useState([])

  
    const toggleSideTab = () => {
      setIsSideTabOpen(!isSideTabOpen);
    };

  //   const fetchFavourites=async()=>{
  //     try{

        
  //             const token = localStorage.getItem("authToken");
  //             const decodedToken = jwtDecode(token);
        
  //             const userId = decodedToken.id;
  //         const response = await axios.get(`${Baseurl + favouritees}`, {
  //             params: { userId }, 
  //           });
          
  //         if (response.status === 200) {
  //             setFav(response.data.data); 
  //         }
  //     }catch(error){
        
          
  //     }
  // }


  useEffect(()=>{
    fetchFavourites()
  },[])

  return (



    <>
    <div>
      <Navbar expand="lg" className="mb-4" style={{ background: "#003F62" }}>
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="custom-toggler"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form
              className="mx-auto d-flex pt-2"
              style={{ maxWidth: "500px", flex: 1, justifyContent: "center" }}
            >
              <Form.Control
                type="search"
                placeholder="Search anything"
                className="me-2"
              />
              <Button variant="warning">Search</Button>
            </Form>

            <Nav className="ms-auto">
            <Nav.Link href="#" onClick={toggleSideTab} style={{ color: "white" }}>
                <FaHeart /> 
              </Nav.Link>
              <Nav.Link href="login" style={{ color: "white" }}>
                Sign in
              </Nav.Link>
              <Nav.Link href="#" style={{ color: "white" }}>
                <i className="bi bi-cart-fill"></i> Cart
              </Nav.Link>
       
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>



    {isSideTabOpen && (
  <div
    className="side-tab-overlay"
    onClick={toggleSideTab} 
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    }}
  >
    <div
      className="side-tab"
      onClick={(e) => e.stopPropagation()} 
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: "300px",
        backgroundColor: "#fff",
        zIndex: 1001,
        overflowY: "auto",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="side-tab-content">
        <h4>Items</h4>
        {fav?.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "16px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "16px",
            }}
          >

            <div style={{ flex: "0 0 80px", marginRight: "16px" }}>
              <img
                src={`http://localhost:3002/${item?.product?.image}`}
                alt={item?.product?.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>

            <div style={{ flex: "1" }}>
              <h4
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "16px",
                  color: "#003366",
                }}
              >
                {item?.product?.title}
              </h4>
              <p
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "14px",
                  color: "#333",
                }}
              >
                ${item?.product?.price?.toFixed(2)}
              </p>
              <div style={{ display: "flex", gap: "2px" }}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color:
                          i < item?.product?.rating
                            ? "#ffcc00"
                            : "#ccc",
                        fontSize: "16px",
                      }}
                    >
                      ★
                    </span>
                  ))}
              </div>
            </div>

            <button
              onClick={() => handleRemoveItem(index)}
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                color: "#333",
                cursor: "pointer",
                marginLeft: "16px",
              }}
            >
              ✖
            </button>
          </div>
        ))}

      </div>
    </div>
  </div>
)}



  </>
  );
}

export default Header;

