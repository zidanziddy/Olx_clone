// logo misiig
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  './Login.css';
import FirebaseContext from '../../store/firebaseContext';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {db} = useContext(FirebaseContext)
  const navigate = useNavigate()

  const HandleForm =(e)=>{
    e.preventDefault()

    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('signed in');
      navigate('/home')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
    
  })

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" ></img>
        <form onSubmit={HandleForm}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            className="input"
            type="email"
            id="fname"
            name="email"
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          value={password}
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
            className="input"
            type="password"
            id="lname"
            name="password"
            
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
