import React, { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Product } from "../../store/ProductContext";
import "./View.css";
import FirebaseContext from "../../store/firebaseContext";

function View() {
  const { productDetils } = useContext(Product);
  const [userDetails, setUserDetails] = useState(null);
  const { db } = useContext(FirebaseContext);

  console.log(productDetils);
  
  // Ensure safe destructuring
  const userId = productDetils?.user?.id; 

  useEffect(() => {
    if (!db || !userId) return; // Prevent unnecessary fetch

    const fetchUserDetails = async () => {
      try {
        const q = query(collection(db, "users"), where("id", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setUserDetails(querySnapshot.docs[0].data()); // Get first document
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [db, userId]); // Added dependencies

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={productDetils?.imageUrl} alt="Product" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{productDetils?.price}</p>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.name || "N/A"}</p>
          <p>{userDetails?.email || "N/A"}</p>
          <p>{userDetails?.phone || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
