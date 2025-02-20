import { createContext, useState } from "react";


const FirebaseContext = createContext(null)
export default FirebaseContext;


export const AuthContext = createContext(null)


// eslint-disable-next-line react/prop-types
export  function Context({children }){

  const [user,setUser] = useState(null);

  return(
     <AuthContext.Provider value={{user,setUser}}>
      {children}
     </AuthContext.Provider>

  )
}