export default function LoginPage(){
    return(
        <div className="w-full bg-red-200 h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
           <div className="w-[50%] h-full"></div>
           <div className="w-[50%] h-full flex justify-center items-center">
           <div className="w-[450px] h-[600px] backdrop-blure-2xl shadow-2xl rounded-2xl flex flex-col justify-center items-center">
            <input className="w-[400px] h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519]  m-[8px]" type="email" placeholder="Email"/>
            <input className="w-[400px] h-[50px] bg-[#fecaca] border border-[#450a0a] rounded-xl text-center text-[#4c0519] " type="password" placeholder="Password"/>
            <button className="w-[400px] h-[50px] bg-[#fca5a5] border border-[#450a0a] text-[#4c0519] rounded-xl text-center m-[8px] cursor-pointer">Login</button>
           </div>
          
           </div>
            
        </div>
    )
}