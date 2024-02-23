import React, { Fragment, useEffect, useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SignUpUser, clearErrors } from "../../redux/action/userAction";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const SignUp = () => {
  const [data, setData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const handleCheckBox = (gender) => {
    setData({ ...data, gender });
  };

  const handleData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SignUpUser(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
      toast.success("SignUp Successfully");
    }
  }, [dispatch, isAuthenticated, navigate, error]);

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center min-w-100 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            SignUp <span className="text-blue-500">ChatApp</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base text-gray-300 label-text">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="w-full text-white input bg-black input-bordered h-10"
                name="fullName"
                value={data.fullName}
                onChange={handleData}
              />
            </div>
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
                value={data.username}
                name="username"
                onChange={handleData}
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
                value={data.password}
                name="password"
                onChange={handleData}
              />
            </div>
            <div className="mb-2">
              <label className="label p-2">
                <span className="text-base text-gray-300 label-text">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter Confirm Password"
                className="w-full bg-black text-white input input-bordered h-10"
                value={data.confirmPassword}
                onChange={handleData}
                name="confirmPassword"
              />
            </div>
            <GenderCheckbox
              onCheckboxChange={handleCheckBox}
              selectedGender={data.gender}
            />
            <Link
              to="/login"
              className="text-sm hover:underline text-gray-300 hover:text-blue-600 mt-2 inline-block"
            >
              Already have an account?
            </Link>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-block bg-purple-950 text-white hover:bg-purple-700 outline-none border-0 btn-sm mt-4"
              >
                {loading ? (
                  <span className=" text-gray-100 loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
