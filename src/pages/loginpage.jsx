import { useState } from "react"
import axios from "axios"; 
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage(){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()


    function handleLogin (){

        setLoading(true)

        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/user/login",{
            email : email,
            password : password

        }).then(
            (response)=>{0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                console.log ("Login successful", response.data);
                toast.success("Login successfully");
                localStorage.setItem("token",response.data.token)
                
            

                const user = response.data.user
                if(user.role === "admin"){
                    navigate("/admin/dashbord")
                }else {
                    navigate("/")
                }setLoading(false)
            }
        ).catch(
            (error)=>{
                console.log ("Login unsuccessful",error.response.data);
                toast.error(error.response.data.message||"Login failed");
                setLoading(false)
            }
        )

        console.log("Login button clicked")
        
        
    }

    return(
        <div className="w-full bg-red-200 h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
           <div className="w-[50%] h-full"></div>

           <div className="w-[50%] h-full flex justify-center items-center">
           <div className="w-[450px] h-[600px] backdrop-blure-2xl shadow-2xl rounded-2xl flex flex-col justify-center items-center">
            <input onChange={(e)=>{

                setEmail(e.target.value)
                
            }} className="w-[400px] h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519]  m-[8px]" type="email" placeholder="Email"/>
            <input onChange={(e)=>{

               setPassword(e.target.value)

            }}  className="w-[400px] h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] " type="password" placeholder="Password"/>
            <button onClick={handleLogin} className="w-[400px] h-[50px] bg-[#fca5a5] border border-[#450a0a] text-[#4c0519] rounded-xl text-center m-[8px] cursor-pointer">
                {
                    loading?"Loading....":"Login"
                }
            </button>

            <p className="text-gray-600 text-center m-[8px] text-[15px] font-semibold ">
                Don't have an accound yet? <br /> 
                <span className="text-pink-900 cursor-pointer hover:text-pink-400">
                    <Link to={"/register"}>Register now</Link>
                </span>
            </p>

           </div>
          
           </div>
            
        </div>
    )
}