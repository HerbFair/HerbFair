import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainRoutes from "./routes/MainRoutes";
import { NavBar } from "./components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <MainRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
