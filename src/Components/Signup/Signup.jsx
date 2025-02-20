import { useState, useContext } from 'react';
import './Signup.css';
import FirebaseContext from '../../store/firebaseContext'; // Correct context import
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate  } from 'react-router-dom';

export default function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  // Access the db object from the context
  const { db } = useContext(FirebaseContext); 

  const HandleSubmit = async (e) => {
    e.preventDefault();
    
    const auth = getAuth();
    try {
      // Create a user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
     
      //store details in firestore 
      setDoc(doc(db, "users", user.uid), {
       name: userName,
       email:email,
       phone:phoneNumber,
       id:user.uid
      }).then(()=>{
        navigate('/login')
      })

      alert('User data added to Firestore!');
    } catch (error) {
      const errorMessage = error.message;
      console.error("Signup error:", errorMessage);
      alert("Error signing up: " + errorMessage);
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" alt="Logo" />
        <form onSubmit={HandleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
