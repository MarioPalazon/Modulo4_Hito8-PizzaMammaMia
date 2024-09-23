import React, { useEffect, useState } from 'react';
import BTN_OJOS from '../assets/img/btn_ojos.png';
import CARRITO_COMPRA from '../assets/img/navbar_carrito.png';
import PIZZAICON from '../assets/img/pizza.png';
import { separadorMiles } from '../utils/formateador';
import { Link, useParams } from 'react-router-dom';

const Pizza = () => {
  const [pizzas, setPizzas] = useState({});
  const { id } = useParams();

  const getPizzasById = async () => {
    try {
      const urlAPI = `http://localhost:5000/api/pizzas/${id}`;
      const response = await fetch(urlAPI);
      const pizza = await response.json();

      setPizzas(pizza);
    } catch (error) {
      console.error('Error fetching pizza data:', error);
    }
  };

  useEffect(() => {
    getPizzasById();
  }, []);

  return (
    <div className='text-center'> 
        <article className="col-md-2 w-25 my-4 rounded-3">
          <div className="card mx-2">
                <img src={pizzas.img} className="card-img-top" alt={pizzas.name} />
                <div className='border-2 border-bottom p-2'>
                  <h4>Pizza {pizzas.name}</h4>
                </div>
                <div className='border-2 border-bottom p-1'>
                  <p className='text-justify'>{pizzas.desc}</p>
                  <p>Ingredientes</p>
                  <ul className='list-group text-center'>
                    {Array.isArray(pizzas.ingredients) ? (
                      pizzas.ingredients.map((ing) => (
                        <li className='list-group-item' key={ing}>
                          <img src={PIZZAICON} alt="Pizza Icon" /> {ing}
                        </li>
                      ))
                    ) : (
                      <li className='list-group-item'>No hay ingredientes disponibles</li>
                    )}
                  </ul>
                </div>
                <div className='p-1 text-center'>
                  <h3>Precio: ${separadorMiles(pizzas.price)}</h3>
                </div>
                <div className='border-2 border-bottom p-4 d-flex justify-content-around align-items-center'>
                  <Link to="/" className="btn btn-outline-dark">
                    Volver
                    <img className='mx-1' src={BTN_OJOS} alt="Ojos" />
                  </Link>
                  <button type='button' className="btn btn-dark">
                    Añadir
                    <img className='mx-1' src={CARRITO_COMPRA} alt="Carrito de Compra" />
                  </button>
                </div>
          </div>
        </article>
    </div>
  );
};

export default Pizza;
