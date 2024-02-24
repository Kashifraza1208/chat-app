import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import useLogin from "../../components/hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center min-w-100 mx-auto login ">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Login <span className="text-blue-500">ChatApp</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base text-gray-300 label-text">
                  Username
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full text-white input bg-black input-bordered h-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base text-gray-300 label-text">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full bg-black text-white input input-bordered h-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link
              to="/signup"
              className="text-sm hover:underline text-gray-300 hover:text-blue-600 mt-2 inline-block"
            >
              Don't have an account?
            </Link>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-block bg-purple-950 text-white hover:bg-purple-700 outline-none border-0 btn-sm mt-2"
              >
                {loading ? (
                  <span className=" text-gray-100 loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
