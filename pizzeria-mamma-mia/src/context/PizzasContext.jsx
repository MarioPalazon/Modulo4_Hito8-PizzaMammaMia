import React, { useState,createContext, useContext } from 'react'

export const PizzasContext=createContext();

const PizzasProvider = ({children}) => {
    const[allPizzas,setAllPizzas]=useState([]);
    const[countPizzas,setCountPizzas]=useState(0);
    const[total,setTotal]=useState(0);

    return (
        <PizzasContext.Provider value={{allPizzas,setAllPizzas,countPizzas,setCountPizzas,total,setTotal}}>
            {children}
        </PizzasContext.Provider>
    )
}

export const usePizzas=()=>{
    return useContext(PizzasContext);
}

export default PizzasProvider;