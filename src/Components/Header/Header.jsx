import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/firebaseContext';
import { getAuth,signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Header() {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const LogOut = ()=>{

    const auth = getAuth();
  signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
}).then(()=>{
  navigate('/login')
})

  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span style={{cursor:'pointer'}} onClick={()=> navigate('/login')}>{user?`Welcome back :${user.name}`:'LogIn'}</span>
          <hr />
        </div>
{     user?<button onClick={LogOut}>Log Out</button>:""
}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>navigate('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
