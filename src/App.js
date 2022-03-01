import "bootstrap/dist/css/bootstrap.min.css";
import "./Sass/style.scss";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
