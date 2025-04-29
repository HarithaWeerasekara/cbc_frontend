import { useState } from "react";


export default function Testing(){

    const [number,setNumber] = useState(0)
    const [status,setStatus] = useState("pending")

    

    function increment() {

        let newValue = number+1;

        setNumber(newValue)

       
    }

    function decrement() {

        let newValue = number-1;

        setNumber(newValue)
        //number=number-1;
        //console.log(number);
    }


    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">

            <span className="text-3xl font-bold">{number}</span>
            <div className="w-full flex justify-center items-center">
                <button onClick={increment} className="bg-blue-500 text-amber-100 p-2 rounded-lg w-[80px] cursor-pointer border-2">+</button>
                <button onClick={decrement} className="bg-blue-500 text-amber-100 p-2 rounded-lg w-[80px] cursor-pointer border-2">-</button>
            </div>

            <span className="text-3xl font-bold">{status}</span>
            <div className="w-full flex justify-center items-center">
                <button onClick={()=>{setStatus("Passed")}} className="bg-blue-500 text-amber-100 p-2 rounded-lg w-[80px] cursor-pointer border-2">pass</button>
                <button onClick={()=>{setStatus("Failed")}} className="bg-blue-500 text-amber-100 p-2 rounded-lg w-[80px] cursor-pointer border-2">fail</button>
            </div>

        </div>
    )
}