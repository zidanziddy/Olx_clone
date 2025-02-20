import './Create.css';
import Header from '../Header/Header';
import { useContext, useEffect, useState } from 'react';
import { storage } from '../../firebase/config';
import FirebaseContext from '../../store/firebaseContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { AuthContext } from '../../store/firebaseContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useContext(AuthContext);
  const { db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  console.log("User inside Create:", user);

  useEffect(() => {
    console.log("User inside Create:", user);
  }, [user]);

  const uploadToDB = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to upload an image.");
      return;
    }

    if (!image) {
      alert("Please select an image first.");
      return;
    }

    try {
      // Generate unique image name using user ID and timestamp
      const imageRef = ref(storage, `images/${user.uid}-${Date.now()}-${image.name}`);
      
      // Upload image
      const snapshot = await uploadBytes(imageRef, image);
      
      // Get image URL
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);

      // Save product data to Firestore
      await addDoc(collection(db, "products"), {
        name,
        category,
        price,
        imageUrl: url, // Store only the single image URL
        user: user, // Save only user ID for security reasons
        createdAt: new Date().toISOString(),
      });

      console.log("Product uploaded successfully!");
      alert("Product added successfully!");
      navigate("/home");

    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Upload failed: " + error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="centerDiv">
        <form onSubmit={uploadToDB}>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input"
            type="text"
            id="category"
            name="category"
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            type="number"
            id="price"
            name="Price"
          />
          <br />
          <img
            alt="Preview"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          />
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button className="uploadBtn">Upload and Submit</button>
        </form>
      </div>
    </>
  );
};

export default Create;
