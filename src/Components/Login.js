import { getDocs, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "./firebase";

export const Login = () => {
  const [User, setUser] = useState("");
  const [UserPassword, setUserPassword] = useState("");
  const [RegisteredUser, setRegisteredUser] = useState();

  const [NullError, setNullError] = useState(false);
  const [Error, setError] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    const getData = async () => {
      await getDocs(collection(db, "userAuth"))
        .then((docSnap) => {
          const user = docSnap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch((err) => {
          console.error("Failed to retrieve data", err);
        });
    };

    getData();

    var data = JSON.parse(localStorage.getItem("user"));

    data.map((item) => {
      !item.userData
        ? console.log("Data fetching....")
        : setRegisteredUser(item);
    });
  }, []);

  const handleUser = (e) => {
    let user = e.target.value;
    setUser(user.trim());
  };
  const handleUserPassword = (e) => {
    let userpassword = e.target.value;
    setUserPassword(userpassword.trim());
  };
  const handleFormSubmit = (e, item) => {
    e.preventDefault();
    console.log(item);
    console.log(RegisteredUser);
    const { Usermail, Userpassword } = RegisteredUser.userData;
    if (!User && !UserPassword) {
      setNullError(true);
    } else {
      setNullError(false);
      if (!User || !UserPassword) {
        setError(true);
      } else {
        setError(false);
        if (User === Usermail && UserPassword === Userpassword) {
          setTimeout(() => {
            navigateTo("/home");
            localStorage.setItem("user", { isAuth: true });
            e.target.reset();
          }, 1200);
        } else {
          setError(true);
          console.log("Not registered");
        }
      }
    }
  };
  return (
    <>
      <title>Login page</title>

      <div className="form">
        <h2 className="display-5 text-capitalize">Login</h2>
        <form className="pt-2" onSubmit={handleFormSubmit}>
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
        </form>
      </div>
    </>
  );
};
