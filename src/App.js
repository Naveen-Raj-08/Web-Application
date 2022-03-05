import "bootstrap/dist/css/bootstrap.min.css";
import "./Sass/style.scss";
import { Route, Routes } from "react-router-dom";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";
import { Stories } from "./Components/Stories";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/stories" element={<Stories />} />
      </Routes>
    </>
  );
}

export default App;
