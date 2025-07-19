import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    useEffect(() => {
        const currentToken = localStorage.getItem("token");
        if (currentToken != null) {
            axios
                .get(import.meta.env.VITE_API_URL + "/user", {
                    headers: {
                        Authorization: `Bearer ${currentToken}`,
                    },
                })
                .then((response) => {
                    setUser(response.data.user);
                })
                .catch((e) => {
                    console.log(e);
                    setUser(null);
                });
        } else {
            setUser(null);
        }
    }, [token]);


    return (
    <>
       {user == null ? (
            <div className="h-full flex justify-center items-center flex-row">
                <Link to="/login" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ml-4">Register</Link>
            </div>

        ) : (
            
            <div className="h-full flex justify-center items-center flex-row">
                <button
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    onClick={() => {
                        localStorage.removeItem("token");
                        setUser(null);
                        setToken(null);
                        window.location.assign("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        )
        }

    </>

    );


}
       