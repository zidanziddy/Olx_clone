import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import FirebaseContext, { AuthContext } from './store/firebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth } from './firebase/config';
import Create from './Components/Create/Create';
import ViewPost from './Pages/ViewPost'
import {Postcontext} from './store/ProductContext'

function App() {
  const { db } = useContext(FirebaseContext); // Get Firestore instance
  const [details, setDetails] = useState(null); // Local state for user details (if needed)
  const { setUser ,user} = useContext(AuthContext); // Get setUser from AuthContext

  const fetchUserData = async () => {
    // Subscribe to authentication state changes
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // If a user is logged in, fetch their data from Firestore
        const docRef = doc(db, 'users', user.uid); // Reference to the user's document
        const snapShot = await getDoc(docRef);

        if (snapShot.exists()) {
          const userData = snapShot.data();
          console.log('User Data:', userData); // Log user data
          setUser(userData); // Update context with user data
          setDetails(userData); // Update local state (if needed)
         
          
        } else {
          console.log('No additional user data found in Firestore.');
          setUser(null); // Clear user context if no data exists
          setDetails(null); // Clear local state
        }
      } else {
        // If no user is logged in
        console.log('No user is currently logged in.');
        setUser(null); // Clear user context
        setDetails(null); // Clear local state
      }
    });
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
    <Postcontext>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/create' element={<Create />}/>
          <Route path='/viewpost' element={<ViewPost />}/>
        </Routes>
      </BrowserRouter>
      </Postcontext>
     
    </>
  );
}

export default App;