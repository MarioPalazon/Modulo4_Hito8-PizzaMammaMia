import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza"
import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from './components/Profile'
import Notfound from './components/NotFound'
import PizzasProvider from './context/PizzasContext'
import { UserContext } from './context/UserContext'

function App() {

  // const[allPizzas,setAllPizzas]=useState([]);
  // const[total,setTotal]=useState(0);
  // const[countPizzas,setCountPizzas]=useState(0);

  const {user}=useContext(UserContext);

  return (
    <>
      {/* <Navbar total={total}></Navbar> */}
      <PizzasProvider>
        <Navbar></Navbar>
        
        <Routes>
          <Route path='/' element={
              <Home></Home>
            // <Home
            //     allPizzas={allPizzas} 
            //     setAllPizzas={setAllPizzas} 
            //     total={total} 
            //     setTotal={setTotal}
            //     countPizzas={countPizzas}
            //     setCountPizzas={setCountPizzas}
            //   >
            // </Home>
          }
          />

          <Route path='/register' element={!user ? <Register></Register> : <Navigate to={"/"}></Navigate>} />
          <Route path='/login' element={!user? <Login></Login> : <Navigate to={"/"}></Navigate>} />
          <Route path='/cart' element={
            <Cart></Cart>
            // <Cart 
            //   allPizzas={allPizzas} 
            //   setAllPizzas={setAllPizzas} 
            //   total={total} 
            //   setTotal={setTotal}
            //   countPizzas={countPizzas}
            //   setCountPizzas={setCountPizzas}
            // ></Cart>
            } 
          />
          <Route path='/pizza/:id' element={<Pizza></Pizza>} />
          <Route path='/profile' element={user ?<Profile></Profile>: <Navigate to="/login"></Navigate>} />
          <Route path='/404' element={<Notfound></Notfound>} />
          <Route path='*' element={<Notfound></Notfound>} />
        </Routes>
      </PizzasProvider>
      <Footer></Footer>
    </>
  )
}

export default App
