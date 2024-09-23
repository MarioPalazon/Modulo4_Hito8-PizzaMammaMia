import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CardPizza from '../components/CardPizza'

//const Home = ({allPizzas,setAllPizzas,countPizzas,setCountPizzas,total,setTotal}) => {

const Home = () => {


  const[pizzas,setPizzas]=useState([]);

  useEffect(()=>{
    getPizzas();
  },[])


  const getPizzas=async()=>{
    try {
        const urlAPI=`http://localhost:5000/api/pizzas`;
        const response=await fetch(urlAPI);
        const result=await response.json();
        
        setPizzas([...result]);

    } catch (error) {
        throw error;
    }
  }
  
  return (
    <div>
      <Header></Header>
      <div className='container'>
        <section className="row">

        {pizzas.map((item)=>
          <CardPizza
            key={item.id}
            item={item}
          >            
          </CardPizza>
          // <CardPizza
          //   key={item.id}
          //   item={item}
          //   allPizzas={allPizzas}
          //   setAllPizzas={setAllPizzas}
          //   countPizzas={countPizzas}
          //   setCountPizzas={setCountPizzas}
          //   total={total}
          //   setTotal={setTotal}
          // >
          // </CardPizza>  
        )} 
         
        </section>
      </div>
    </div>
  )
}

export default Home
