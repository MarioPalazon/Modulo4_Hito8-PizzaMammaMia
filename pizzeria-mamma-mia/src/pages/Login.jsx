import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const initialState={
    email:'',
    password:''
}

const Login = () => {
    const navigate=useNavigate();
    const [inputForm,setInputForm]=useState(initialState);
    const{loginIn} = useContext(UserContext);

    const handleLogin=async(e)=>{
        e.preventDefault();

        const {email,password}=inputForm;

        if(email.trim()==="" || password.trim()===""){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Los campos son obligatorios"
              });
            //alert("Los campos son obligatorios");
            return;
        }

        if(password.length<6){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El password debe contener al menos 6 caracteres"
              });
            //alert("El password debe contener al menos 6 caracteres");
            return;
        }

        const data=await loginIn(email,password);
        if(data.email){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario Logeado Correctamente",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/");
            return;
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.error
              });
        }
        //alert("Usuario Logeado Correctamente");
        setInputForm(initialState);
        return;
    }

  return (
    <div className='container w-50' style={{"height": "75vh"}}>
        <section className="section_register py-5 mb-5">
            <article className="article_register my-5">
                <h1 className="register_title mb-3">Login</h1>
                <form className="register_container mb-5" onSubmit={handleLogin}>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        type="email" 
                        className="form-control mb-4" 
                        id="email" 
                        placeholder="name@example.com"
                        name='email'
                        value={inputForm.email}
                        onChange={(e)=>setInputForm({...inputForm,email:e.target.value})}
                    />
                    <label htmlFor="passsword" className="form-label">Contraseña</label>
                    <input 
                        type="password" 
                        id="passsword" 
                        className="form-control mb-4" 
                        aria-describedby="passwordHelpBlock"
                        value={inputForm.password}
                        onChange={(e)=>setInputForm({...inputForm,password:e.target.value})}
                    />

                    <button type="submit" className="btn btn-success">Enviar</button>
                </form>
            </article>
        </section>
    </div>

  )
}

export default Login
