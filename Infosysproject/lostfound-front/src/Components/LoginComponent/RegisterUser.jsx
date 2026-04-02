// import React, { useState,useEffect } from "react";
// import {useNavigate} from 'react-router-dom';
// import {registerNewUser} from "../../Services/LoginService";
// import '../../DisplayView.css';
// import "../../theme.css";
//  const RegisterUser=()=>{

//     const [lostFoundUser,setLostFoundUser] = useState({
//         username:"",
//         password: "",
//         personalName:"",
//         email:"",
//         role:"",
//     });
//   const [flag,setFlag]=useState(false);
//   const [confirmPassword,setConfirmPassword]=useState("");
//   let navigate = useNavigate();
//   const [errors, setErrors] = useState({});
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 

//   const createNewUser = (event) => {
//     event.preventDefault();
//        if(lostFoundUser.password===confirmPassword){
//          registerNewUser(lostFoundUser).then((response)=>{
//           setFlag(true);
//          });
//     }
//  };
//  useEffect(() => {
//   setFlag(false);
// }, []);

// const  onChangeHandler = (event) =>{
//     event.persist();
//     setFlag(false);
//     const name = event.target.name;
//         const value = event.target.value;
//        setLostFoundUser(values =>({...values, [name]: value }));
//    };
 
//    const returnBack=()=>{
//     navigate('/');
//    }
//  const handleValidation = (event) => {
//     event.preventDefault();
//     let tempErrors = {};
//     let isValid = true;
 
//     if (!lostFoundUser.username.trim()) {
//       tempErrors.username = "User Name is required";
//       isValid = false;
//     }
 
//     if (!lostFoundUser.password.trim()) {
//       tempErrors.password = "Password is required";
//       isValid = false;
//     }
//     else if (lostFoundUser.password.length < 5 || lostFoundUser.passwordlength > 10) {
//        tempErrors.password="Password must be 5-10 characters long";
//       isValid = false;
//     }
//     else if (lostFoundUser.password!==confirmPassword) {
//       tempErrors.password="Both the passwords are not matched";
//      isValid = false;
//    }
 
//   if (!lostFoundUser.personalName.trim()) {
//         tempErrors.personalName = "Personal Name is required";
//         isValid = false;
//     }
// if (!lostFoundUser.email.trim()) {
//         tempErrors.email = "Email is required";
//         isValid = false;
//       }
//       else if(!emailPattern.test(lostFoundUser.email)){
//         tempErrors.email = "Invalid Email Format";
//         isValid = false;
//       }
//     if (!lostFoundUser.role.trim()) {
//         tempErrors.role = "Role is required";
//         isValid = false;
//       }
//       if (!confirmPassword.trim()) {
//         tempErrors.confirmPassword = "Confirm Password is required";
//         isValid = false;
//       }
 
//    setErrors(tempErrors);
//     if (isValid) {
//         createNewUser(event);
//     }
//   };
//  return (
//   <div className="theme-bg">

//     <div className="theme-card">

//       <h2 className="text-center mb-4">
//         Create Account ✨
//       </h2>

//       <form>

//         <div className="mb-3">
//           <label className="fw-semibold">Username</label>
//           <input
//             placeholder="Enter username"
//             name="username"
//             className="form-control"
//             value={lostFoundUser.username}
//             onChange={onChangeHandler}
//           />
//           {errors.username && (
//             <small className="text-warning">{errors.username}</small>
//           )}
//         </div>

//         <div className="mb-3">
//           <label className="fw-semibold">Password</label>
//           <input
//             type="password"
//             placeholder="Create password"
//             name="password"
//             className="form-control"
//             value={lostFoundUser.password}
//             onChange={onChangeHandler}
//           />
//           {errors.password && (
//             <small className="text-warning">{errors.password}</small>
//           )}
//         </div>

//         <div className="mb-3">
//           <label className="fw-semibold">Confirm Password</label>
//           <input
//             type="password"
//             placeholder="Re-enter password"
//             name="confirmPassword"
//             className="form-control"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           {errors.confirmPassword && (
//             <small className="text-warning">{errors.confirmPassword}</small>
//           )}
//         </div>

//         <div className="mb-3">
//           <label className="fw-semibold">Personal Name</label>
//           <input
//             placeholder="Enter your name"
//             name="personalName"
//             className="form-control"
//             value={lostFoundUser.personalName}
//             onChange={onChangeHandler}
//           />
//           {errors.personalName && (
//             <small className="text-warning">{errors.personalName}</small>
//           )}
//         </div>

//         <div className="mb-3">
//           <label className="fw-semibold">Email</label>
//           <input
//             placeholder="Enter email"
//             name="email"
//             className="form-control"
//             value={lostFoundUser.email}
//             onChange={onChangeHandler}
//           />
//           {errors.email && (
//             <small className="text-warning">{errors.email}</small>
//           )}
//         </div>

