import "bootstrap/dist/css/bootstrap.min.css";
import "./Sass/style.scss";
import { Route, Routes } from "react-router-dom";
import { Main } from "./Components/Main";
import { Home } from "./Components/Home";
import { Series } from "./Components/Series";
import { Stories } from "./Components/Stories";
import { NotFound } from "./Components/NotFound";
import { Weather } from "./Components/Weather";
import { Signup } from "./Components/Signup";
import { Login } from "./Components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/stories" element={<Stories />} />
        <Route exact path="/series" element={<Series />} />
        <Route exact path="*" element={<NotFound />} />
        <Route exact path="/weather" element={<Weather />} />
      </Routes>
    </>
  );
}

export default App;
