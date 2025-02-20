import { createRoot} from 'react-dom/client'
import './index.css'
import FirebaseContext from './store/firebaseContext.jsx'
import App from './App.jsx'
import {db} from './firebase/config.jsx'
import { Context } from './store/firebaseContext.jsx'


createRoot(document.getElementById('root')).render(

  <FirebaseContext.Provider value={{db}}>
    <Context>
        <App />
    </Context>
      
  </FirebaseContext.Provider>
   

)
