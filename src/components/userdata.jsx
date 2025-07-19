import { useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {

    const [user, setUser] = useState(null);

    return (
    <>
       {user == null ? (
            <div className="h-full flex justify-center items-center flex-row">
                <Link to="/login" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ml-4">Register</Link>
            </div>

        ) : (
            
            <div className="h-full flex justify-center items-center flex-row">
                <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600" onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    window.location.href = "/login";

                }}>

                    Logout

                </button>
            </div>
        )
        }

    </>

    );


}
       