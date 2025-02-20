import { createContext, useState } from "react";


export const Product = createContext(null)


export function Postcontext({children}){

 const [productDetils,setProductDetils] = useState();
 console.log(productDetils);
 
  return(
  <Product.Provider value={{productDetils,setProductDetils}}>
    {children}
  </Product.Provider>

    
  )
}