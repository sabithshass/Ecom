import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Modal,
  Pagination,
} from "react-bootstrap";
import { ContextData } from "../Context/context";
import {
  Baseurl,
  category,
  favouritees,
  product,
  subcategory,
} from "../utils/BaseUrl";
import axios from "axios";
import { Show_Toast } from "../utils/Toast";

function Listing() {
  const {
    categories,
    products,
    subcategories,
    fetchProducts,
    fetchSubCategory,
    fetchCategories,
    fetchFavourites,
  } = useContext(ContextData);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [showAddSubcategoryModal, setShowAddSubcategoryModal] = useState(false);
  const [subcategoryTitle, setSubcategoryTitle] = useState("");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [addProductData, setAddProductData] = useState({
    title: "",
    variants: [{ ram: "", price: "", qty: "" }],
    subCategory: "",
    description: "",
    image: [],
  });

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(`${Baseurl + category}`, {
        name: categoryTitle,
      });

      if (response.status === 200) {
        Show_Toast(response.data.message, true);
        setCategoryTitle("");
        setShowAddCategoryModal(false);
        fetchCategories();
        fetchSubCategory();
        fetchProducts();
      }
    } catch (error) {
      Show_Toast("Cannot Add Category", false);
    }
  };

  const handleAddSubcategory = async () => {
    try {
      const response = await axios.post(`${Baseurl + subcategory}`, {
        name: subcategoryTitle,
        category: selectedCategoryId,
      });

      if (response.status === 200) {
        Show_Toast(response.data.message, true);
        setSubcategoryTitle("");
        setSelectedCategoryId("");
        setShowAddSubcategoryModal(false);
        fetchCategories();
        fetchSubCategory();
        fetchProducts();
      }
    } catch (error) {
      Show_Toast("Cannot Add Subcategory", false);
    }
  };

  const updateVariant = (index, field, value) => {
    const updatedVariants = [...addProductData.variants];
    updatedVariants[index][field] = value;
    setAddProductData({
      ...addProductData,
      variants: updatedVariants,
    });
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      if (addProductData.image && addProductData.image.length > 0) {
        addProductData.image.forEach((file) => {
          formData.append("image", file);
        });
      }

      formData.append("title", addProductData.title);
      formData.append("description", addProductData.description);
      formData.append("subCategory", addProductData.subCategory);
      formData.append("variants", JSON.stringify(addProductData.variants));
      const response = await axios.post(`${Baseurl + product}`, formData);
      if (response.status === 200) {
        Show_Toast(response.data.message, true);
        setShowAddProductModal(false);
        fetchCategories();
        fetchSubCategory();
        fetchProducts();
      }
    } catch (error) {
      Show_Toast("Cannot Add Product", false);
    }
  };

  const favourite = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);

      const userId = decodedToken.id;

      const data = await axios.post(`${Baseurl + favouritees}`, {
        userId: userId,
        productId: productId,
      });

      if (data.status === 200) {
        Show_Toast(data.data.message, true);
        fetchCategories();
        fetchSubCategory();
        fetchProducts();
        fetchFavourites();
      }
    } catch (error) {}
  };

  return (
    <>
      <Container fluid className="mt-4">
        <Row>
          <div className="p-4 ">
            {/* <Row className="mb-3">
              <Col className="d-flex justify-content-end ">
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => setShowAddCategoryModal(true)}
                >
                  Add Category
                </Button>
                <Button variant="warning" className="me-2" onClick={() => setShowAddSubcategoryModal(true)}>
                  Add SubCategory
                </Button>
                <Button 
                variant="warning"
                onClick={() => setShowAddProductModal(true)}>Add Product
                
                </Button>
              </Col>
            </Row> */}
            <Row className="mb-3">
              <Col className="d-flex justify-content-end flex-wrap flex-md-nowrap">
                <Button
                  variant="warning"
                  className="me-2 mb-2 mb-md-0"
                  onClick={() => setShowAddCategoryModal(true)}
                >
                  Add Category
                </Button>
                <Button
                  variant="warning"
                  className="me-2 mb-2 mb-md-0"
                  onClick={() => setShowAddSubcategoryModal(true)}
                >
                  Add SubCategory
                </Button>
                <Button
                  variant="warning"
                  className="me-2 mb-2 mb-md-0"
                  onClick={() => setShowAddProductModal(true)}
                >
                  Add Product
                </Button>
              </Col>
            </Row>
            <Row>
              {products.map((product, index) => (
                <Col md={4} sm={6} className="mb-4" key={index}>
                  <Card style={{ position: "relative", height: "268px" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                        width: "30px",
                        height: "30px",
                        backgroundColor: "#B3D4E5",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1,
                      }}
                      onClick={() => favourite(product._id)}
                    >
                      <FaHeart style={{ color: "white", fontSize: "18px" }} />
                    </div>

                    <Link to={`details/${product._id}`}>
                      <Card.Img
                        variant="top"
                        style={{
                          width: "130px",
                          height: "160px",
                          objectFit: "cover",
                          display: "block",
                          margin: "auto",
                          paddingTop: "60px",
                        }}
                        className=""
                        src={`http://localhost:3002/${product.image}`}
                        alt="Product"
                      />
                    </Link>

                    <Card.Body>
                      <Card.Title
                        style={{
                          fontSize: "17px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          color: "#003F62",
                        }}
                      >
                        {product.title}
                      </Card.Title>
                      <Card.Text style={{ fontSize: "17px" }}>
                        $ {product?.variants?.[0]?.price}
                      </Card.Text>
                      <div
                        style={{
                          fontSize: "15px",
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                          marginTop: "-13px",
                        }}
                      >
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <span
                              key={i}
                              style={{
                                color:
                                  i < (product?.rating || 0)
                                    ? "#ffcc00"
                                    : "#ccc",
                                fontSize: "17px",
                              }}
                            >
                              ★
                            </span>
                          ))}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Row>

        
      </Container>

      <Modal show={showAddCategoryModal} centered>
        <Modal.Body>
          <Modal.Title className="w-100 text-center p-3">
            Add Category
          </Modal.Title>
          <Form className="d-flex flex-column align-items-center">
            <Form.Group className="w-50 mb-3">
              <Form.Control
                type="text"
                placeholder="Enter category title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="d-flex justify-content-center">
            <div className="m-2 w-20">
              <Button
                variant="warning"
                onClick={handleAddCategory}
                className="w-100"
              >
                Add
              </Button>
            </div>
            <div className="m-2 w-20">
              <Button
                variant="secondary"
                onClick={() => setShowAddCategoryModal(false)}
                className="w-100"
              >
                Discard
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showAddSubcategoryModal}
        onHide={() => setShowAddSubcategoryModal(false)}
        centered
      >
        <Modal.Body className="d-flex flex-column align-items-center justify-content-center">
          <h5 className="text-center mb-4">Add Subcategory</h5>{" "}
          {/* Replacing Modal.Header Title */}
          <Form className="w-75">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Enter subcategory title"
                value={subcategoryTitle}
                onChange={(e) => setSubcategoryTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                as="select"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option>Select category</option>
                {categories.map((item, idx) => (
                  <option key={idx} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Buttons */}
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="warning"
                onClick={handleAddSubcategory}
                className="me-2"
              >
                Add
              </Button>

              <Button
                variant="secondary"
                onClick={() => setShowAddSubcategoryModal(false)}
              >
                Discard
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showAddProductModal}
        onHide={() => setShowAddProductModal(false)}
        centered
        dialogClassName="modal-center-custom"
      >
        <Modal.Body
          style={{
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
          }}
        >
          <h5 className="text-center mb-4">Add Product</h5>

          <Form>
            <Row className="align-items-center mb-3">
              <Col md={4}>
                <Form.Label>Title:</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={addProductData.title}
                  onChange={(e) =>
                    setAddProductData({
                      ...addProductData,
                      title: e.target.value,
                    })
                  }
                  className="form-control-sm"
                />
              </Col>
            </Row>

            <Form.Label>Variants:</Form.Label>
            {addProductData.variants.map((variant, index) => (
              <Row key={index} className="align-items-center mb-2">
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="RAM"
                    value={variant.ram}
                    onChange={(e) =>
                      updateVariant(index, "ram", e.target.value)
                    }
                    className="form-control-sm"
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="Price"
                    value={variant.price}
                    onChange={(e) =>
                      updateVariant(index, "price", e.target.value)
                    }
                    className="form-control-sm"
                  />
                </Col>
                <Col md={4}>
                  <Form.Control
                    type="number"
                    placeholder="Qty"
                    value={variant.qty}
                    onChange={(e) =>
                      updateVariant(index, "qty", e.target.value)
                    }
                    className="form-control-sm"
                  />
                </Col>
              </Row>
            ))}
            <Button
              variant="outline-secondary"
              onClick={() =>
                setAddProductData({
                  ...addProductData,
                  variants: [
                    ...addProductData.variants,
                    { ram: "", price: "", qty: "" },
                  ],
                })
              }
              className="btn-sm mb-3"
            >
              Add Variant
            </Button>

            <Row className="align-items-center mt-3 mb-3">
              <Col md={4}>
                <Form.Label>Subcategory:</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  as="select"
                  value={addProductData.subCategory}
                  onChange={(e) =>
                    setAddProductData({
                      ...addProductData,
                      subCategory: e.target.value,
                    })
                  }
                  className="form-control-sm"
                >
                  <option>Select subcategory</option>
                  {subcategories.map((itm, idx) => (
                    <option key={idx} value={itm._id}>
                      {itm.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={4}>
                <Form.Label>Description:</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Enter description"
                  value={addProductData.description}
                  onChange={(e) =>
                    setAddProductData({
                      ...addProductData,
                      description: e.target.value,
                    })
                  }
                  className="form-control-sm"
                />
              </Col>
            </Row>

            <Row className="align-items-center mb-3">
              <Col md={4}>
                <Form.Label>Upload Image:</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    setAddProductData((prevState) => ({
                      ...prevState,
                      image: [...prevState.image, ...files],
                    }));
                  }}
                  className="form-control-sm"
                />
                <div className="mt-3 d-flex gap-2 flex-wrap">
                  {addProductData.image.length > 0 &&
                    Array.from(addProductData.image).map((img, index) => {
                      return (
                        <img
                          key={index}
                          src={URL.createObjectURL(img)}
                          alt="preview"
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                          }}
                        />
                      );
                    })}
                </div>
              </Col>
            </Row>

            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="secondary"
                className="btn-sm me-2"
                onClick={() => setShowAddProductModal(false)}
              >
                Discard
              </Button>
              <Button
                variant="warning"
                className="btn-sm"
                onClick={handleAddProduct}
              >
                Add
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Listing;
