import React, { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const initialState={
        email:'',
        password:'',
        passwordConfirm:''
}

const Register = () => {

    const {registerUser}=useContext(UserContext);
    const [inputForm,setInputForm]=useState(initialState);
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const {email,password,passwordConfirm}=inputForm;
        if(email.trim()==="" || password.trim()==="" || passwordConfirm.trim()===""){
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

        if(password!==passwordConfirm){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Los password no coinciden, intentar nuevamente"
              });
            //alert("Los password no coinciden, intentar nuevamente");
            return;
        }

        const data=await registerUser(email,password);
        if(data.email){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Usuario Registrado Correctamente",
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/login");
            return;
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: data.error
              });
        }
        //alert("Usuario Registrado Correctamente");
        setInputForm(initialState);
        return;
    }

  return (
    <div className='container w-50' style={{"height": "75vh"}}>
        <section className="section_register py-5">
            <article className="article_register my-4">
                <h1 className="register_title mb-3">Registro</h1>
                <form className="register_container mb-4" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control mb-4" id="email" 
                    placeholder="name@example.com"
                    name='email'
                    value={inputForm.email}
                    onChange={(e)=>setInputForm({...inputForm,email:e.target.value})}
                    />
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" id="password" className="form-control" aria-describedby="passwordHelpBlock"
                    name='password'
                    value={inputForm.password}
                    onChange={(e)=>setInputForm({...inputForm,password:e.target.value})}
                    />
                    <div id="passwordHelpBlock" className="form-text mb-4">
                        El password debe tener al menos 6 caracteres.
                    </div>
                    <label htmlFor="passwordConfirm" className="form-label">Confirmar Contraseña</label>
                    <input type="password" id="passwordConfirm" className="form-control" aria-describedby="passwordHelpBlock"
                    name='passwordConfirm'
                    value={inputForm.passwordConfirm}
                    onChange={(e)=>setInputForm({...inputForm,passwordConfirm:e.target.value})}
                    />
                    
                    <button type="submit" className="btn btn-success mt-4">Enviar</button>
                </form>
            </article>
        </section>
    </div>
  )
}

export default Register