//         <div className="mb-4">
//           <label className="fw-semibold">Select Role</label>
//           <select
//             name="role"
//             className="form-control"
//             value={lostFoundUser.role}
//             onChange={onChangeHandler}
//           >
//             <option value="">Select Role</option>
//             <option value="Student">Student</option>
//             <option value="Admin">Admin</option>
//           </select>
//           {errors.role && (
//             <small className="text-warning">{errors.role}</small>
//           )}
//         </div>

//         <button
//           type="button"
//           className="theme-btn w-100"
//           onClick={handleValidation}
//         >
//           Register
//         </button>

//       </form>

//       {flag && (
//         <div className="text-center mt-4">
//           <p className="text-success fw-semibold">
//             Account Created Successfully 🎉
//           </p>
//           <button
//             className="secondary-btn w-100 mt-2"
//             onClick={returnBack}
//           >
//             Go To Login
//           </button>
//         </div>
//       )}

//     </div>

//   </div>
// );
//  }
//  export default RegisterUser;






import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";
import "../../DisplayView.css";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [lostFoundUser, setLostFoundUser] = useState({
    username: "",
    password: "",
    personalName: "",
    email: "",
    role: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setFlag(false);
  }, []);

  const onChangeHandler = (event) => {
    event.persist();
    setFlag(false);
    const { name, value } = event.target;
    setLostFoundUser((prev) => ({ ...prev, [name]: value }));
  };

  const createNewUser = (event) => {
    event.preventDefault();
    if (lostFoundUser.password === confirmPassword) {
      registerNewUser(lostFoundUser)
        .then(() => setFlag(true))
        .catch(() =>
          setErrors((prev) => ({
            ...prev,
            submit: "Registration failed. Please check the backend and try again.",
          }))
        );
    }
  };

  const handleValidation = (event) => {
    event.preventDefault();
    let tempErrors = {};
    let isValid = true;

    if (!lostFoundUser.username.trim()) {
      tempErrors.username = "Username is required";
      isValid = false;
    }
    if (!lostFoundUser.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (
      lostFoundUser.password.length < 5 ||
      lostFoundUser.password.length > 10
    ) {
      tempErrors.password = "Password must be 5–10 characters";
      isValid = false;
    } else if (lostFoundUser.password !== confirmPassword) {
      tempErrors.password = "Passwords do not match";
      isValid = false;
    }
    if (!lostFoundUser.personalName.trim()) {
      tempErrors.personalName = "Full name is required";
      isValid = false;
    }
    if (!lostFoundUser.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(lostFoundUser.email)) {
      tempErrors.email = "Invalid email format";
      isValid = false;
    }
    if (!lostFoundUser.role.trim()) {
      tempErrors.role = "Role is required";
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      tempErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    }

    setErrors(tempErrors);
    if (isValid) createNewUser(event);
  };

  return (
    <div className="form-wrapper">
      <div className="form-card">

        {/* ── Title ── */}
        <h2 className="form-title">🚀 Create New Account</h2>

        <form onSubmit={handleValidation}>

          {/* Username */}
          <div className="form-group-modern">
            <label className="input-label">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              name="username"
              value={lostFoundUser.username}
              onChange={onChangeHandler}
              className="modern-input"
            />
            {errors.username && (
              <small className="error-text">{errors.username}</small>
            )}
          </div>

          {/* Password */}
          <div className="form-group-modern">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="5–10 characters"
              name="password"
              value={lostFoundUser.password}
              onChange={onChangeHandler}
              className="modern-input"
            />
            {errors.password && (
              <small className="error-text">{errors.password}</small>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group-modern">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="modern-input"
            />
            {errors.confirmPassword && (
              <small className="error-text">{errors.confirmPassword}</small>
            )}
          </div>

          {/* Full Name */}
          <div className="form-group-modern">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              name="personalName"
              value={lostFoundUser.personalName}
              onChange={onChangeHandler}
              className="modern-input"
            />
            {errors.personalName && (
              <small className="error-text">{errors.personalName}</small>
            )}
          </div>

          {/* Email */}
          <div className="form-group-modern">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              placeholder="you@university.edu"
              name="email"
              value={lostFoundUser.email}
              onChange={onChangeHandler}
              className="modern-input"
            />
            {errors.email && (
              <small className="error-text">{errors.email}</small>
            )}
          </div>

          {/* Role */}
          <div className="form-group-modern">
            <label className="input-label">Role</label>
            <input
              list="role-types"
              placeholder="Select a role"
              name="role"
              value={lostFoundUser.role}
              onChange={onChangeHandler}
              className="modern-input"
            />
            <datalist id="role-types">
              <option value="Student" />
              <option value="Admin" />
            </datalist>
            {errors.role && (
              <small className="error-text">{errors.role}</small>
            )}
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/")}
            >
              ← Back to Login
            </button>
            <button type="submit" className="modern-btn">
              Register →
            </button>
          </div>

        </form>

        {/* ── Feedback ── */}
        {errors.submit && (
          <p className="error-text center" style={{ marginTop: "16px" }}>
            ✕ {errors.submit}
          </p>
        )}

        {flag && (
          <div className="success-box">
            ✅ Account created successfully!&nbsp;
            <button
              className="register-btn-modern"
              onClick={() => navigate("/")}
            >
              Go to Login →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegisterUser;
