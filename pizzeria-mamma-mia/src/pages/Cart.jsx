import React, { useContext } from 'react'
import { separadorMiles } from '../utils/formateador'
import { usePizzas } from '../context/PizzasContext';
import { UserContext } from '../context/UserContext';
import Swal from 'sweetalert2';

//const Cart = ({allPizzas,setAllPizzas,total,setTotal,countPizzas,setCountPizzas}) => {
const Cart = () => {

  const {allPizzas,setAllPizzas,total,setTotal,countPizzas,setCountPizzas}=usePizzas();

  const { user } = useContext(UserContext);
  const token=user;

  const handleAddPizza=(pizza)=>{
    if(allPizzas.find(item=>item.id===pizza.id)){
      const pizzaFind=allPizzas.map((item)=>
      item.id===pizza.id ? {...item,quantity:item.quantity+1}:item);

      setTotal(total+pizza.price);
      setCountPizzas(countPizzas+pizza.quantity)
      return setAllPizzas([...pizzaFind]);
    }
  }

  const handleRemovePizza=(pizza)=>{
    const filter=allPizzas.filter(item=>item.id!==pizza.id);

    if(allPizzas.find(item=>item.id===pizza.id)){
      const pizzaFind=allPizzas.map((item)=>
      item.id===pizza.id ? {...item,quantity:item.quantity-1}:item);

      setTotal(total-pizza.price);
      setCountPizzas(countPizzas-pizza.quantity)

      if(pizza.quantity<=1){
        return setAllPizzas([...filter]);
      }
      
      return setAllPizzas([...pizzaFind]);
    }
  }

  const checkout=async()=>{
    const token=localStorage.getItem("token");
    const response = await  fetch("http://localhost:5000/api/checkouts", {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(allPizzas)
                });

    const result = await response.json();
    if(result.user.email){
      Swal.fire({
          position: "center",
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 1500
      });
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.error
      });
    }
  }

  return (
    <>
      <div className='container' style={{"height": "75vh"}}>
        {allPizzas.map((item)=>(
          <div className="d-flex justify-content-between align-items-center p-2 w-75" key={item.id}>
            <img src={item.img} className="img_cart rounded-3" alt={item.name} />
              <p className='w-25'>Pizza {item.name}</p>       
              <p>$ {separadorMiles(item.price)}</p>
              <button className='btn btn-dark rounded-5' onClick={()=>handleRemovePizza(item)}>-</button> 
              <p>{item.quantity}</p>
              <button className='btn btn-dark rounded-5' onClick={()=>handleAddPizza(item)}>+</button>              
          </div>
        ))}
        <div className='text-end'>
          <p className='fw-bold'>Total:$ {separadorMiles(total)}</p>
          {allPizzas.length===0 ? 
          <p className='text-center fw-bold'>El carrito de compra se encuentra vacio</p> : 
          <button className='btn btn-dark my-1 px-4' disabled={!token} onClick={checkout}>Pagar</button> }
        </div>
      </div>
    </>
  )
}

export default Cart
