// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../../DisplayView.css";
// import { getUserId } from "../../Services/LoginService";
// import { generateFoundId, saveFoundItem } from "../../Services/FoundItemService";

// const FoundItemRegistration = () => {

//   let navigate = useNavigate();
//   const [flag, setFlag] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [newId, setNewId] = useState('');
// let [fdate,setFdate]=useState(new Date());
//   const [userId, setUserId] = useState("");

//   const [foundItem, setFoundItem] = useState({
//     foundItemId: "",
//     foundItemName: "",
//     color: "",
//     brand: "",
//     category: "",
//     location: "",
//     username: "",
//     foundDate: "",
//     status: false
//   });


//   const setFoundItemId = () => {
//     generateFoundId().then(response => {
//       setNewId(response.data);
//     });
//   };

  
//   const setUsername = () => {
//     getUserId().then(response => {
//       setUserId(response.data);
//     });
//   };

//   useEffect(() => {
//     setFoundItemId();
//     setUsername();
//     setFlag(false);
//   }, []);


//   const onChangeHandler = (event) => {
//     setFlag(false);
//     const { name, value } = event.target;

//     setFoundItem(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

  
//   const foundItemSubmit = () => {

//     const updatedFoundItem = {
//       ...foundItem,
//       foundItemId: newId,
//       username: userId,
//       foundDate: fdate
//     };

//     saveFoundItem(updatedFoundItem).then(() => {
//       setFlag(true);

//       setFoundItem({
//         foundItemId: "",
//         foundItemName: "",
//         color: "",
//         brand: "",
//         category: "",
//         location: "",
//         username: "",
//         foundDate: "",
//         status: false
//       });
//     });
//   };


//   const handleValidation = (event) => {

//     event.preventDefault();
//     let tempErrors = {};
//     let isValid = true;

//     if (!foundItem.foundItemName.trim()) {
//       tempErrors.foundItemName = "Item Name is required";
//       isValid = false;
//     }

//     if (!foundItem.color.trim()) {
//       tempErrors.color = "Item color is required";
//       isValid = false;
//     }

//     if (!foundItem.brand.trim()) {
//       tempErrors.brand = "Item brand is required";
//       isValid = false;
//     }

//     if (!foundItem.category.trim()) {
//       tempErrors.category = "Item category is required";
//       isValid = false;
//     }

//     if (!foundItem.location.trim()) {
//       tempErrors.location = "Found Location is required";
//       isValid = false;
//     }

//     setErrors(tempErrors);

//     if (isValid) {
//       foundItemSubmit();
//     }
//   };

//   const returnBack = () => {
//     navigate("/student-menu");
//   };

//   const nextItem = () => {
//     navigate("/found-entry");
//   };

//   return (
//     <div>
//       <br />
//       <div className="container">
//         <div className="row">
//           <div className="card col-md-6 offset-md-3">
//             <div className="login-box">

//               <h2 className="text-center">
//                 <u>Found Item Form Submission</u>
//               </h2>

//               <form onSubmit={handleValidation}>

//                 <div className="form-group">
//                   <label>Item Id:</label>
//                   <input
//                     className="form-control"
//                     value={newId}
//                     readOnly
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Found Item Name:</label>
//                   <input
//                     name="foundItemName"
//                     className="form-control"
//                     value={foundItem.foundItemName}
//                     onChange={onChangeHandler}
//                   />
//                   {errors.foundItemName && (
//                     <p style={{ color: "red" }}>{errors.foundItemName}</p>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label>Item Category:</label>
//                   <input
//                     name="category"
//                     className="form-control"
//                     value={foundItem.category}
//                     onChange={onChangeHandler}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Item Color:</label>
//                   <input
//                     name="color"
//                     className="form-control"
//                     value={foundItem.color}
//                     onChange={onChangeHandler}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Item Brand:</label>
//                   <input
//                     name="brand"
//                     className="form-control"
//                     value={foundItem.brand}
//                     onChange={onChangeHandler}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Location of Found Item:</label>
//                   <input
//                     name="location"
//                     className="form-control"
//                     value={foundItem.location}
//                     onChange={onChangeHandler}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Select Found Date:</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     onChange={(e) => setFdate(e.target.value)}
//                   />
//                 </div>

//                 <br />

//                 <button type="submit" className="btn btn-primary" disabled={flag}>
//                   Submit
//                 </button>

//                 &nbsp;&nbsp;

//                 <button type="button" className="btn btn-success" onClick={returnBack}>
//                   Return
//                 </button>

