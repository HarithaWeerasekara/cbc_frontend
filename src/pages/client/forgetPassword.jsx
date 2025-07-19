export default function forgotPassword(){
    return(
        <div className="h-100 flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h1>Forgot Password</h1>
            <p>Please enter your email address to reset your password.</p>
            <form>
                <input type="email" placeholder="Email Address" required />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    )
}