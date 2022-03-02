import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "./firebase";
import { collection, addDoc } from "firebase/firestore";

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
    let num = phone.replace(/[^0-9]/g, "");
    setPhone(num);
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
                isAuth: false,
              };
              setTimeout(() => {
                try {
                  const docRef = addDoc(collection(db, "userAuth"), {
                    userData,
                  });
                  console.log("Document written with ID: ", docRef.id);
                } catch (e) {
                  console.error("Error adding document: ", e);
                }
                e.target.reset();
                alert("Succssfully created account");
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
              type="tel"
              value={Phone}
              placeholder="Enter your Phone.."
              onChange={handlePhone}
              maxLength="10"
            />
            {Phone.length >= 1 ? (
              phoneVal.test(Phone) === true ? null : (
                <p className="form-error">Check your phone number</p>
              )
            ) : null}
            <input
              className="input"
              type="email"
              placeholder="Enter your Email.."
              onChange={handleUserMail}
            />

            {Email.length >= 1 ? (
              emailVal.test(Email) === true ? null : (
                <p className="form-error">Check your mail</p>
              )
            ) : null}

            <input
              className="input"
              type="password"
              placeholder="Enter the pasword.."
              onChange={handlePassword}
            />
            {Password.length >= 1 ? (
              passwordVal.test(Password) === true ? null : (
                <p className="form-error">
                  Password must contain at least 1number, 1char, 1uppercase, and
                  1lowercase
                </p>
              )
            ) : null}

            <input
              className="input"
              type="password"
              placeholder="Re-enter your password.."
              onChange={handleConfrimPassword}
            />
            {ConfirmPassword.length >= 1 ? (
              passwordVal.test(ConfirmPassword) === true ? (
                Password === ConfirmPassword ? null : (
                  <p className="form-error">Password is not mathcing</p>
                )
              ) : (
                <p className="form-error">
                  Password must contain at least 1number, 1char, 1uppercase, and
                  1lowercase
                </p>
              )
            ) : null}
          </div>

          <button className="btn btn-primary" type="submit">
            Signup
          </button>
        </form>
      </div>
    </>
  );
};
