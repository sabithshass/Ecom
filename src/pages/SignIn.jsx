// import React, { useState } from "react";
// import axios from "axios";
// import { Show_Toast } from "../utils/Toast";
// import { Baseurl, login } from "../utils/BaseUrl";
// import { Link } from "react-router-dom";
// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//    const [loading, setLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({
//     email: "",
//     password: "",
//   });

//   const validateEmail = (email) => {
//     const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     return re.test(email);
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault(); 
//     setFormErrors({
//         email: "",
//         password: "",
//       });

//       if (!validateEmail(email)) {
//         setFormErrors((prev) => ({ ...prev, email: "Please enter a valid email address." }));
//         return;
//       }
  
//       if (password.length < 6) {
//         setFormErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters long." }));
//         return;
//       }
  
    

//     try {
//         setLoading(true)
//       const response = await axios.post(
//         `${Baseurl + login}`,
//         {
//           email: email,
//           password: password,
//         }
//       );
//       if(response.status===200){
//         console.log("fffffffff");
//         Show_Toast("knjnj",true)
//       }

//       const { token } = response.data;

//       localStorage.setItem("authToken", token);

//       console.log("Login successful:", response.data);
//     } catch (err) {
//       console.error("Login error:", err);
//       Show_Toast(err,false)
//     }finally{
//         setLoading(false)
//     }
//   };
//   return (
 

// <div>
//   <div className="container-fluid vh-100 p-0">
//     <div className="row h-100 d-flex align-items-center">
//       <div className="col-12 col-md-8 auth-form d-flex align-items-center justify-content-center">
//         <div className="form-content" >
//         <h3 className="form-title text-center pt-5" style={{ color: "#EDA415" }}>
//   Sign In to<br />Your Account
// </h3>
//           <form className="w-100 p-4" onSubmit={handleLogin}>
//             <div className="mb-3">
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//               />
//               {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
//             </div>
//             <div className="mb-3">
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//               {formErrors.password && <small className="text-danger">{formErrors.password}</small>}
//             </div>
//             <div className="d-flex justify-content-center p-3">
//             <Link to="/">Forgot Password?</Link>
//             </div>
            
//             <div className="d-flex justify-content-center pb-5">
//   <button
//     type="submit"
//     className="btn btn-warning submit-button w-50 rounded-pill"
//     disabled={loading}
//   >
//     {loading ? "Signing IN..." : "SIGN IN"}
    
//   </button>
// </div>
//           </form>
//         </div>
//       </div>
//       <div className="col-12 col-md-4 auth-panel left-panel text-center text-light d-flex align-items-center justify-content-center">
//         <div className="content" >
//           <h2>Hello Friend!</h2>
//           <p>Enter your Personal Details and</p>
//           <p>start your journey with us</p>
//           <Link
//     to="/"
//             className="btn btn-outline-light toggle-button  rounded-pill"
//           >
//             SIGN UP
//           </Link>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

    
//   );
// }

// export default SignIn;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Show_Toast } from "../utils/Toast";
import { Baseurl, login } from "../utils/BaseUrl";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    setFormErrors((prev) => ({
      ...prev,
      email: validateEmail(value) ? "" : "Please enter a valid email address.",
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);


    setFormErrors((prev) => ({
      ...prev,
      password: value.length >= 6 ? "" : "Password must be at least 6 characters long.",
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email)
      ? ""
      : "Please enter a valid email address.";
    const passwordError =
      password.length >= 6
        ? ""
        : "Password must be at least 6 characters long.";

    setFormErrors({ email: emailError, password: passwordError });

    if (emailError || passwordError) return;

    try {
      setLoading(true);
      const response = await axios.post(`${Baseurl + login}`, {
        email: email,
        password: password,
      });
console.log("responseresponseresponseresponse",response);

      if (response.status === 200) {
        Show_Toast("Login successful!", true);
        const  token  = response.data.data;
        
        localStorage.setItem("authToken", token);
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      Show_Toast(err.message, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container-fluid vh-100 p-0">
        <div className="row h-100 d-flex align-items-center">
          <div className="col-12 col-md-8 auth-form d-flex align-items-center justify-content-center">
            <div className="form-content">
              <h3
                className="form-title text-center pt-5"
                style={{ color: "#EDA415" }}
              >
                Sign In to<br />
                Your Account
              </h3>
              <form className="w-100 p-4" onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    value={email}
                  />
                  {formErrors.email && (
                    <small className="text-danger">{formErrors.email}</small>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                  />
                  {formErrors.password && (
                    <small className="text-danger">{formErrors.password}</small>
                  )}
                </div>
                <div className="d-flex justify-content-center p-3">
                  <Link to="/register">Forgot Password?</Link>
                </div>

                <div className="d-flex justify-content-center pb-5">
                  <button
                    type="submit"
                    className="btn btn-warning submit-button w-50 rounded-pill"
                    disabled={loading}
                  >
                    {loading ? "Signing IN..." : "SIGN IN"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-4 auth-panel left-panel text-center text-light d-flex align-items-center justify-content-center mt-3">
            <div className="content">
              <h2>Hello Friend!</h2>
              <p>Enter your Personal Details and</p>
              <p>start your journey with us</p>
              <Link
                to="/register"
                className="btn btn-outline-light toggle-button  rounded-pill"
              >
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>





  );
}

export default SignIn;
