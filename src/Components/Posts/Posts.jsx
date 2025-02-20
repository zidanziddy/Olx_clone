import React, { useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { useEffect ,useContext} from 'react';
import { db } from '../../firebase/config';
import { collection,getDocs } from 'firebase/firestore';
import FirebaseContext, { AuthContext } from '../../store/firebaseContext';
import { useNavigate } from 'react-router-dom';
import { Product } from "../../store/ProductContext"; 



function Posts() {
  const [products,setProducts] = useState([])
const {user}=useContext(AuthContext)
const {db} = useContext(FirebaseContext)
const { setProductDetils } = useContext(Product);

const navigate = useNavigate();
 

  useEffect(()=>{

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products")); // 'products' is the Firestore collection name
        const productList = querySnapshot.docs.map(doc => ({
         ...doc.data(),
         id:doc.id
        }));
        setProducts(productList);
        console.log(productList);
        console.log('from above the detais',products);
        
        setProductDetils(products)
  
        
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

  },[])


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
{
  products.map((product)=>{
  return(
    <>
      
    <div
    className="card" 
    onClick={()=> {
      setProductDetils(product)
      navigate(`/viewpost`)}}
  >
    <div className="favorite">
      <Heart></Heart>
    </div>
    <div className="image">
      <img src={product.imageUrl} alt="" />
    </div>
    <div className="content">
      <p className="rate">&#x20B9; {product.price}</p>
      <span className="kilometer">{product.category}</span>
      <p className="name"> {product.name}</p>
    </div>
    <div className="date">
      <span>{product.createdAt}</span>
    </div>
  </div>
  </>


   )
  
  
 
    })
          
}

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
