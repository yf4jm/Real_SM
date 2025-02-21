import React from 'react'
import { Link } from 'react-router-dom'
const LoginContainer = ({children}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {children}
      <br />
      <Link to={"/signup"}>don't have an account? Sign Up</Link>
    </div>
  </div>
  )
}

export default LoginContainer