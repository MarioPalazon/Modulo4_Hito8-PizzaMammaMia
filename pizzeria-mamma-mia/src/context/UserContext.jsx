import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    const [logged,setLogged]=useState({});


    const loginIn=async(email,password)=>{
        const response = await fetch("http://localhost:5000/api/auth/login", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                        email,
                        password,
                        }),
            });
            
        const data = await response.json();    
        if(data.email){
            localStorage.setItem("token", data.token);
            setUser(true);
        }
        setLogged(data);        
        return data;
    }

    const registerUser=async(email,password)=>{
         const response = await fetch("http://localhost:5000/api/auth/register", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                        email,
                        password,
                        }),
            });
            
        const data = await response.json();         
        return data;
    }

    const loggedOut=()=>{
        localStorage.clear();
        setUser(false);
    }

    return (
        <UserContext.Provider value={{ user, setUser,loginIn,logged, setLogged,loggedOut,registerUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider