
import { useState } from "react";
import { createContext } from "react";

export const DataContext=createContext(null);

const DataProvider=({children})=>{
    const [unique,setUnique]=useState('');

    return(
        <DataContext.Provider value={{
            unique,setUnique
        }}>
            {children}
         </DataContext.Provider>
    )
}

export default DataProvider;