import React from 'react'

const LoginForm = ({ username, setUsername, password, setPassword, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="username" className="block text-sm font-medium">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500  sm:text-sm"
      />
    </div>
    <div className="mb-6">
      <label htmlFor="password" className="block text-sm font-medium">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500  sm:text-sm"
      />
    </div>
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    <button
      type="submit"
      className="btn btn-primary w-full "
    >
      Login
    </button>
  </form>
  )
}

export default LoginForm