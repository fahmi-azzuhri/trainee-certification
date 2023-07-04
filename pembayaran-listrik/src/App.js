import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DataUser from "./pages/kelola/DataUser";
import Dashboard from "./pages/dashboard/Dashboard";
import TarifListrik from "./pages/kelola/TarifListrik";
import Pelanggan from "./pages/kelola/Pelanggan";
import Tagihan from "./pages/kelola/Tagihan";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<DataUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tarif" element={<TarifListrik />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/tagihan" element={<Tagihan />} />
      </Routes>
    </Router>
  );
}

export default App;
