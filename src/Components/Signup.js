import React, { useState } from "react";
import { useNavigate, useHistory } from "react-router-dom";

export const Signup = () => {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Error, setError] = useState(false);
  const [NullError, setNullError] = useState(false);

  var phoneVal = /^\d{10}$/;
  var emailVal =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var passwordVal =
    /^(?=.*\d)(?!.* )(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const navigate = useNavigate();

  const handleUserName = (e) => {
    let name = e.target.value;
    setName(name.trim());
  };
  const handlePhone = (e) => {
    let phone = e.target.value;
    setPhone(phone.trim());
  };
  const handleUserMail = (e) => {
    let email = e.target.value;
    setEmail(email.trim());
  };
  const handlePassword = (e) => {
    let password = e.target.value;
    setPassword(password.trim());
  };
  const handleConfrimPassword = (e) => {
    let confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword.trim());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validation Starts here
    if (
      Name === "" &&
      Phone === "" &&
      Email === "" &&
      Password === "" &&
      ConfirmPassword === ""
    ) {
      setNullError(true);
    } else {
      setNullError(false);
      if (phoneVal.test(parseInt(Phone))) {
        setError(false);
        if (emailVal.test(Email)) {
          setError(false);
          if (passwordVal.test(Password)) {
            setError(false);
            if (
              passwordVal.test(ConfirmPassword) &&
              Password === ConfirmPassword
            ) {
              setError(false);
              let userData = {
                Username: Name,
                Userphone: Phone,
                Usermail: Email,
                Userpassword: Password,
                Userconfirmpassword: ConfirmPassword,
              };
              setTimeout(() => {
                localStorage.setItem("user", JSON.stringify(userData));
                e.target.reset();
                navigate("/login");

                console.log(userData);
              }, 700);
            } else {
              setError(true);
            }
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    }
  };

  return (
    <>
      <title>Signup</title>
      <div className="form">
        <h2 className="display-5 text-capitalize">Sign up</h2>
        <form className="pt-2" onSubmit={handleFormSubmit}>
          {NullError === true ? (
            <p className="form-error">
              User should not submit the from as blank.
            </p>
          ) : Error === true ? (
            <p className="form-error">Please check your credentials.</p>
          ) : null}
          <div className="fieldset">
            <input
              className="input"
              type="text"
              placeholder="Enter your name.."
              onChange={handleUserName}
            />
            <input
              className="input"
              type="text"
              placeholder="Enter your Phone.."
              onChange={handlePhone}
              maxLength={10}
            />
            <input
              className="input"
              type="text"
              placeholder="Enter your Email.."
              onChange={handleUserMail}
            />
            <input
              className="input"
              type="text"
              placeholder="Enter the pasword.."
              onChange={handlePassword}
            />
            <input
              className="input"
              type="text"
              placeholder="Re-enter your password.."
              onChange={handleConfrimPassword}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Signup
          </button>
        </form>
      </div>
    </>
  );
};
