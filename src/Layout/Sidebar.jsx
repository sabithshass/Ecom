import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { ContextData } from "../Context/context";

function Sidebar() {
  const { categories } = useContext(ContextData);
  const [showCategories, setShowCategories] = useState(false);  
  const [expandedCategory, setExpandedCategory] = useState(null); 

  const handleCategoryClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const handleToggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div>
      <div className="p-5">
        <h5 className="mb-4" style={{color:"#003F62", fontSize: "16px" }}>Categories</h5>
        <h5
          onClick={handleToggleCategories}
          style={{
            marginBottom: "10px",
            padding: "5px 10px",
            cursor: "pointer",
            fontSize: "15px" 
          }}
        >
          {showCategories ? "Hide Categories" : "All Categories"}
        </h5>
        {showCategories && (
          <ul className="list-unstyled">
            {categories?.map((category, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: "5px 0",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  onClick={() => handleCategoryClick(index)}
                >
                  <p  style={{ fontSize: "14px" }}>{category.name}</p>
  
                  <span
                    style={{
                      display: "inline-block",
                      width: "10px",
                      height: "10px",
                      borderLeft: "1px solid black",
                      borderBottom: "1px solid black",
                      transform:
                        expandedCategory === index
                          ? "rotate(-45deg)"
                          : "rotate(-135deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </div>

                {expandedCategory === index &&
                  category?.subCategories?.map((subcategory, subIndex) => (
                    <div
                      key={subIndex}
                      style={{
                        marginLeft: "20px",
                        marginBottom: "5px",
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                     <Form.Check
  type="checkbox"
  label={subcategory.name}
  style={{ fontSize: "12px" }} 
/>
                    </div>
                  ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Sidebar;

