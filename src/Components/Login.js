import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [User, setUser] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [RegisteredUser, setRegisteredUser] = useState();

  const [NullError, setNullError] = useState(false);
  const [Error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    var data = localStorage.getItem("user");
    setRegisteredUser(JSON.parse(data));
  }, []);

  const handleUser = (e) => {
    let user = e.target.value;
    setUser(user.trim());
  };
  const handleUserPassword = (e) => {
    let userpassword = e.target.value;
    setUserPassword(userpassword.trim());
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // checks users details in db
    if (RegisteredUser) {
      const { Usermail, Userpassword } = RegisteredUser;
      setNullError(false);
      if (!User && !UserPassword) {
        console.log(NullError);
        setNullError(true);
      } else {
        setNullError(false);
        if (!User || !UserPassword) {
          setError(true);
        } else {
          setError(false);
          if (User === Usermail && UserPassword === Userpassword) {
            setTimeout(() => {
              localStorage.setItem("isAuth", true);
              navigate("/home");
              e.target.reset();
            }, 1200);
          } else {
            setError(true);
            console.log("Not registered");
          }
        }
      }
    } else {
      setNullError(true);
    }
  };
  return (
    <>
      <title>Login page</title>

      <div className="form">
        <h2 className="display-5 text-capitalize">Login</h2>
        <form className="pt-2" onSubmit={handleFormSubmit}>
          {NullError === true ? (
            <p className="form-error">Check your credentials</p>
          ) : Error === true ? (
            <p className="form-error">Invalid username or Invalid password</p>
          ) : null}
          <div className="fieldset">
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              onChange={handleUser}
            />
            <input
              className="input"
              type="password"
              placeholder="Enter the pasword.."
              onChange={handleUserPassword}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <Link to="/signup">Sign up</Link>
        </form>
      </div>
    </>
  );
};
