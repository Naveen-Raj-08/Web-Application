import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { Stories } from "./Components/Stories";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/stories/" element={<Stories />} />
      </Routes>
    </>
  );
}

export default App;
