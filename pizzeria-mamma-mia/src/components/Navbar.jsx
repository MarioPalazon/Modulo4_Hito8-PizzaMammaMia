import React, { useContext, useEffect } from 'react'
import HEADER_HOME_ICON from '../assets/img/header_pizza.png';
import HEADER_LOGIN_REGISTER_ICON from '../assets/img/navbar_login_register.png';
import HEADER_NAVBAR_CARRITO from '../assets/img/navbar_carrito.png';
import { separadorMiles } from '../utils/formateador';
import { Link, NavLink } from 'react-router-dom';
import { usePizzas } from '../context/PizzasContext';
import { UserContext } from '../context/UserContext';

//const Navbar = ({total}) => {
const Navbar=()=>{

  const { total } = usePizzas();
  const { user,setUser,loggedOut } = useContext(UserContext);

  const fetchMe=async()=>{
    const token = localStorage.getItem("token");
    if(token){
      const response = await  fetch("http://localhost:5000/api/auth/me", {
        headers: {
        Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if(result.email){
        setUser(true);
      }      
    }
  }
    
  useEffect(()=>{
      (async()=>{
        await fetchMe();
      })();
    },[])


  let token=user;
  //const total=separadorMiles(25000);
  const CerrarSesion=()=>{
    loggedOut();
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark p-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white" to="/">Pizzeria Mamma Mia!</NavLink>
        <button className="navbar-toggler bg-white accordion" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="btn btn-dark text-white border border-1 border-white rounded-2 p-2 m-2" aria-current="page" to="/">
                <img src={HEADER_HOME_ICON} alt='Icono del home del menu' />
                Home
              </NavLink>
            </li>
            {!token ?(
              <>
                <li className="nav-item">
                  <NavLink className="btn btn-dark text-white border border-1 border-white rounded-2 p-2 m-2" to="/login">
                    <img src={HEADER_LOGIN_REGISTER_ICON} alt='Icono del Login'/>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="btn btn-dark text-white border border-1 border-white rounded-2 p-2 m-2" to="/register">
                      <img src={HEADER_LOGIN_REGISTER_ICON} alt='Icono del Register' />
                    Register
                    </NavLink>
                </li> 
              </>
            ):
            (
              <>
                <li className="nav-item">
                  <NavLink className="btn btn-dark text-white border border-1 border-white rounded-2 p-2 m-2" to="/profile">
                  <img src={HEADER_LOGIN_REGISTER_ICON} alt='Icono del Profñe' />
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button onClick={()=>CerrarSesion()} className="btn btn-dark text-white border border-1 border-white rounded-2 p-2 m-2">
                  <img src={HEADER_LOGIN_REGISTER_ICON} alt='Icono del Logout' />
                    Logout
                  </button>
                </li>
              </>
            )
          }
          </ul>
          <form className="d-flex" role="search">
              <NavLink className="btn btn-dark me-5 text-info fw-bold border border-1 border-info rounded-2 p-2 m-2" to="/cart">
              <img src={HEADER_NAVBAR_CARRITO} />  
                Total: $ {separadorMiles(total)} 
              </NavLink>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
