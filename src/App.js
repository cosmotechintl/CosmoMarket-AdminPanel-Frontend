import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/HomePage/Homepage";
import Login from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CreatePassword from "./pages/CreatePassword/CreatePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-password/:id" element={<CreatePassword />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<PrivateRoute />}>
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
