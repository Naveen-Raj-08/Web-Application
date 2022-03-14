import "bootstrap/dist/css/bootstrap.min.css";
import "./Sass/style.scss";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route exact path="/home" element={<ProtectedRoute />}>
          <Route exact path="/home" element={<Home />} />
        </Route>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

const ProtectedRoute = () => {
  var isAuth = localStorage.getItem("isAuth");
  return !isAuth ? <Navigate to="/login" /> : <Outlet />;
};

export default App;
