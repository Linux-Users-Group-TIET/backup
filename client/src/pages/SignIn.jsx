import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/signIn.css"; // Import CSS for styling
import { useDispatch, useSelector } from "react-redux";
import {signInFailure,signInSuccess,SignInStart } from '../redux/user/userSlice'
import OAuth from "../Components/OAuth";

function SignIn() {
  const [formdata, setformdata] = useState({});
  const {loading,error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if formdata is empty
    // if (Object.keys(formdata).length === 0) {
    // //  dispatch(signInFailure("Bhai credentials toh bhrde"));
    //   return;
    // }

    try {
      dispatch(SignInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
      dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data))
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto signin-form">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg signin-input"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-lg signin-input"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 signin-button"
        >
          {loading ? "Loading.." : "SIGN in"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/signup"} className="signin-link">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5 signin-error">{error}</p>}
    </div>
  );
}

export default SignIn;