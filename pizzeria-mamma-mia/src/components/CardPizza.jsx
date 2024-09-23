import React from 'react'
import BTN_OJOS from '../assets/img/btn_ojos.png'
import CARRITO_COMPRA from '../assets/img/navbar_carrito.png'
import PIZZAICON from '../assets/img/pizza.png'
import { separadorMiles } from '../utils/formateador'
import { Link } from 'react-router-dom'
import { usePizzas } from '../context/PizzasContext'

//const CardPizza = ({item,allPizzas,setAllPizzas,countPizzas,setCountPizzas,total,setTotal}) => {
const CardPizza = ({item}) => {
  
  const {allPizzas,setAllPizzas,total,setTotal,countPizzas,setCountPizzas } = usePizzas();
  
  const {id,name,price,ingredients,img}=item;

  const handleAddPizza=(pizza)=>{

    if(allPizzas.find(item=>item.id===pizza.id)){
      const pizzaFind=allPizzas.map((item)=>
      item.id===pizza.id ? {...item,quantity:item.quantity+1}:item);

      setTotal(total+pizza.price*pizza.quantity);
      setCountPizzas(countPizzas+pizza.quantity)
      return setAllPizzas([...pizzaFind]);
    }

    setTotal(total+pizza.price*pizza.quantity);
    setCountPizzas(countPizzas+pizza.quantity)
    setAllPizzas([...allPizzas,pizza]);
  }

  return (
      
          <article className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 my-4 rounded-3">
            <div className="card mx-2">
              <img src={img}className="card-img-top" alt={name} />
              <div className='border-2 border-bottom p-2'>
                <h4>Pizza {name}</h4>
              </div>
              <div className='border-2 border-bottom p-1 text-center'>
                <p>Ingredientes</p>
                  {/* {ingredients.join(", ")} */}                 
                <ul className='list-group text-center'>
                    {ingredients.map((ing)=>(
                      <li className='list-group-item' key={ing}>
                       <img src={PIZZAICON} /> {ing}
                      </li>
                    ))}
                  </ul>
              </div>
              <div className='p-1 text-center'>
                <h3>Precio: ${separadorMiles(price)}</h3>
              </div>
              <div className='border-2 border-bottom p-4 d-flex justify-content-around align-align-items-center'>
                <Link to={`/pizza/${id}`} className="btn btn-outline-dark">
                  Ver Mas
                  <img className='mx-1' src={BTN_OJOS} />  
                </Link>
                <button type='button' className="btn btn-dark" onClick={()=>handleAddPizza(item)}>
                  Añadir
                  <img className='mx-1' src={CARRITO_COMPRA} />  
                </button>
              </div>
            </div>
          </article>
  )
}

export default CardPizza
