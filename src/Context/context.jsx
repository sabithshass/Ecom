import { jwtDecode } from 'jwt-decode';
import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios"; 
import { Baseurl, category, favouritees, product, subcategory } from "../utils/BaseUrl"; 

export const ContextData = createContext();

const Context_Provider = ({ children }) => {
  const [categories, setcategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [fav,setFav]=useState([])
  const [page, setPage] = useState(1);
  const limit = 10;
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${Baseurl + category}`, {
        params: { page, limit },
      });

      if (response.status === 200) {
        setcategories(response.data.data.categories);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${Baseurl + product}`, {
        params: { page, limit },
      });

      if (response.status === 200) {
        setProducts(response.data.data.products);
      }
    } catch (error) {
      console.log("error fetching products", error);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get(`${Baseurl + subcategory}`, {
        params: { page, limit },
      });

      if (response.status === 200) {
        setSubcategories(response.data.data.sub_categories);
      }
    } catch (error) {
      console.log("error fetching products", error);
    }
  };

  const fetchFavourites=async()=>{
    try{

      
            const token = localStorage.getItem("authToken");
            const decodedToken = jwtDecode(token);
      
            const userId = decodedToken.id;
        const response = await axios.get(`${Baseurl + favouritees}`, {
            params: { userId }, 
          });
        console.log("llllllllllllll",response);
        
        if (response.status === 200) {
            setFav(response.data.data); 
        }
    }catch(error){
      
        
    }
}
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
    fetchSubCategory();
    fetchFavourites();
  }, []);
console.log("fav",fav);

  return (
    <ContextData.Provider
      value={{
        categories,
        fetchCategories,
        products,
        subcategories,
        fetchProducts,
        fetchSubCategory,
        fetchFavourites,
        fav
      }}
    >
      {children}
    </ContextData.Provider>
  );
};

export default Context_Provider;
