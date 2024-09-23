import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

const initialState={
    email:''
}

const Profile = () => {

    const navigate = useNavigate();
    const [inputForm,setInputForm]=useState(initialState);
    const {loggedOut}=useContext(UserContext);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const fetchMe=async()=>{
            const response = await  fetch("http://localhost:5000/api/auth/me", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            setInputForm({email:result.email});             
        }
        fetchMe();
    },[]);

    const cerrarSesion=()=>{
        loggedOut();
        navigate("/");
        return;
    }

  return (
    <div className='container w-50' style={{"height": "75vh"}}>
        <section className="section_register py-5 mb-5">
            <article className="article_register my-5">
                <h1 className="register_title mb-3">PROFILE Usuario: Mario</h1>
                <div className="register_container mb-5">
                    <label htmlFor="email" className="form-label">Email Usuario</label>
                    <input 
                        readOnly
                        type="email" 
                        className="form-control mb-4" 
                        id="email" 
                        placeholder="name@example.com"
                        name='email'
                        value={inputForm.email}
                        onChange={(e)=>setInputForm({...inputForm,email:e.target.value})}
                    />

                    <button type="button" onClick={()=>cerrarSesion()} 
                    className="btn btn-danger">
                        Cerrar Sesion
                    </button>
                </div>
            </article>
        </section>
    </div>
  )
}

export default Profile