//               </form>

//               {flag && (
//                 <p style={{ color: "blue" }}>
//                   Found Item Form Submitted.....
//                   <button className="btn btn-warning ms-3" onClick={nextItem}>
//                     New Form Submission
//                   </button>
//                 </p>
//               )}

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FoundItemRegistration;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../DisplayView.css";
import { getUserId } from "../../Services/LoginService";
import { generateId, saveFoundItem } from "../../Services/FoundItemService";

const FoundItemRegistration = () => {

  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);
  const [errors, setErrors] = useState({});
  const [newId, setNewId] = useState("");
  let [fdate,setFdate]=useState(new Date());
  const [userId, setUserId] = useState("");

  const [foundItem, setFoundItem] = useState({
    foundItemId: "",
    foundItemName: "",
    color: "",
    brand: "",
    category: "",
    location: "",
    username: "",
    foundDate: "",
    status: false,
  });

  useEffect(() => {
    generateId().then(res => setNewId(res.data));
    getUserId().then(res => setUserId(res.data));
  }, []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFoundItem(prev => ({ ...prev, [name]: value }));
    setFlag(false);
  };

  const handleValidation = (event) => {
    event.preventDefault();

    let tempErrors = {};
    let isValid = true;

    if (!foundItem.foundItemName.trim()) {
      tempErrors.foundItemName = "Item Name is required";
      isValid = false;
    }

    if (!foundItem.category.trim()) {
      tempErrors.category = "Item category is required";
      isValid = false;
    }

    if (!foundItem.color.trim()) {
      tempErrors.color = "Item color is required";
      isValid = false;
    }

    if (!foundItem.brand.trim()) {
      tempErrors.brand = "Item brand is required";
      isValid = false;
    }

    if (!foundItem.location.trim()) {
      tempErrors.location = "Found location is required";
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      const finalItem = {
        ...foundItem,
        foundItemId: newId,
        username: userId,
        foundDate: fdate,
      };

      saveFoundItem(finalItem).then(() => {
        setFlag(true);
      });
    }
  };

  const clearAll = () => {
    setFoundItem({
      foundItemId: "",
      foundItemName: "",
      color: "",
      brand: "",
      category: "",
      location: "",
      username: "",
      foundDate: "",
      status: false,
    });
    setFdate("");
    setFlag(false);
  };

  return (
    <div className="form-wrapper">

      <div className="form-card">

        <h2 className="form-title">
          Found Item Form Submission
        </h2>

        <form onSubmit={handleValidation}>

          <div className="form-group-modern">
            <label>Item ID</label>
            <input className="modern-input" value={newId} readOnly />
          </div>

          <div className="form-group-modern">
            <label>Found Item Name</label>
            <input
              name="foundItemName"
              className="modern-input"
              value={foundItem.foundItemName}
              onChange={onChangeHandler}
            />
            {errors.foundItemName && <p className="error-text">{errors.foundItemName}</p>}
          </div>

          <div className="form-group-modern">
            <label>Category</label>
            <input
              name="category"
              className="modern-input"
              value={foundItem.category}
              onChange={onChangeHandler}
            />
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>

          <div className="form-group-modern">
            <label>Color</label>
            <input
              name="color"
              className="modern-input"
              value={foundItem.color}
              onChange={onChangeHandler}
            />
            {errors.color && <p className="error-text">{errors.color}</p>}
          </div>

          <div className="form-group-modern">
            <label>Brand</label>
            <input
              name="brand"
              className="modern-input"
              value={foundItem.brand}
              onChange={onChangeHandler}
            />
            {errors.brand && <p className="error-text">{errors.brand}</p>}
          </div>

          <div className="form-group-modern">
            <label>Location</label>
            <input
              name="location"
              className="modern-input"
              value={foundItem.location}
              onChange={onChangeHandler}
            />
            {errors.location && <p className="error-text">{errors.location}</p>}
          </div>

          <div className="form-group-modern">
            <label>Found Date</label>
            <input
              type="date"
              className="modern-input"
              value={fdate}
              onChange={(e) => setFdate(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="primary-btn">Submit</button>
            <button type="button" className="secondary-btn" onClick={clearAll}>Clear</button>
            <button type="button" className="secondary-btn" onClick={() => navigate("/student-menu")}>
              Return
            </button>
          </div>

        </form>

        {flag && (
          <div className="success-box">
            Found Item Submitted Successfully!
          </div>
        )}

      </div>
    </div>
  );
};

export default FoundItemRegistration;